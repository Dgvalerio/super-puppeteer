/* eslint-disable prettier/prettier */
import {getArredondar, getIS, getOciosidade, getSquadIS} from '../src/util/get-timesheet-project';

export interface Days {
  client: string;
  project: string;
  category: string;
  date: string;
  description: string;
  time: { initial: string; final: string }[];
}

const t = (
  initial: string,
  final: string
): { initial: string; final: string } => ({ initial, final });

export const days: Days[] = [
  // { date: '01/08/2024', time: [t('0900', '1200')], ...getArredondar(), description: 'Mudando estado da transação e adicionando paginação' },
  // { date: '01/08/2024', time: [t('1300', '1900')], ...getIS(), description: 'https://luby.atlassian.net/browse/IN-874 - Não é possível atribuir book à escola' },
  // { date: '02/08/2024', time: [t('0800', '1200')], ...getIS(), description: 'Trabalhando nas tasks:\n' + 'https://luby.atlassian.net/browse/IN-874 - Não é possível atribuir book à escola\n' + 'https://luby.atlassian.net/browse/IN-886 - Botão menu sobrepondo botão board APP' },
  // { date: '02/08/2024', time: [t('1300', '1800')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '03/08/2024', time: [t('0800', '1200')], ...getIS(), description: 'Trabalhando nas tasks:\n' + 'https://luby.atlassian.net/browse/IN-886 - Botão menu sobrepondo botão board APP' },
  // { date: '05/08/2024', time: [t('0800', '1200')], ...getArredondar(), description: 'Trabalhando na task:\n' + 'https://luby.atlassian.net/browse/IN-886 - Botão menu sobrepondo botão board APP' },
  // { date: '06/08/2024', time: [t('1000', '1200')], ...getArredondar(), description: 'Passando paginação do front para o back' },
  // { date: '06/08/2024', time: [t('1300', '1700')], ...getArredondar(), description: 'Passando paginação do front para o back' },
  // { date: '06/08/2024', time: [t('1700', '2300')], ...getIS(), description: 'Trabalhando nas tasks:\n' + 'https://luby.atlassian.net/browse/IN-888 (6h) - Mídia com redirecionamento incorreto\n' + 'https://luby.atlassian.net/browse/IN-889 (16h) - Adicionar texto de placeholder em campo de busca dos filtros' },
  // { date: '07/08/2024', time: [t('0800', '1200')], ...getIS(), description: 'Trabalhando na task:\n' + 'https://luby.atlassian.net/browse/IN-889 (16h) - Adicionar texto de placeholder em campo de busca dos filtros' },
  // { date: '07/08/2024', time: [t('1300', '1700')], ...getIS(), description: 'Trabalhando na task:\n' + 'https://luby.atlassian.net/browse/IN-889 (16h) - Adicionar texto de placeholder em campo de busca dos filtros' },
  // { date: '08/08/2024', time: [t('0700', '1200')], ...getIS(), description: 'Trabalhando na task:\n' + 'https://luby.atlassian.net/browse/IN-889 (16h) - Adicionar texto de placeholder em campo de busca dos filtros' },
  // { date: '09/08/2024', time: [t('0900', '1200')], ...getIS(), description: 'Trabalhando na task:\n' + 'https://luby.atlassian.net/browse/IN-889 (16h) - Adicionar texto de placeholder em campo de busca dos filtros' },
  // { date: '12/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '12/08/2024', time: [t('1300', '1700')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '14/08/2024', time: [t('0800', '0900')], ...getSquadIS(), description: 'Analisando ambiente back-end para adição de uma nova entidade' },
  // { date: '14/08/2024', time: [t('0900', '1000')], ...getArredondar(), description: 'Reunião com cliente' },
  // { date: '14/08/2024', time: [t('1000', '1200')], ...getIS(), description: 'Resolvendo problema de fases de games' },
  // { date: '15/08/2024', time: [t('0800', '1200')], ...getIS(), description: 'Resolvendo problema de fases de games' },
  // { date: '15/08/2024', time: [t('1300', '1700')], ...getIS(), description: 'Resolvendo problema de fases de games' },
  { date: '16/08/2024', time: [t('0800', '1200')], ...getSquadIS(), description: 'Analisando ambiente back-end para adição de uma nova entidade' },
  { date: '16/08/2024', time: [t('1300', '1800')], ...getSquadIS(), description: 'Analisando ambiente back-end para adição de uma nova entidade' },
  // { date: '19/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '19/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '20/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '20/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '21/08/2024', time: [t('0900', '1000')], ...getOciosidade(), description: 'Aprimorando habilidade de teste e revisão de código' },
  // { date: '21/08/2024', time: [t('1000', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '21/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '22/08/2024', time: [t('0900', '1000')], ...getOciosidade(), description: 'Aprimorando habilidade de teste e revisão de código' },
  // { date: '22/08/2024', time: [t('1000', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '22/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '23/08/2024', time: [t('0900', '1100')], ...getOciosidade(), description: 'Aprimorando habilidade de teste e revisão de código' },
  // { date: '23/08/2024', time: [t('1100', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '23/08/2024', time: [t('1300', '1800')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '26/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '26/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '27/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando Next.js e formulário com ZOD e React Hook Form' },
  // { date: '27/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '28/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '28/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '29/08/2024', time: [t('0900', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '29/08/2024', time: [t('1300', '2000')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '30/08/2024', time: [t('0900', '1100')], ...getOciosidade(), description: 'Aprimorando habilidade de teste e revisão de código' },
  // { date: '30/08/2024', time: [t('1100', '1200')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
  // { date: '30/08/2024', time: [t('1300', '1800')], ...getOciosidade(), description: 'Estudando NestJS e Prisma' },
];
