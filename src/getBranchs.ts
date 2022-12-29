import { Octokit } from 'octokit';

import config from '../config';

const token = config.github.token;

(async (): Promise<void> => {
  const octokit = new Octokit({ auth: token });

  const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner: 'lubysoftware',
    repo: config.github.repository,
    per_page: 100,
  });

  console.table(
    response.data.map((branch) => ({
      name: branch.name,
      sha: branch.commit.sha,
    }))
  );
})();
