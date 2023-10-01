import { getMonth, parseISO } from 'date-fns';
import { Octokit } from 'octokit';

import config from '../../config';

(async (): Promise<void> => {
  const octokit = new Octokit({ auth: config.github.token });

  const user = await octokit.rest.users.getAuthenticated();

  config.github.repositories.map(async ({ name }, index) => {
    if (index !== 0) return;

    const [owner, repo] = name.split('/');

    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      per_page: 100,
      state: 'all',
    });

    const fPulls = pulls.data.map((r) => ({
      number: r.number,
      state: r.state,
      user: r.user.login,
      title: r.title,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));

    const promise = fPulls.map(async (pr) => {
      const comments = await octokit.request(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/comments',
        {
          owner,
          repo,
          pull_number: pr.number,
          per_page: 100,
        }
      );

      const reviews = await octokit.request(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
        {
          owner,
          repo,
          pull_number: pr.number,
          per_page: 100,
        }
      );

      return {
        title: `[${pr.number}] - ${pr.title} @${pr.user} (${new Date(
          pr.updated_at
        ).toLocaleString('pt-rr')}) ${
          getMonth(parseISO(pr.updated_at)) === 8 ? 'Current!' : ''
        }`,
        reviews: reviews.data
          .filter((r) => r.user.login === user.data.login)
          .filter((r) => getMonth(parseISO(r.submitted_at)) === 8),
        comments: comments.data
          .filter((r) => r.user.login === user.data.login)
          .filter(
            (r) =>
              getMonth(parseISO(r.updated_at)) === 8 ||
              getMonth(parseISO(r.created_at)) === 8
          ),
      };
    });

    const result = await Promise.all(promise);

    result.map(({ title, comments, reviews }) => {
      if (comments.length + reviews.length === 0) {
        return;
      }

      console.log(title);

      comments.length > 0 &&
        console.table(
          comments.map((r) => ({
            body: typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
            created_at: new Date(r.created_at).toLocaleString('pt-br'),
          }))
        );

      reviews.length > 0 &&
        console.table(
          reviews.map((r) => ({
            state: r.state,
            body: typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
            submitted_at: new Date(r.submitted_at).toLocaleString('pt-br'),
          }))
        );
    });
  });
})();
