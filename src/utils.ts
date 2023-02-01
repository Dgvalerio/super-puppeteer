import config from '../config';
import { IAppointments } from './types';

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

export const conventionalCommitsHashmap = {
  feat: 'Desenvolvimento de feature',
  fix: 'Correção/manutenção de bug',
  docs: 'Documentação',
  style: 'Formatação de estilos',
  refactor: 'Refatoração',
  chore: 'Outras alterações',
  test: 'Testes automatizados',
  merge: 'Review de Pull Request',
};
