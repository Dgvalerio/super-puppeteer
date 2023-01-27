import config from '../../config';
import { project } from './utils';

(async (): Promise<void> => {
  const key = config.jira.projectKey;

  if (!key) return;

  const aProject = await project.getOne(key);

  console.log(aProject);
})();
