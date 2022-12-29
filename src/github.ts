import * as fs from 'fs';
import { Octokit } from 'octokit';

import config from '../config';
import { Commit, GroupedCommit, SimpleCommit } from './types';

const email = config.github.email;
const token = config.github.token;
const branch = { commit: { sha: config.github.branch_sha } };

(async (): Promise<void> => {
  const octokit = new Octokit({ auth: token });

  const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'lubysoftware',
    repo: 'multi-fit-app',
    author: email,
    sha: branch.commit.sha,
    per_page: 100,
    since: '2022-12-01T00:00:00Z',
  });

  const dateNow = (dateString: string): string => {
    const date = new Date(dateString);

    date.setHours(date.getHours() - 3);

    return date.toISOString();
  };

  const parse = (_: Commit): SimpleCommit => ({
    date: dateNow(_.commit.committer.date),
    description: _.commit.message,
    commit: _.html_url,
  });

  const parsed = response.data.map((data) => parse(data));

  // sort by date
  parsed.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const groupByDate = (commits: SimpleCommit[]): GroupedCommit[] => {
    const part: GroupedCommit[] = [];

    commits.forEach((item) => {
      let index = 0;
      const exists = part.find(({ date }, _) => {
        index = _;

        return item.date.split('T')[0] === date.split('T')[0];
      });

      if (exists) {
        part[index] = {
          date: part[index].date,
          description:
            `${part[index].description}\n` +
            ` - ${item.description} (${item.commit})`,
        };
      } else {
        part.push({
          date: item.date.split('T')[0],
          description: ` - ${item.description} (${item.commit})`,
        });
      }
    });

    return part;
  };

  const removeMerge = (commits: SimpleCommit[]): SimpleCommit[] =>
    commits.filter(
      ({ description }) => !description.includes("Merge branch 'develop'")
    );

  const grouped = groupByDate(removeMerge(parsed));

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

  const name = new Date().toISOString().replace(/[:.T]/gm, '-');

  // write markdown
  fs.writeFileSync(`markdowns/${name}.md`, joinInMD(grouped));
})();
