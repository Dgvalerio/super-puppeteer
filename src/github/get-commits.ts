import { Endpoints } from '@octokit/types';

import * as fs from 'fs';
import { Octokit } from 'octokit';

import config from '../../config';
import {
  Commit,
  ConfigurationTypes,
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

const simplifyCommit = (repo: string, _: Commit): SimpleCommit => ({
  repo,
  date: dateNow(_.commit.committer.date),
  description: _.commit.message,
  commit: _.html_url,
});

const timeNumber = (time: string): number => Number(time.replace(':', ''));

const timeFilter =
  (
    item: ConfigurationTypes['appointmentConfig']['dayTimes'][number],
    index: number
  ) =>
  (d): boolean =>
    (timeNumber(item.start) < timeNumber(d.time) &&
      timeNumber(d.time) < timeNumber(item.end)) ||
    (index === 0 && timeNumber(d.time) < timeNumber(item.end)) ||
    (index === config.appointmentConfig.dayTimes.length - 1 &&
      timeNumber(d.time) > timeNumber(item.start));

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

    const toAdd = {
      time,
      description: item.description,
      commit: item.commit,
      repo: item.repo,
    };

    if (exists) {
      dayGroup[index] = {
        date: dayGroup[index].date,
        descriptions: dayGroup[index].descriptions.concat([toAdd]),
      };
    } else {
      dayGroup.push({ date: day, descriptions: [toAdd] });
    }
  });

  const dayGroups: TimeGroupedCommit[] = dayGroup.map((_) => ({
    ..._,
    descriptions: config.appointmentConfig.dayTimes.map((item, i) => {
      const filterByTime: DayGroupedCommit['descriptions'] =
        _.descriptions.filter(timeFilter(item, i));

      const descriptions: TimeGroupedCommit['descriptions'][number]['descriptions'] =
        [];

      filterByTime.forEach((d) => {
        let index = 0;
        const exists = descriptions.find(({ repo }, _) => {
          index = _;

          return repo === d.repo;
        });

        const toAdd = { repo: d.repo, text: `${d.description} (${d.commit})` };

        if (exists) {
          descriptions[index] = {
            repo: descriptions[index].repo,
            text: descriptions[index].text.concat([toAdd.text]),
          };
        } else {
          descriptions.push({ repo: d.repo, text: [toAdd.text] });
        }
      });

      return { ...item, descriptions };
    }),
  }));

  return dayGroups.map((_) => ({
    ..._,
    description: _.descriptions
      .map(
        ({ start, end, descriptions }) =>
          `## ${start} - ${end}\n` +
          descriptions
            .map(
              ({ repo, text }) =>
                `### ${repo}\n${text.map((t) => ` - ${t}`).join('\n')}`
            )
            .join('\n') +
          '\n'
      )
      .join('\n'),
  }));
};

const joinLists = (commits: SimpleCommit[][]): SimpleCommit[] => {
  const items: SimpleCommit[] = [];

  commits.forEach((list) => list.forEach((c) => items.push(c)));

  return items;
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

  const promise = config.github.repositories.map(
    async (repo): Promise<SimpleCommit[]> => {
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

      const simplified: SimpleCommit[] = response.data.map((data) =>
        simplifyCommit(repo.name, data)
      );

      return removeMerge(simplified);
    }
  );

  const response = await Promise.all(promise);

  const joined = joinLists(response);

  // sort by date
  joined.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const groupedByDate: GroupedCommit[] = groupByDate(joined);

  // write markdown
  const name = new Date().toISOString().replace(/[:.T]/gm, '-');
  const filename = `markdowns/${name}.md`;

  fs.writeFileSync(filename, joinInMD(groupedByDate));

  // eslint-disable-next-line no-console
  console.log(filename + ' ok');
})();
