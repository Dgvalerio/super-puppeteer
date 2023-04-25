import { ConfigurationTypes } from './src/types';

// TODO: insira seus dados aqui
const config: ConfigurationTypes = {
  timesheet: {
    login: 'seu@email.com',
    password: 'sua_senha',
  },
  github: {
    // https://github.com/settings/tokens/new?scopes=user,repo&description=to-brinks
    token: 'github_token',
    repositories: [
      {
        name: 'multi-fit-app',
        branch_sha: 'b3f857421497574811d16818db45113b6af2367d',
      },
      {
        name: 'multi-fit-lib',
      },
    ],
  },
  jira: {
    route: 'https://luby.atlassian.net',
    email: 'seu@email.com',
    // // https://id.atlassian.com/manage-profile/security/api-tokens
    token: 'jira_token',
    projectKey: 'PM',
  },
  appointmentConfig: {
    dayTimes: [
      { start: '06:30', end: '12:00' },
      { start: '13:00', end: '15:30' },
    ],
  },
  // Client Luby, Project Luby - Ociosidade, Categoria Treinamento
  appointmentsDefaults: { client: '15', project: '15289', category: '1021' },
  appointments: [
    {
      date: '11/04/2023',
      startTime: '06:30',
      endTime: '12:00',
      description:
        'Estudando Typescript, NestJS, GraphQL, Prisma e a API do GitHub.',
    },
  ],
};

export default config;
