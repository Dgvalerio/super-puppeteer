import { Endpoints } from '@octokit/types';

export interface IAppointments extends ISimpleAppointments {
  client: string;
  project: string;
  category: string;
  notMonetize: boolean;
}

export interface ISimpleAppointments {
  description: string;
  date: string;
  commit: string;
  startTime: string;
  endTime: string;
}

export type Commits =
  Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];
export type Commit = Commits[number];

export interface SimpleCommit {
  repo: string;
  date: string;
  description: string;
  commit: string;
}

export interface GroupedCommit {
  date: string;
  description: string;
}

export interface DayGroupedCommit {
  date: string;
  descriptions: {
    repo: string;
    time: string;
    description: string;
    commit: string;
  }[];
}

export interface TimeGroupedCommit {
  date: string;
  descriptions: {
    start: string;
    end: string;
    descriptions: { repo: string; text: string[] }[];
  }[];
}

export interface ConfigurationTypes {
  timesheet: {
    // E-mail para realizar login na sua conta do timesheet oficial.
    login: string;
    // Senha para realizar login na sua conta do timesheet oficial.
    password: string;
  };
  github: {
    // Seu token do Github para poder realizar a busca commits até nos repositórios privados.
    token: string;
    // E-mail do seu usuário no Github para buscar os commits (caso não informado, recupera do token).
    email?: string;
    // Repositório que você deseja procurar seus commits.
    repositories: {
      // Nome do repositório.
      name: string;
      // SHA da branch.
      branch_sha?: string;
    }[];
    // Data da busca
    when?: {
      // Desde quando (no formato 2022-12-01T00:00:00Z).
      since?: string;
      // Até quando (no formato 2022-12-01T00:00:00Z).
      until?: string;
    };
  };
  appointmentConfig: {
    // Horários que você deseja apontar (lembre de deixar pelo menos uma hora para almoço).
    dayTimes: {
      // Horário inicial do apontamento (no formato HH:MM).
      start: string;
      // Horário final do apontamento (no formato HH:MM).
      end: string;
    }[];
  };
  appointments?: {
    date: string;
    descriptions: string[];
  }[];
}
