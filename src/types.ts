import { Endpoints } from '@octokit/types';

export interface IAppointments extends ISimpleAppointments {
  client: '8231';
  project: '18548';
  category: '1';
  notMonetize: false;
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
  date: string;
  description: string;
  commit: string;
}

export interface GroupedCommit {
  date: string;
  description: string;
}
