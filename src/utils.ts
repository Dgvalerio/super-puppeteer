import { ISimpleAppointments } from './types';

export const makeAppointment = (
  date: string,
  description: string,
  commit?: string
): ISimpleAppointments[] => [
  {
    date,
    startTime: '06:30',
    endTime: '12:00',
    description,
    commit: commit || 'Na Descrição',
  },
  {
    date,
    startTime: '13:00',
    endTime: '15:30',
    description,
    commit: commit || 'Na Descrição',
  },
];
