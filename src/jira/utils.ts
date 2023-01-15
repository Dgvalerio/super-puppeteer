import axios, { AxiosError } from 'axios';

import config from '../../config';
import { IProject, Pagination } from './types';

const api = axios.create({
  baseURL: config.jira.route,
  auth: {
    username: config.jira.email,
    password: config.jira.token,
  },
  headers: {
    Accept: 'application/json',
  },
});

const errorHandler = (e: AxiosError): void => {
  const { log, error } = console;

  error('error');
  error(Object.keys(error));
  if (error) {
    if (e.code) log(e.code);
    if (e.name) log(e.name);
    if (e.message) log(e.message);
    if (e.response) {
      if (e.response.data) log(e.response.data);
    }
  }
};

export const getAllProjects = async (): Promise<Pagination<IProject>> => {
  try {
    const response = await api.get<Pagination<IProject>>(
      `/rest/api/3/project/search`
    );

    return response.data;
  } catch (e) {
    errorHandler(e);
  }
};
