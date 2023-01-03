import { Octokit } from 'octokit';

import config from '../../config';

(async (): Promise<void> => {
  const octokit = new Octokit({ auth: config.github.token });

  config.github.repositories.map(async ({ name: repo }) => {
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/branches',
      { owner: 'lubysoftware', repo, per_page: 100 }
    );

    console.table(
      response.data.map(({ name, commit }) => ({
        repo,
        name: name,
        sha: commit.sha,
      }))
    );
  });
})();
