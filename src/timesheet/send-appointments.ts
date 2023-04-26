import axios from 'axios';
import { Cookie } from 'tough-cookie';

import config from '../../config';
import { SimpleAppointment, Timesheet } from '../types';
import { axiosConfig, loadCookies } from '../utils';

const make = (
  WebKitFormBoundary: string,
  data: Timesheet.Appointment
): string => {
  const start = `------WebKitFormBoundary${WebKitFormBoundary}\r\nContent-Disposition: form-data; `;

  const values = Object.entries(data).reduce(
    (prev, [key, value]) => prev + `${start}name="${key}"\r\n\r\n${value}\r\n`,
    ''
  );

  return `${values}------WebKitFormBoundary${WebKitFormBoundary}--\r\n`;
};

interface AppointmentResult extends SimpleAppointment {
  success: boolean;
  errorMessage?: string;
}

const appointmentParse = (
  data: SimpleAppointment
): Omit<Timesheet.Appointment, '__RequestVerificationToken'> => ({
  Id: '0',
  IdCustomer: data.client,
  IdProject: data.project,
  IdCategory: data.category,
  InformedDate: data.date,
  StartTime: data.startTime,
  EndTime: data.endTime,
  NotMonetize: data.notMonetize ? 'true' : 'false',
  CommitRepository: data.commitLink || 'Não aplicado.',
  Description: data.description,
});

const create = async (
  { cookies, ...defaults }: Partial<SimpleAppointment> & { cookies: Cookie[] },
  appointments: Partial<SimpleAppointment>[]
): Promise<AppointmentResult[]> => {
  try {
    const response = await axios.get('/Worksheet/Read', axiosConfig(cookies));

    const regex =
      /name="__RequestVerificationToken" type="hidden" value="([\S\s]+?)??" \/>/g;
    const __RequestVerificationToken = regex.exec(response.data)[1];

    const cookie: string = cookies.reduce(
      (previous, { key, value }) => `${previous} ${key}=${value};`,
      ''
    );

    const WebKitFormBoundary = 'MAKEaAppoINtmEnB';

    const promise = appointments.map(
      async (appointment): Promise<AppointmentResult> => {
        const completeAppointment = {
          ...defaults,
          ...appointment,
        } as SimpleAppointment;

        const { data } = await axios.post(
          'https://luby-timesheet.azurewebsites.net/Worksheet/Update',
          make(WebKitFormBoundary, {
            ...appointmentParse(completeAppointment),
            __RequestVerificationToken,
          }),
          {
            headers: {
              accept:
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
              'cache-control': 'max-age=0',
              'content-type': `multipart/form-data; boundary=----WebKitFormBoundary${WebKitFormBoundary}`,
              'sec-ch-ua':
                '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'document',
              'sec-fetch-mode': 'navigate',
              'sec-fetch-site': 'same-origin',
              'sec-fetch-user': '?1',
              'upgrade-insecure-requests': '1',
              cookie,
              Referer:
                'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
              'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
          }
        );

        const regexError = /<div class="alert alert-danger">([\S\s]+?)??<a/gm;
        const errorResult = regexError.exec(data);

        return {
          ...completeAppointment,
          success: !errorResult,
          errorMessage: errorResult ? errorResult[1] : undefined,
        } as AppointmentResult;
      }
    );

    return await Promise.all(promise);
  } catch (e) {
    console.error({ e });
  }
};

(async (): Promise<void> => {
  if (config.appointments.length <= 0) {
    return console.log('Não há nada para apontar');
  }

  const cookies = await loadCookies();

  const result = await create(
    { cookies, ...config.appointmentsDefaults },
    config.appointments
  );

  console.log(result);
})();
