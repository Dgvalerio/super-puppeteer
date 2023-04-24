import axios from 'axios';
import { Cookie } from 'tough-cookie';

import { Timesheet } from '../types';
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

interface Appointment {
  client: string;
  project: string;
  category: string;
  // No formado dd/MM/yyyy
  date: string;
  // No formato hh:mm
  startTime: string;
  // No formato hh:mm
  endTime: string;
  notMonetize?: boolean;
  commitLink?: string;
  description: string;
}

interface AppointmentResult extends Appointment {
  success: boolean;
  errorMessage?: string;
}

const appointmentParse = (
  data: Appointment
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
  { cookies, ...defaults }: Partial<Appointment> & { cookies: Cookie[] },
  appointments: Partial<Appointment>[]
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
        } as Appointment;

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
  const cookies = await loadCookies();

  const result = await create(
    { cookies, client: '15', project: '15289', category: '1021' },
    [
      {
        client: '8231',
        project: '18548',
        category: '1',
        commitLink: 'Na descrição.',
        date: '06/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description: `
Participando da Sprint Planning

Em "multi-fit-app":
- Correção/manutenção de bug em "choose-activity": corrigir ortografia de erro de mensagem (https://github.com/lubysoftware/multi-fit-app/commit/2c841980e2cb32cc0206399e2b2324f448a1ac4a);
`,
      },
      {
        client: '8231',
        project: '18548',
        category: '1',
        commitLink: 'Na descrição.',
        date: '06/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description: `Em "multi-fit-app":
- Correção/manutenção de bug em "choose-activity": corrigir ortografia de erro de mensagem (https://github.com/lubysoftware/multi-fit-app/commit/2c841980e2cb32cc0206399e2b2324f448a1ac4a);
- Correção/manutenção de bug em "dashboard": reorganizar ordem de importação (https://github.com/lubysoftware/multi-fit-app/commit/5d2f2ae326b3a496b4be68c44310927e89a7f0b5);
- Desenvolvimento de feature em "activity": adicionar animação ao pressionar o botão stop no resumo da atividade (https://github.com/lubysoftware/multi-fit-app/commit/a5d52e985639725905b4549093b399611fd6b244).`,
      },
      {
        date: '11/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description:
          'Estudando Typescript, NestJS, GraphQL, Prisma e a API do GitHub.',
      },
      {
        date: '11/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description:
          'Estudando Typescript, NestJS, GraphQL, Prisma e a API do GitHub.',
      },
      {
        date: '12/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description:
          'Estudando Typescript, NestJS, GraphQL, Prisma e a API do GitHub.',
      },
      {
        date: '12/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description:
          'Estudando Typescript, NestJS, GraphQL, Prisma e a API do GitHub.',
      },
      {
        date: '14/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description:
          'Estudando Typescript, NestJS, GraphQL, Prisma e a API do GitHub.',
      },
      {
        date: '14/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description:
          'Estudando Typescript, NextJS, GraphQL, Prisma e a API do GitHub.',
      },
      {
        client: '8231',
        project: '18548',
        category: '1',
        commitLink: 'Na descrição.',
        date: '17/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description: `Em "multi-fit-app", corrigindo layout do dashboard:
- Correção/manutenção de bug em "choose-activity": corrigir ortografia de erro de mensagem (https://github.com/lubysoftware/multi-fit-app/commit/2c841980e2cb32cc0206399e2b2324f448a1ac4a);
- Correção/manutenção de bug em "dashboard": reorganizar ordem de importação (https://github.com/lubysoftware/multi-fit-app/commit/5d2f2ae326b3a496b4be68c44310927e89a7f0b5);
- Desenvolvimento de feature em "activity": adicionar animação ao pressionar o botão stop no resumo da atividade (https://github.com/lubysoftware/multi-fit-app/commit/a5d52e985639725905b4549093b399611fd6b244);
- Correção/manutenção de bug em "login": ajustar itens alinhar (https://github.com/lubysoftware/multi-fit-app/commit/18b4f1dfcf3761c8dd8a8d0904a0cb0304aa867f);
- Refatoração em "low-resolution-util": alinhar código (https://github.com/lubysoftware/multi-fit-app/commit/80f75f2560f65f11eb9f7ae7b159fbf2e8781e4c);
`,
      },
      {
        client: '8231',
        project: '18548',
        category: '1',
        commitLink: 'Na descrição.',
        date: '17/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description: `Em "multi-fit-app", corrigindo layout do dashboard:
- Refatoração em "activity-card": alterar tamanho das informações (https://github.com/lubysoftware/multi-fit-app/commit/3ff5df4842c279369d6d4c7b86a81fa0b30f2d4e);
- Refatoração em "activity-card": remover utilitário não utilizado (https://github.com/lubysoftware/multi-fit-app/commit/b83f8c971e93dfea0876755af5808e892437de19);
- Desenvolvimento de feature em "activity-card": criar um utilitário para simplificar números (https://github.com/lubysoftware/multi-fit-app/commit/a48c1fd81a83cff1f4fa3d65e6e4c316d9d07a8d);
- Correção/manutenção de bug em "activity-card": remover valor estático falso (https://github.com/lubysoftware/multi-fit-app/commit/b75d6f8b3f1f6d43ad4237fc736cb7acc2959d77);
`,
      },
      {
        date: '18/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description:
          'Estudando Typescript, Next.js, GraphQL, MUI, ReactFormHooks e Apollo Client.',
      },
      {
        date: '18/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description:
          'Estudando Typescript, Next.js, GraphQL, MUI, ReactFormHooks e Apollo Client.',
      },
      {
        date: '19/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description:
          'Estudando Typescript, Next.js, GraphQL, MUI, ReactFormHooks e Zod para validações.',
      },
      {
        date: '19/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description:
          'Estudando Typescript, Next.js, GraphQL, MUI, ReactFormHooks e Zod para validações.',
      },
      {
        date: '20/04/2023',
        startTime: '06:30',
        endTime: '12:00',
        description:
          'Estudando Typescript, Next.js, GraphQL, MUI, ReactFormHooks e Zod para validações.',
      },
      {
        date: '20/04/2023',
        startTime: '13:00',
        endTime: '15:30',
        description:
          'Estudando Typescript, Next.js, GraphQL, MUI, ReactFormHooks e Zod para validações.',
      },
    ]
  );

  console.log(result);
})();
