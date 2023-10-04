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

      const items: { state?: string; body: string; date: string }[] = [];

      reviews.data
        .filter((r) => r.user.login === user.data.login)
        .filter((r) => getMonth(parseISO(r.submitted_at)) === 8)
        .forEach((r) =>
          items.push({ state: r.state, body: r.body, date: r.submitted_at })
        );

      comments.data
        .filter((r) => r.user.login === user.data.login)
        .filter(
          (r) =>
            getMonth(parseISO(r.updated_at)) === 8 ||
            getMonth(parseISO(r.created_at)) === 8
        )
        .forEach((r) => items.push({ body: r.body, date: r.created_at }));

      return {
        number: pr.number,
        title: `[${pr.number}] - ${pr.title} @${pr.user} (${new Date(
          pr.updated_at
        ).toLocaleString('pt-br')}) ${
          getMonth(parseISO(pr.updated_at)) === 8 ? 'Current!' : ''
        }`,
        items: items.sort((a, b) => {
          if (a.date < b.date) return -1;
          else if (a.date > b.date) return 1;
          else return 0;
        }),
      };
    });

    const result = await Promise.all(promise);

    result
      .sort((a, b) => {
        if (a.number < b.number) return -1;
        else if (a.number > b.number) return 1;
        else return 0;
      })
      .map(({ title, items }) => {
        if (items.length === 0) return;

        console.log(title);

        items.length > 0 &&
          console.table(
            items.map((r) => ({
              state: r.state,
              body:
                typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
              date: new Date(r.date).toLocaleString('pt-br'),
            }))
          );
      });
  });
})();
