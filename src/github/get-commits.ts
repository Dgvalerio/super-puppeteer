import { Endpoints } from '@octokit/types';

import * as fs from 'fs';
import { Octokit } from 'octokit';

import config from '../../config';
import {
  Commit,
  DayGroupedCommit,
  GroupedCommit,
  SimpleCommit,
  TimeGroupedCommit,
} from '../types';

const dateNow = (dateString: string): string => {
  const date = new Date(dateString);

  date.setHours(date.getHours() - 3);

  return date.toISOString();
};

const simplifyCommit = (_: Commit): SimpleCommit => ({
  date: dateNow(_.commit.committer.date),
  description: _.commit.message,
  commit: _.html_url,
});

const timeNumber = (time: string): number => Number(time.replace(':', ''));

const groupByDate = (commits: SimpleCommit[]): GroupedCommit[] => {
  const dayGroup: DayGroupedCommit[] = [];

  commits.forEach((item) => {
    const day = item.date.split('T')[0];
    const time = item.date.split('T')[1].split('.')[0].slice(0, 5);

    let index = 0;
    const exists = dayGroup.find(({ date }, _) => {
      index = _;

      return day === date.split('T')[0];
    });

    if (exists) {
      dayGroup[index] = {
        date: dayGroup[index].date,
        descriptions: dayGroup[index].descriptions.concat([
          { time, description: item.description, commit: item.commit },
        ]),
      };
    } else {
      dayGroup.push({
        date: day,
        descriptions: [
          { time, description: item.description, commit: item.commit },
        ],
      });
    }
  });

  const dayGroups: TimeGroupedCommit[] = dayGroup.map(
    ({ date, descriptions }) => ({
      date,
      descriptions: config.appointmentConfig.dayTimes.map(
        (item, itemIndex) => ({
          ...item,
          descriptions: descriptions
            .filter(
              (d) =>
                (timeNumber(item.start) < timeNumber(d.time) &&
                  timeNumber(d.time) < timeNumber(item.end)) ||
                (itemIndex === 0 &&
                  timeNumber(d.time) < timeNumber(item.end)) ||
                (itemIndex === config.appointmentConfig.dayTimes.length - 1 &&
                  timeNumber(d.time) > timeNumber(item.start))
            )
            .map((d) => `[${d.time}] ${d.description} (${d.commit})`),
        })
      ),
    })
  );

  return dayGroups.map(({ date, descriptions }) => ({
    date,
    description: descriptions
      .map(
        ({ start, end, descriptions }) =>
          `## ${start} - ${end}\n` +
          descriptions.map((des) => ` - ${des}`).join('\n') +
          '\n'
      )
      .join('\n'),
  }));
};

const removeMerge = (commits: SimpleCommit[]): SimpleCommit[] =>
  commits.filter(
    ({ description }) => !description.includes("Merge branch 'develop'")
  );

const joinInMD = (commits: GroupedCommit[]): string => {
  let res = '';

  commits.forEach((commit, index) => {
    res =
      index === 0
        ? `# ${commit.date}\n` + commit.description
        : `${res}\n` + '\n' + `# ${commit.date}\n` + commit.description;
  });

  return res;
};

(async (): Promise<void> => {
  const octokit = new Octokit({ auth: config.github.token });
  let email = config.github.email;

  if (!email) {
    const response = await octokit.request('GET /user');

    email = response.data.email;
  }

  config.github.repositories.map(async (repo) => {
    let searchConfig: Endpoints['GET /repos/{owner}/{repo}/commits']['parameters'] =
      {
        owner: 'lubysoftware',
        repo: repo.name,
        author: email,
        sha: repo.branch_sha,
        per_page: 100,
      };

    if (config.github.when) {
      if (config.github.when.until)
        searchConfig = { ...searchConfig, until: config.github.when.until };
      if (config.github.when.since)
        searchConfig = { ...searchConfig, since: config.github.when.since };
    }

    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/commits',
      searchConfig
    );

    const simplified = response.data.map((data) => simplifyCommit(data));

    // sort by date
    simplified.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

    const grouped = groupByDate(removeMerge(simplified));

    // write markdown
    const name = new Date().toISOString().replace(/[:.T]/gm, '-');
    const filename = `markdowns/${name}.${repo.name}.md`;

    fs.writeFileSync(filename, joinInMD(grouped));

    console.log(filename + ' ok');
  });
})();
