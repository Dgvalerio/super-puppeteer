import puppeteer, {
  BrowserConnectOptions,
  BrowserLaunchArgumentOptions,
  LaunchOptions,
  Page,
  Product,
  Protocol,
} from 'puppeteer';

import config from '../../config';
import { IAppointments } from '../types';
import { make } from '../utils';

export type PuppeteerLaunchOptions = LaunchOptions &
  BrowserLaunchArgumentOptions &
  BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
  };

export const puppeteerOptions: PuppeteerLaunchOptions = {
  args: ['--no-sandbox', '--window-size=1280,768'],
  defaultViewport: { width: 1280, height: 768 },
  headless: false,
};

const baseURL = `https://luby-timesheet.azurewebsites.net`;

export const scrapper = {
  baseURL,
  accountLogin: `${baseURL}/Account/Login`,
  homeIndex: `${baseURL}/Home/Index`,
  worksheetRead: `${baseURL}/Worksheet/Read`,
  controlPanelManagerDeveloper: `${baseURL}/ControlPanel/ManagerDeveloper`,
};

export const waitOptions = { visible: true, timeout: 3000 };

const appointmentFailedMessage =
  'waiting for selector `.alert.alert-warning` failed: timeout 3000ms exceeded';

export const checkValue = async (
  page: Page,
  selector: string,
  value: string | boolean
): Promise<void> => {
  const response = await page.evaluate(
    (aSelector, aValue) => {
      const value = (<HTMLInputElement>document.querySelector(aSelector))[
        typeof aValue === 'boolean' ? 'checked' : 'value'
      ];

      if (value !== aValue) {
        if (typeof aValue === 'boolean')
          (<HTMLInputElement>document.querySelector(aSelector)).checked =
            aValue;
        else
          (<HTMLInputElement>document.querySelector(aSelector)).value = aValue;

        return false;
      }

      return true;
    },
    selector,
    value
  );

  if (!response) await checkValue(page, selector, value);
};

let appointments: IAppointments[] = [];

if (config.appointments && config.appointments.length > 0) {
  config.appointments.forEach(({ date, descriptions }) => {
    appointments = appointments.concat(make(date, descriptions));
  });
}

(async (): Promise<void> => {
  if (appointments.length <= 0) {
    console.log('Não há nada para apontar');

    return;
  }

  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();

  // LOGIN
  await (async (): Promise<Protocol.Network.Cookie[]> => {
    try {
      await page.goto(scrapper.accountLogin);

      await page.waitForSelector('form');

      await page.type('#Login', config.timesheet.login);

      await page.type('#Password', config.timesheet.password);

      await page.click('[type="submit"]');

      await page.waitForSelector('.sidebar-menu', { timeout: 3000 });

      if (page.url() !== scrapper.homeIndex) {
        return [];
      }

      const cookies = await page.cookies();

      if (!cookies) {
        return [];
      }

      if (cookies.length <= 0) {
        await page.close();
        await browser.close();

        return [];
      }

      return cookies;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Sign In failure: ', { e });

      return [];
    }
  })();

  const create = async (index: number): Promise<boolean> => {
    const appointment = appointments[index];

    try {
      await page.goto(scrapper.worksheetRead);

      await page.waitForSelector('#tbWorksheet', waitOptions);

      await page.select('#IdCustomer', appointment.client);
      await page.waitForResponse((response) =>
        response.url().includes('/Worksheet/ReadProject')
      );

      await page.select('#IdProject', appointment.project);
      await page.waitForResponse((response) =>
        response.url().includes('/Worksheet/ReadCategory')
      );
      await page.waitForResponse((response) =>
        response.url().includes('/Worksheet/ReadProjectProgress')
      );

      await page.select('#IdCategory', appointment.category);

      await page.waitForSelector('#Description', waitOptions);
      await page.click('#Description');
      await page.keyboard.type(appointment.description);
      await checkValue(page, '#Description', appointment.description);

      await page.waitForSelector('#InformedDate', waitOptions);
      await page.click('#InformedDate');
      await page.keyboard.type(appointment.date);
      await checkValue(page, '#InformedDate', appointment.date);

      if (Number(appointment.category) === 1 && appointment.commit) {
        await page.waitForSelector('#CommitRepository', waitOptions);
        await page.click('#CommitRepository');
        await page.keyboard.type(appointment.commit);
        await checkValue(page, '#CommitRepository', appointment.commit);
      }

      if (appointment.notMonetize) {
        await page.click('#NotMonetize');
        await checkValue(page, '#NotMonetize', appointment.notMonetize);
      }

      await page.waitForSelector('#StartTime', waitOptions);
      await page.click('#StartTime');
      await page.keyboard.type(appointment.startTime);
      await checkValue(page, '#StartTime', appointment.startTime);

      await page.waitForSelector('#EndTime', waitOptions);
      await page.click('#EndTime');
      await page.keyboard.type(appointment.endTime);
      await checkValue(page, '#EndTime', appointment.endTime);

      await page.click('[type="submit"]');
      await page.waitForSelector('.alert.alert-warning', waitOptions);

      if (index + 1 < appointments.length) {
        await create(index + 1);
      }
    } catch (e) {
      if ((<Error>e).message === appointmentFailedMessage) {
        try {
          await page.waitForSelector('.alert.alert-danger', waitOptions);

          await page.evaluate(
            () => document.querySelector('.alert.alert-danger')?.textContent
          );
        } catch (e2) {}
      }

      return false;
    }
  };

  await create(0);

  await setTimeout(async () => {
    page && (await page.close());
    browser && (await browser.close());
  }, 5000);
})();
