import { getAllProjects } from './utils';

(async (): Promise<void> => {
  const projects = await getAllProjects();

  console.table(
    projects.values.map(({ id, key, name, self }) => ({ id, key, name, self }))
  );
})();
