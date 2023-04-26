import axios, { AxiosRequestConfig } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { Cookie, CookieJar } from 'tough-cookie';

import config from '../config';
import { IAppointments } from './types';

export const axiosConfig = (cookies: Cookie[]): AxiosRequestConfig => {
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

export const loadCookies = async (): Promise<Cookie[]> => {
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

    await axios.post(
      'https://luby-timesheet.azurewebsites.net/Account/Login',
      `__RequestVerificationToken=${token}&Login=${config.timesheet.login}&Password=${config.timesheet.password}`,
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

const commonData = {
  client: '8231',
  project: '18548',
  category: '1',
  notMonetize: false,
};

export const make = (
  date: string,
  descriptions: string[],
  commit?: string
): IAppointments[] =>
  config.appointmentConfig.dayTimes.map(
    ({ start, end }, index): IAppointments => ({
      date,
      description:
        descriptions.length === 1 ? descriptions[0] : descriptions[index],
      startTime: start,
      endTime: end,
      commit: commit || 'Na Descrição',
      ...commonData,
    })
  );
