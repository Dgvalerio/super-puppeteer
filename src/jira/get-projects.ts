import { project } from './utils';

(async (): Promise<void> => {
  const projects = await project.getAll();

  console.log(projects);

  console.table(
    projects.map(({ id, key, name, self }) => ({ id, key, name, self }))
  );
})();
