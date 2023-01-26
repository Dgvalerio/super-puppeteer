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

export interface IAvatarUrlsBean {
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
  avatarUrls: IAvatarUrlsBean;
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
  avatarUrls: IAvatarUrlsBean;
  projectTypeKey: string;
  simplified: true;
}

export interface IUserDetails {
  self: string;
  accountId: string;
  emailAddress?: string;
  avatarUrls: IAvatarUrlsBean;
  displayName: string;
  active: boolean;
  timeZone?: string;
  accountType: 'atlassian' | 'app' | 'customer';
}

export type ILead = Pick<
  IUserDetails,
  'self' | 'accountId' | 'avatarUrls' | 'displayName' | 'active'
>;

interface IAttachment {
  self: string;
  id: string;
  filename: string;
  author: IUserDetails;
  created: string; // Date;
  size: number;
  mimeType: 'image/png';
  content: string;
  thumbnail: string;
}

interface ICommentItem {
  self: string;
  id: string;
  author: IUserDetails;
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
  updateAuthor: IUserDetails;
  created: string; // Date;
  updated: string; // Date;
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
  author: IUserDetails;
  updateAuthor: IUserDetails;
  comment: {
    version: number;
    type: 'doc';
    content: {
      type: 'paragraph';
      content: { type: 'text'; text: string }[];
    }[];
  };
  created: string; // Date;
  updated: string; // Date;
  started: string; // Date;
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

export interface ISimpleIssue {
  id: IIssueBean['key'];
  created: IIssueBean['fields']['created'];
  description: string;
  issueType: IIssueBean['fields']['issuetype'];
  priority: IIssueBean['fields']['priority'];
  resolution: IIssueBean['fields']['resolution'];
  resolutionDate: IIssueBean['fields']['resolutiondate'];
  status: IIssueBean['fields']['status'];
  statusCategoryChangeDate: IIssueBean['fields']['statuscategorychangedate'];
  title: string;
  summary: IIssueBean['fields']['summary'];
  parentSummary?: string;
  updated: IIssueBean['fields']['updated'];
}

export interface IContentType {
  type: 'mediaSingle' | 'paragraph' | 'bulletList' | 'rule';
  attrs: { layout: 'align-start' };
  content: (
    | {
        type: 'media';
        attrs: {
          id: string;
          type: 'file';
          collection: string;
          width: number;
          height: number;
        };
      }
    | {
        type: 'text';
        text: string;
        marks: { type: 'strong' }[];
      }
    | {
        type: 'listItem';
        content: IContentType[];
      }
  )[];
}

interface IIssueFields {
  statuscategorychangedate: string; // Date;
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
  } | null;
  lastViewed: string; // Date;
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
  assignee: IUserDetails;
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
  creator: IUserDetails;
  subtasks: [];
  reporter: IUserDetails;
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
  resolutiondate: Date | null;
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
  created: string; // Date;
  updated: string; // Date;
  timeoriginalestimate: null;
  description: {
    version: number;
    type: 'doc';
    content?: IContentType[];
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
}

export interface IIssueDetailed {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: IIssueFields;
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

export interface IProjectFeature {
  projectId: number;
  state: 'ENABLED' | 'DISABLED' | 'COMING_SOON';
  toggleLocked: boolean;
  feature: string;
  prerequisites: Array<string>;
  localisedName: string;
  localisedDescription: string;
  imageUri: string;
}

export interface Pagination<Item = unknown> {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: Item[];
}

interface IStatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

interface IStatusDetails {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: IStatusCategory;
}

interface IIssueTransition {
  id: string;
  name: string;
  to: IStatusDetails;
  hasScreen: boolean;
  isGlobal: boolean;
  isInitial: boolean;
  isAvailable: boolean;
  isConditional: boolean;
  fields: object;
  expand: string;
  looped: boolean;
}

interface ISimpleLink {
  id: string;
  styleClass: string;
  iconClass: string;
  label: string;
  title: string;
  href: string;
  weight: number;
}

interface ILinkGroup {
  id: string;
  styleClass: string;
  header: ISimpleLink;
  weight: number;
  links: Array<ISimpleLink>;
  groups: Array<ILinkGroup>;
}

interface IOperations {
  linkGroups: ILinkGroup[];
}

interface IJsonTypeBean {
  type: string;
  items: string;
  system: string;
  custom: string;
  customId: number;
  configuration: object;
}

interface IFieldMetadata {
  equired: boolean;
  schema: IJsonTypeBean;
  name: string;
  key: string;
  autoCompleteUrl: string;
  hasDefaultValue: boolean;
  operations: Array<string>;
  allowedValues: Array<any>;
  defaultValue: any;
  configuration: object;
}

interface IIssueUpdateMetadata {
  fields: Record<string, IFieldMetadata>;
}

interface IChangeDetails {
  field: string;
  fieldtype: string;
  fieldId: string;
  from: string;
  fromString: string;
  to: string;
  toString: string;
}

interface IHistoryMetadataParticipant {
  id: string;
  displayName: string;
  displayNameKey: string;
  type: string;
  avatarUrl: string;
  url: string;
}

interface IHistoryMetadata {
  type: string;
  description: string;
  descriptionKey: string;
  activityDescription: string;
  activityDescriptionKey: string;
  emailDescription: string;
  emailDescriptionKey: string;
  actor: IHistoryMetadataParticipant;
  generator: IHistoryMetadataParticipant;
  cause: IHistoryMetadataParticipant;
  extraData: object;
}

interface IChangelog {
  id: string;
  author: IUserDetails;
  created: string;
  items: Array<IChangeDetails>;
  historyMetadata: IHistoryMetadata;
}

interface IPageOfChangelogs {
  startAt: number;
  maxResults: number;
  total: number;
  histories: IChangelog[];
}

interface IIncludedFields {
  included: string[];
  actuallyIncluded: string[];
  excluded: string[];
}

export interface IIssueBean {
  expand: string;
  id: string;
  self: string;
  key: string;
  renderedFields: object;
  properties: object;
  names: object;
  schema: object;
  transitions: IIssueTransition[];
  operations: IOperations;
  editmeta: IIssueUpdateMetadata;
  changelog: IPageOfChangelogs;
  versionedRepresentations: object;
  fieldsToInclude: IIncludedFields;
  fields: Partial<IIssueFields>;
}

// View in https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
export interface ISearchRequest {
  // The JQL that defines the search.
  jql: string;
  // The index of the first item to return in a page of results (page offset).
  startAt: number;
  // The maximum number of items to return per page.
  maxResults: number;
  // Determines how to validate the JQL query and treat the validation results.
  validateQuery?: 'strict' | 'warn' | 'none';
  // A list of fields to return for each issue, use it to retrieve a subset of fields.
  fields?: Array<string>;
  // Use expand to include additional information about issues in the response.
  expand?:
    | 'renderedFields'
    | 'names'
    | 'schema'
    | 'transitions'
    | 'operations'
    | 'editmeta'
    | 'changelog'
    | 'versionedRepresentations';
  // A list of issue property keys for issue properties to include in the results.
  properties?: Array<string>;
  // Reference fields by their key (rather than ID). Default false.
  fieldsByKeys?: boolean;
}

export interface ISearchResults {
  // Expand options that include additional search result details in the response.
  expand: string;
  // The index of the first item returned on the page.
  startAt: number;
  // The maximum number of results that could be on the page.
  maxResults: number;
  // The number of results on the page.
  total: number;
  // The list of issues found by the search.
  issues: IIssueBean[];
  // Any warnings related to the JQL query.
  warningMessages: string[];
  // The ID and name of each field in the search results.
  names: object;
  // The schema describing the field types in the search results.
  schema: IJsonTypeBean;
}

export interface ISearch {
  status?: 'done';
  assignee?: string;
  project?: string;
  orderBy?: {
    field: 'status' | 'project' | 'assignee' | 'priority';
    order: 'ASC' | 'DESC';
  };
  startAt?: number;
  maxResults?: number;
}
