import { Endpoints } from '@octokit/types';

import * as fs from 'fs';
import { Octokit } from 'octokit';

import config from '../../config';
import { Commit, GroupedCommit, SimpleCommit } from '../types';

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

const groupByDate = (commits: SimpleCommit[]): GroupedCommit[] => {
  const part: GroupedCommit[] = [];

  commits.forEach((item) => {
    const day = item.date.split('T')[0];
    const time = item.date.split('T')[1].split('.')[0];

    let index = 0;
    const exists = part.find(({ date }, _) => {
      index = _;

      return day === date.split('T')[0];
    });

    if (exists) {
      part[index] = {
        date: part[index].date,
        description:
          `${part[index].description}\n` +
          ` - [${time}] ${item.description} (${item.commit})`,
      };
    } else {
      part.push({
        date: day,
        description: ` - [${time}] ${item.description} (${item.commit})`,
      });
    }
  });

  return part;
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
