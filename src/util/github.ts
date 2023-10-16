import { Octokit } from 'octokit';

import config from '../../config';
import { Branches, Comments, Pulls, Reviews, User } from '../types';

export const getOctokit = (): Octokit =>
  new Octokit({ auth: config.github.token });

export const getPulls = async (props: {
  owner: string;
  repo: string;
  per_page?: number;
}): Promise<Pulls> => {
  const response = await getOctokit().request(
    'GET /repos/{owner}/{repo}/pulls',
    { per_page: props.per_page || 100, state: 'all', ...props }
  );

  return response.data;
};

export const getComments = async (props: {
  owner: string;
  repo: string;
  pull_number: number;
  per_page?: number;
}): Promise<Comments> => {
  const response = await getOctokit().request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}/comments',
    { per_page: props.per_page || 100, ...props }
  );

  return response.data as Comments;
};

export const getReviews = async (props: {
  owner: string;
  repo: string;
  pull_number: number;
  per_page?: number;
}): Promise<Reviews> => {
  const response = await getOctokit().request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
    { per_page: props.per_page || 100, ...props }
  );

  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await getOctokit().rest.users.getAuthenticated();

  return response.data;
};

export const getRepositoryBranches = async (props: {
  name: string;
  per_page?: number;
}): Promise<Branches> => {
  const [owner, repo] = props.name.split('/');

  const response = await getOctokit().request(
    'GET /repos/{owner}/{repo}/branches',
    { owner, repo, per_page: props.per_page || 100 }
  );

  return response.data;
};

// todo: Ver método de busca na API do Github
export const getRepositoryBranch = async (props: {
  repository: string;
  branch: string;
}): Promise<Branches> => {
  const [owner, repo] = props.repository.split('/');

  const response = await getOctokit().request(
    'GET /repos/{owner}/{repo}/branches',
    { owner, repo, per_page: 100 }
  );

  return response.data;
};
