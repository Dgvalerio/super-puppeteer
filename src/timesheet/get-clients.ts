import axios, { AxiosRequestConfig } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { Cookie, CookieJar } from 'tough-cookie';

import configurations from '../../config';
import { project } from '../jira/utils';
import { Timesheet } from '../types';

const progress = (message: string): void =>
  // eslint-disable-next-line no-console
  console.log(` - - - ${message} - - - `);

const loadCookies = async (): Promise<Cookie[]> => {
  try {
    const response = await axios.get(
      'https://luby-timesheet.azurewebsites.net/Account/Login'
    );

    const regex = /value="([\S\s]+?)??" \/>/g;
    const token = regex.exec(response.data)[1];

    const verificationToken = response.headers['set-cookie']
      .find((ck) => ck.includes('__RequestVerificationToken'))
      .split(';')[0]
      .split('=')[1];

    const cookieJar = new CookieJar();

    wrapper(axios);

    const { login, password } = configurations.timesheet;

    await axios.post(
      'https://luby-timesheet.azurewebsites.net/Account/Login',
      `__RequestVerificationToken=${token}&Login=${login}&Password=${password}`,
      {
        headers: { cookie: `__RequestVerificationToken=${verificationToken};` },
        jar: cookieJar,
        withCredentials: true,
      }
    );

    const { cookies } = cookieJar.toJSON();

    return cookies as Cookie[];
  } catch (e) {
    console.error('Error: ', e);
  }
};

const config = (cookies: Cookie[]): AxiosRequestConfig => {
  const cookie: string = cookies.reduce(
    (previous, { key, value }) => `${previous} ${key}=${value};`,
    ''
  );

  return {
    baseURL: 'https://luby-timesheet.azurewebsites.net',
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
      'x-requested-with': 'XMLHttpRequest',
      cookie,
      Referer: 'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  };
};

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
