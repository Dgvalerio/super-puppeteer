import { project } from './utils';

(async (): Promise<void> => {
  const projects = await project.getAll();

  console.table(
    projects.values.map(({ id, key, name, self }) => ({ id, key, name, self }))
  );
})();
