import { ConfigurationTypes } from './src/types';

// TODO: insira seus dados aqui
const config: ConfigurationTypes = {
  timesheet: {
    login: 'seu@email.com',
    password: 'sua_senha',
  },
  github: {
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
  appointmentConfig: {
    dayTimes: [
      { start: '06:30', end: '12:00' },
      { start: '13:00', end: '15:30' },
    ],
  },
};

export default config;
