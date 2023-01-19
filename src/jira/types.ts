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

export interface IAvatarUrls {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

export interface IProject {
  expand: string;
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: IAvatarUrls;
  projectTypeKey: string;
  simplified: boolean;
  style: 'next-gen';
  isPrivate: false;
  properties: unknown;
  entityId: string;
  uuid: string;
}

export interface IProjectSimplified {
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: IAvatarUrls;
  projectTypeKey: string;
  simplified: true;
}

export interface IUser {
  self: string;
  accountId: string;
  emailAddress?: string;
  avatarUrls: IAvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export type ILead = Pick<
  IUser,
  'self' | 'accountId' | 'avatarUrls' | 'displayName' | 'active'
>;

interface IAttachment {
  self: string;
  id: string;
  filename: string;
  author: IUser;
  created: Date;
  size: number;
  mimeType: 'image/png';
  content: string;
  thumbnail: string;
}

interface ICommentItem {
  self: string;
  id: string;
  author: IUser;
  body: {
    version: number;
    type: 'doc';
    content: {
      type: 'paragraph';
      content: {
        type: string;
        text: string;
        marks: { type: 'strong' }[];
      }[];
    }[];
  };
  updateAuthor: IUser;
  created: Date;
  updated: Date;
  jsdPublic: boolean;
}

interface IComment {
  comments: ICommentItem[];
  self: string;
  maxResults: number;
  total: number;
  startAt: number;
}

interface IWorkLogItem {
  self: string;
  author: IUser;
  updateAuthor: IUser;
  comment: {
    version: number;
    type: 'doc';
    content: {
      type: 'paragraph';
      content: { type: 'text'; text: string }[];
    }[];
  };
  created: Date;
  updated: Date;
  started: Date;
  timeSpent: string;
  timeSpentSeconds: number;
  id: string;
  issueId: string;
}

interface IWorkLog {
  startAt: number;
  maxResults: number;
  total: number;
  worklogs: IWorkLogItem[];
}

export interface IIssueType {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: false;
  avatarId: number;
  entityId?: string;
  hierarchyLevel: number;
}

export interface IIssueDetailed {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    statuscategorychangedate: Date;
    parent: {
      id: string;
      key: string;
      self: string;
      fields: {
        summary: string;
        status: {
          self: string;
          description: string;
          iconUrl: string;
          name: string;
          id: string;
          statusCategory: {
            self: string;
            id: number;
            key: string;
            colorName: string;
            name: string;
          };
        };
        priority: {
          self: string;
          iconUrl: string;
          name: string;
          id: string;
        };
        issuetype: IIssueType;
      };
    };
    fixVersions: [];
    resolution: {
      self: string;
      id: string;
      description: string;
      name: string;
    };
    lastViewed: Date;
    priority: {
      self: string;
      iconUrl: string;
      name: string;
      id: string;
    };
    labels: [];
    timeestimate: 0;
    aggregatetimeoriginalestimate: null;
    versions: [];
    issuelinks: [];
    assignee: IUser;
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: 'Concluído';
      id: string;
      statusCategory: {
        self: string;
        id: 3;
        key: 'done';
        colorName: 'green';
        name: 'Concluído';
      };
    };
    components: [];
    aggregatetimeestimate: 0;
    creator: IUser;
    subtasks: [];
    reporter: IUser;
    aggregateprogress: {
      progress: number;
      total: number;
      percent: number;
    };
    progress: {
      progress: number;
      total: number;
      percent: number;
    };
    votes: {
      self: string;
      votes: number;
      hasVoted: boolean;
    };
    worklog: IWorkLog;
    issuetype: IIssueType;
    timespent: number;
    project: IProjectSimplified;
    aggregatetimespent: number;
    resolutiondate: Date;
    workratio: number;
    issuerestriction: {
      issuerestrictions: unknown;
      shouldDisplay: true;
    };
    watches: {
      self: string;
      watchCount: number;
      isWatching: boolean;
    };
    created: Date;
    updated: Date;
    timeoriginalestimate: null;
    description: {
      version: number;
      type: 'doc';
      content: {
        type: 'mediaSingle';
        attrs: { layout: 'align-start' };
        content: {
          type: 'media';
          attrs: {
            id: string;
            type: 'file';
            collection: string;
            width: number;
            height: number;
          };
        }[];
      }[];
    };
    timetracking: {
      remainingEstimate: string;
      timeSpent: string;
      remainingEstimateSeconds: number;
      timeSpentSeconds: number;
    };
    security: null;
    attachment: IAttachment[];
    summary: string;
    environment: null;
    duedate: null;
    comment: IComment;
  };
}

export interface IVersion {
  self: string;
  id: string;
  name: string;
  archived: boolean;
  released: boolean;
  startDate: string;
  releaseDate: string;
  overdue: boolean;
  userStartDate: string;
  userReleaseDate: string;
  projectId: number;
}

export interface IProjectDetailed extends IProject {
  description: string;
  lead: ILead;
  components: [];
  issueTypes: IIssueType[];
  assigneeType: 'UNASSIGNED';
  versions: IVersion[];
  roles: {
    'atlassian-addons-project-access': string;
    Administrator: string;
    Viewer: string;
    Member: string;
  };
}

export interface Pagination<Item = unknown> {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: Item[];
}
