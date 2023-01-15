export interface Permission {
  id: 10000;
  type: 'global';
}

export interface DashboardData {
  startAt: 0;
  maxResults: 20;
  total: 1;
  dashboards: [
    {
      id: '10000';
      isFavourite: false;
      name: 'Default dashboard';
      popularity: 0;
      self: 'https://luby.atlassian.net/rest/api/3/dashboard/10000';
      sharePermissions: Permission[];
      editPermissions: [];
      view: '/jira/dashboards/10000';
      systemDashboard: true;
    }
  ];
}

export interface IProject {
  expand: string;
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  projectTypeKey: string;
  simplified: boolean;
  style: 'next-gen';
  isPrivate: boolean;
  properties: unknown;
  entityId: string;
  uuid: string;
}

export interface Pagination<Item = unknown> {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: Item[];
}
