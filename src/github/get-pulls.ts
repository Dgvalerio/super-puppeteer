import { getMonth, parseISO } from 'date-fns';

import config from '../../config';
import { getComments, getPulls, getReviews, getUser } from '../util/github';
import { logger } from '../util/logger';
import { sortBy } from '../util/sort-by';

(async (): Promise<void> => {
  const user = await getUser();

  config.github.repositories.map(async ({ name }, index) => {
    if (index !== 0) return;

    const [owner, repo] = name.split('/');

    const pulls = await getPulls({ owner, repo });

    const fPulls = pulls.map((r) => ({
      number: r.number,
      state: r.state,
      user: r.user.login,
      title: r.title,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));

    const promise = fPulls.map(async (pr) => {
      const params = { owner, repo, pull_number: pr.number };

      const comments = await getComments(params);

      const reviews = await getReviews(params);

      const items: { state?: string; body: string; date: string }[] = [];

      reviews
        .filter((r) => r.user.login === user.login)
        .filter((r) => getMonth(parseISO(r.submitted_at)) === 8)
        .forEach((r) =>
          items.push({ state: r.state, body: r.body, date: r.submitted_at })
        );

      comments
        .filter((r) => r.user.login === user.login)
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
        items: items.sort(sortBy('date')),
      };
    });

    const result = await Promise.all(promise);

    result.sort(sortBy('number')).map(({ title, items }) => {
      if (items.length === 0) return;

      logger.info(title);

      items.length > 0 &&
        logger.table(
          items.map((r) => ({
            state: r.state,
            body: typeof r.body === 'string' ? r.body.substring(0, 64) : r.body,
            date: new Date(r.date).toLocaleString('pt-br'),
          }))
        );
    });
  });
})();
