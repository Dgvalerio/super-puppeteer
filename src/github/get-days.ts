import { getMonth, parseISO } from 'date-fns';

import config from '../../config';
import { Comment, Pull, Review, SimplePull } from '../types';
import { getComments, getPulls, getReviews, getUser } from '../util/github';
import { logger } from '../util/logger';
import { sortBy } from '../util/sort-by';
import { writeFile } from '../util/write-file';

(async (): Promise<void> => {
  const iso = config.github.when.since;
  const date = iso.split('T')[0];
  const currentMonth = Number(date.split('-')[1]) - 1;

  const { login } = await getUser();

  const repositoriesPulls: Record<string, Record<string, string[]>> = {};

  const loadingPulls = config.github.repositories.map(async ({ name }) => {
    const [owner, repo] = name.split('/');

    logger.info(`Loading "${repo}" from "${owner}"`);

    const pulls = await getPulls({ owner, repo });

    const fPulls: SimplePull[] = pulls.map((r) => ({
      number: r.number,
      state: r.state,
      user: r.user.login,
      title: r.title,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));

    interface PullRequest {
      number: Pull['number'];
      date: Pull['updated_at'];
      title: string;
      items: {
        state?: Review['state'];
        body: Review['body'] | Comment['body'];
        date: Review['submitted_at'] | Comment['created_at'];
      }[];
    }

    const promise: Promise<PullRequest>[] = fPulls.map(async (pr) => {
      const params = { repo, owner, pull_number: pr.number };

      const comments = await getComments(params);

      const reviews = await getReviews(params);

      const items: {
        state?: Review['state'];
        body: Review['body'] | Comment['body'];
        date: Review['submitted_at'] | Comment['created_at'];
      }[] = [];

      reviews
        .filter((r) => r.user.login === login)
        .filter((r) => getMonth(parseISO(r.submitted_at)) === currentMonth)
        .forEach((r) =>
          items.push({ state: r.state, body: r.body, date: r.submitted_at })
        );

      comments
        .filter((r) => r.user.login === login)
        .filter((r) => getMonth(parseISO(r.created_at)) === currentMonth)
        .forEach((r) => items.push({ body: r.body, date: r.created_at }));

      return {
        number: pr.number,
        date: pr.updated_at,
        title: `Pull Request ${pr.number} referente a "${pr.title}"`,
        items: items.sort(sortBy('date')),
      };
    });

    const result: PullRequest[] = await Promise.all(promise);

    const byDay: Record<string, string[]> = {};

    result.sort(sortBy('number')).forEach(({ title, items }) => {
      items.forEach((r) => {
        const key = new Date(r.date).toLocaleDateString('pt-br');

        if (!byDay[key]) byDay[key] = [];

        const action = r.state === 'APPROVED' ? 'Aprovando' : 'Corrigindo';

        const content = ` - ${action} o ${title}\n`;

        const exists = byDay[key].find((value) => value === content);

        if (!exists) byDay[key].push(content);
      });
    });

    repositoriesPulls[name] = byDay;

    logger.info(`"${repo}" from "${owner}" loaded`);
  });

  await Promise.all(loadingPulls);

  const grouped: Record<string, Record<string, string[]>> = {};

  Object.entries(repositoriesPulls).forEach(([repository, days]) =>
    Object.entries(days).forEach(([date, content]) => {
      if (!grouped[date]) grouped[date] = {};

      grouped[date][repository] = content;
    })
  );

  writeFile(
    Object.entries(grouped)
      .map(([date, day]) => ({ date, day }))
      .sort(sortBy('date'))
      .map(
        ({ date, day }) =>
          `# ${date}\n${Object.entries(day)
            .map(
              ([repository, content]) => `## ${repository}\n${content.join('')}`
            )
            .join('\n')}`
      )
      .join('\n')
  );
})();
