import axios from 'axios';

import config from '../../config';
import {
  IProjectDetailed,
  ISearchRequest,
  ISearchResults,
  Pagination,
} from './types';
import { issue } from './utils';

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

(async (): Promise<void> => {
  const key = config.jira.projectKey;

  if (!key) return;

  try {
    const { orderBy, startAt, maxResults, ...params } = {
      project: key,
      assignee: `"${config.jira.email}"`,
      orderBy: { field: 'priority', order: 'DESC' },
      startAt: 0,
      maxResults: 100,
    };

    let jql = Object.entries(params)
      .map(([field, value]) => `${field} = ${value}`)
      .join(' AND ');

    const order = `ORDER BY ${orderBy.field} ${orderBy.order}`;

    jql = [jql, order].join(' ');

    const data: ISearchRequest = {
      jql,
      maxResults,
      startAt,
    };

    try {
      const response = await api.post<ISearchResults>(
        `/rest/api/3/search`,
        data
      );

      console.table(response.data.issues);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log('Error');
    console.log(e);
  }
})();
