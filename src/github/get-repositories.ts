import { Repositories } from '../types';
import { getOctokit } from '../util/github';
import { logger } from '../util/logger';

(async (): Promise<void> => {
  const octokit = getOctokit();

  const get = async (): Promise<Repositories> => {
    let aux: Repositories = [];

    const request = async (page: number): Promise<void> => {
      const response = await octokit.request('GET /user/repos', {
        per_page: 100,
        sort: 'pushed',
        page,
      });

      aux = aux.concat(response.data);

      if (response.headers.link && response.headers.link.includes('last'))
        await request(page + 1);
    };

    await request(1);

    return aux;
  };

  const data = await get();

  const parsed = data.map(({ full_name, name, owner }) => ({
    full_name,
    name,
    owner: { login: owner.login, avatar: owner.avatar_url },
  }));

  logger.table(parsed);
})();
