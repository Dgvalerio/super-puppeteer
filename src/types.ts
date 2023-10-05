import { Endpoints } from '@octokit/types';

export interface SimpleAppointment {
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

export namespace Timesheet {
  export interface Category {
    Id: number;
    Name: string;
    IdProject: number;
  }

  export interface Project {
    Id: number;
    Name: string;
    StartDate: string;
    EndDate: string;
    IdCustomer: number;
    categories: Category[];
  }

  export interface Client {
    id: string;
    title: string;
    projects: Project[];
  }

  export interface Appointment {
    __RequestVerificationToken: string;
    Id: string;
    IdCustomer: string;
    IdProject: string;
    IdCategory: string;
    // No formado dd/MM/yyyy
    InformedDate: string;
    // No formato hh:mm
    StartTime: string;
    // No formato hh:mm
    EndTime: string;
    NotMonetize: string;
    CommitRepository: string;
    Description: string;
  }
}

export interface ISimpleAppointments {
  description: string;
  date: string;
  commit: string;
  startTime: string;
  endTime: string;
}

export interface IAppointments extends ISimpleAppointments {
  client: string;
  project: string;
  category: string;
  notMonetize: boolean;
}

export type Commits =
  Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];
export type Commit = Commits[number];

export type Repositories = Endpoints['GET /user/repos']['response']['data'];
export type Repository = Repositories[number];

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
  jira: {
    // URL do JIRA
    route: string;
    // E-mail para realizar login na sua conta do timesheet oficial.
    email: string;
    // Token de acesso do JIRA
    token: string;
    // Key do projeto
    projectKey?: string;
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
  appointmentsDefaults: Partial<SimpleAppointment>;
  appointments: Partial<SimpleAppointment>[];
}

export type Pulls =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];
export type Pull = Pulls[number];

export interface SimplePull {
  number: Pull['number'];
  state: Pull['state'];
  user: Pull['user']['login'];
  title: Pull['title'];
  created_at: Pull['created_at'];
  updated_at: Pull['updated_at'];
}

export type Comments =
  Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/comments']['response']['data'];
export type Comment = Comments[number];

export type Reviews =
  Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data'];
export type Review = Reviews[number];

export type User = Endpoints['GET /user']['response']['data'];
