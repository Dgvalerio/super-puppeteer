import config from '../../config';
import { getRepositoryBranches } from '../util/github';
import { logger } from '../util/logger';

(async (): Promise<void> => {
  config.github.repositories.map(async ({ name }) => {
    const data = await getRepositoryBranches({ name });

    logger.table(
      data.map((props) => ({
        repo: name,
        name: props.name,
        sha: props.commit.sha,
      }))
    );
  });
})();
