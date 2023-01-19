import axios, { AxiosError } from 'axios';

import config from '../../config';
import {
  IIssueDetailed,
  IProject,
  IProjectDetailed,
  Pagination,
} from './types';

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

const getAllProjects = async (): Promise<Pagination<IProject>> => {
  try {
    const response = await api.get<Pagination<IProject>>(
      `/rest/api/3/project/search`
    );

    return response.data;
  } catch (e) {
    errorHandler(e);
  }
};

const getProject = async (
  id: number | string
): Promise<Pagination<IProjectDetailed>> => {
  try {
    const response = await api.get<Pagination<IProjectDetailed>>(
      `/rest/api/3/project/${id}`
    );

    return response.data;
  } catch (e) {
    errorHandler(e);
  }
};

export const project = {
  getOne: getProject,
  getAll: getAllProjects,
};

export const getIssue = async (
  issueIdOrKey: string
): Promise<IIssueDetailed> => {
  try {
    const response = await api.get<IIssueDetailed>(
      `/rest/api/3/issue/${issueIdOrKey}`
    );

    return response.data;
  } catch (e) {
    errorHandler(e);
  }
};

export const issue = {
  getOne: getIssue,
};

export const getDashboard = async (): Promise<IIssueDetailed> => {
  try {
    const response = await api.get<IIssueDetailed>(
      `/rest/api/3/dashboard/search`
    );

    return response.data;
  } catch (e) {
    errorHandler(e);
  }
};
