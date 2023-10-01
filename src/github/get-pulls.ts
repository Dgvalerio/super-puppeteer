import { Octokit } from 'octokit';

import config from '../../config';

(async (): Promise<void> => {
  const octokit = new Octokit({ auth: config.github.token });

  config.github.repositories.map(async ({ name }, index) => {
    if (index !== 0) return;

    const [owner, repo] = name.split('/');

    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      per_page: 100,
      state: 'all',
    });

    console.table(
      pulls.data.map((r) => ({
        number: r.number,
        state: r.state,
        title: r.title,
        body: typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
        created_at: r.created_at,
        updated_at: r.updated_at,
      }))
    );

    const comments = await octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}/comments',
      {
        owner,
        repo,
        pull_number: 71,
        per_page: 100,
      }
    );

    console.table(
      comments.data.map((r) => ({
        user: r.user.login,
        body: typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
        created_at: r.created_at,
        updated_at: r.updated_at,
      }))
    );

    const reviews = await octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
      {
        owner,
        repo,
        pull_number: 71,
        per_page: 100,
      }
    );

    console.table(
      reviews.data.map((r) => ({
        user: r.user.login,
        body: typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
        state: r.state,
        submitted_at: r.submitted_at,
      }))
    );
  });
})();
