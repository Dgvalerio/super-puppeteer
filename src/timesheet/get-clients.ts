import axios from 'axios';
import { Cookie } from 'tough-cookie';

import { Timesheet } from '../types';
import { axiosConfig as config, loadCookies } from '../utils';

const progress = (message: string): void =>
  // eslint-disable-next-line no-console
  console.log(` - - - ${message} - - - `);

const loadCategories = async (
  project: Pick<Timesheet.Project, 'Id' | 'Name'>,
  cookies: Cookie[]
): Promise<Timesheet.Category[]> => {
  try {
    const { data } = await axios.post<Timesheet.Category[]>(
      '/Worksheet/ReadCategory',
      `idproject=${project.Id}`,
      config(cookies)
    );

    return data;
  } catch (e) {
    console.error(`Error on get Categories from "${project.Name}" process!`, e);

    return [];
  }
};

const loadProjects = async (
  client: Pick<Timesheet.Client, 'id' | 'title'>,
  cookies: Cookie[]
): Promise<Timesheet.Project[]> => {
  try {
    const { data } = await axios.post<Omit<Timesheet.Project, 'categories'>[]>(
      '/Worksheet/ReadProject',
      `idcustomer=${client.id}`,
      config(cookies)
    );

    const projects = data.map(async (p) => ({
      ...p,
      categories: await loadCategories(p, cookies),
    }));

    return await Promise.all(projects);
  } catch (e) {
    console.error(`Error on get Projects from "${client.title}" process!`, e);

    return [];
  }
};

const loadClients = async (cookies: Cookie[]): Promise<Timesheet.Client[]> => {
  const clients: Timesheet.Client[] = [];

  try {
    const response = await axios.get('/Worksheet/Read', config(cookies));

    const html: string = response.data;

    const regex = /(name="IdCustomer">)([\w\W]+?)(<\/select>)/gm;
    const search: string = (html.match(regex) || [''])[0];

    const cleanedSearch = search.split(/\r\n/gm).join('');

    const values = cleanedSearch.match(/value="([\S\s]+?)??">([\S\s]+?)</g);

    if (!values) {
      if (html.match('<div class="login-content">'))
        console.error('Cookies are invalid!');
      else console.error('Options not found!');

      return [];
    }

    progress(`${values.length - 1} clientes carregados!`);
    progress(`Carregando projetos e categorias...`);

    const clientsPromise: Promise<Timesheet.Client>[] = values.map(
      async (option) => {
        const [id, title] = option
          .replace(/value="([\S\s]+?)??">([\S\s]+?)</g, '$1|$2')
          .split('|');

        if (id) {
          const projects = await loadProjects({ id, title }, cookies);

          clients.push({ id, title, projects });
        }

        return { id: id || '-1', title, projects: [] };
      }
    );

    await Promise.all(clientsPromise);
  } catch (e) {
    console.error('Error on “Get Clients” process!', e);
  }

  if (clients.length <= 0) console.error('Clients not loaded');

  return clients;
};

(async (): Promise<void> => {
  progress('Carregando cookies...');

  const cookies = await loadCookies();

  progress('Carregando clientes...');

  const clients = await loadClients(cookies);

  console.log('\n');

  clients.map((client) => {
    console.log(
      `Projetos do cliente [${client.id}] "${client.title}", e suas respectivas categorias:`
    );
    client.projects.forEach((project) => {
      console.log(` - [${project.Id}] "${project.Name}"`);
      project.categories.forEach((category) =>
        console.log(` - - - [${category.Id}] "${category.Name}"`)
      );
    });
    console.log('\n');
  });
})();
