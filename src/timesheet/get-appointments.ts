import axios from 'axios';
import { Cookie } from 'tough-cookie';

import { Timesheet } from '../types';
import { axiosConfig as config, loadCookies } from '../utils';

interface Appointment {
  client: string;
  project: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  notMonetize?: boolean;
  commitLink?: string;
  description: string;
}

export const brDateToISO = (date: string): string => {
  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

const progress = (message: string): void =>
  console.log(` - - - ${message} - - - `);

const load = async (cookies: Cookie[]): Promise<Appointment[]> => {
  let appointments: Appointment[] = [];

  try {
    const response = await axios.get('/Worksheet/Read', config(cookies));

    const html: string = response.data;

    const regex = /(<tbody>)([\w\W]+?)(<\/tbody>)/gm;

    const search: string = (html.match(regex) || [''])[0];

    const cleanedSearch = search.split(/\r\n/gm).join('');

    const rows = cleanedSearch.match(/tr>([\S\s]+?)<\/tr/g);

    if (!rows) {
      if (html.match('<div class="login-content">'))
        console.error(`[${401}]: Cookies are invalid!`);
      else console.error(`[${500}]: Options not found!`);

      return [];
    }

    console.log({ rows });

    return [];

    const appointmentsPromise = rows.map(async (row): Promise<Appointment> => {
      const cols = row.split(/<\/td>([\S\s]+?)<td>/gm);

      cols[0] = cols[0].replace(/tr>([\S\s]+?)<td>/gm, '');

      cols[16] = (cols[16].match(/fff">([\S\s]+?)<\/span/gm) || [''])[0];
      cols[16] = cols[16].replace(/fff">([\S\s]+?)<\/span/gm, '$1');

      cols[18] = (cols[18].match(/id="([\S\s]+?)"/gm) || [''])[0];
      cols[18] = cols[18].replace(/id="([\S\s]+?)"/gm, '$1');

      const partial = { code: cols[18], status: cols[16] };

      const {
        data: {
          IdProject,
          IdCategory,
          InformedDate,
          StartTime,
          EndTime,
          NotMonetize,
          Description,
        },
      } = await axios.get<Timesheet.Appointment>(
        `/Worksheet/Update?id=${partial.code}`,
        config(cookies)
      );

      console.log({ NotMonetize });

      return {
        client: '?',
        project: String(IdProject),
        category: String(IdCategory),
        date: brDateToISO(InformedDate),
        startTime: StartTime,
        endTime: EndTime,
        description: Description,
        notMonetize: NotMonetize === 'true',
      };
    });

    appointments = await Promise.all(appointmentsPromise);
  } catch (e) {
    console.error('Error on "Get Appointments" process!', e);
  }

  if (appointments.length <= 0) console.error('Appointments not loaded');

  return appointments;
};

(async (): Promise<void> => {
  progress('Carregando cookies...');

  const cookies = await loadCookies();

  progress('Carregando apontamentos...');

  const appointments = await load(cookies);

  console.log('\n');

  appointments.map((appointment) => {
    console.log(appointment.description);
    console.log('\n');
  });
})();
