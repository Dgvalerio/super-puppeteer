import config from '../../config';
import { getOctokit } from '../util/github';
import { logger } from '../util/logger';

(async (): Promise<void> => {
  config.github.repositories.map(async ({ name }) => {
    const [owner, repo] = name.split('/');

    const response = await getOctokit().request(
      'GET /repos/{owner}/{repo}/branches',
      { owner, repo, per_page: 100 }
    );

    logger.table(
      response.data.map(({ name, commit }) => ({
        repo,
        name: name,
        sha: commit.sha,
      }))
    );
  });
})();
