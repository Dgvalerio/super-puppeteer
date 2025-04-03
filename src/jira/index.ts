import axios, { AxiosError } from 'axios';
import { format, parseISO } from 'date-fns';

import config from '../../config';

interface AvatarUrls {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

interface Project {
  expand: 'description,lead,issueTypes,url,projectKeys,permissions,insight';
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: AvatarUrls;
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  properties: Record<string, string>;
  entityId?: string;
  uuid?: string;
}

const jira = config.jira;

const api = axios.create({
  baseURL: jira.route,
  auth: {
    username: jira.email,
    password: jira.token,
  },
  headers: {
    Accept: 'application/json',
  },
});

const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get<Project[]>(`/rest/api/3/project`);

    return response.data;
  } catch (e) {
    console.log(e);

    return [];
  }
};

interface Person {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

interface Sprint {
  id: number;
  name: string;
  state: 'active' | 'closed';
  boardId: number;
  goal: string;
  startDate: string;
  endDate: string;
  completeDate?: string;
}

type StatusCategory =
  | {
      self: 'https://luby.atlassian.net/rest/api/3/statuscategory/2';
      id: 2;
      key: 'new';
      colorName: 'blue-gray';
      name: 'Pendências';
    }
  | {
      self: 'https://luby.atlassian.net/rest/api/3/statuscategory/3';
      id: 3;
      key: 'done';
      colorName: 'green';
      name: 'Concluído';
    }
  | {
      self: 'https://luby.atlassian.net/rest/api/3/statuscategory/4';
      id: 4;
      key: 'indeterminate';
      colorName: 'yellow';
      name: 'Em andamento';
    };

interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    statuscategorychangedate: string;
    parent?: {
      id: string;
      key: string;
      self: string;
      fields: {
        summary: string;
        status: {
          self: string;
          description: string;
          iconUrl: string;
          name: 'Em Progresso' | 'A fazer';
          id: string;
          statusCategory: StatusCategory;
        };
        priority:
          | { self: string; iconUrl: string; name: 'Medium'; id: '3' }
          | { self: string; iconUrl: string; name: 'Highest'; id: '1' };
        issuetype: {
          self: string;
          id: string;
          description: string;
          iconUrl: string;
          name: 'História' | 'Épico';
          subtask: false;
          avatarId?: number;
          hierarchyLevel: number;
        };
      };
    };
    fixVersions: {
      self: string;
      id: string;
      description: string;
      name: string;
      archived: false;
      released: false;
      releaseDate: string;
    }[];
    resolution: {
      self: string;
      id: string;
      description: 'O trabalho nesse item foi concluído.';
      name: 'Concluído';
    } | null;
    lastViewed: string | null;
    priority:
      | { self: string; iconUrl: string; name: 'Medium'; id: '3' }
      | { self: string; iconUrl: string; name: 'Highest'; id: '1' };
    labels: [];
    aggregatetimeoriginalestimate: number | null;
    timeestimate: 0 | null;
    versions: [];
    issuelinks: [];
    assignee: {
      self: string;
      accountId: string;
      avatarUrls: AvatarUrls;
      displayName: string;
      active: true;
      timeZone: 'America/Sao_Paulo';
      accountType: string;
    } | null;
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: 'A fazer' | 'Concluído';
      id: string;
      statusCategory: StatusCategory;
    };
    components: [];
    customfield_10057: [];
    aggregatetimeestimate: number | null;
    creator: Person;
    subtasks: {
      id: string;
      key: string;
      self: string;
      fields: {
        summary: string;
        status: {
          self: 'https://luby.atlassian.net/rest/api/3/status/10800';
          description: '';
          iconUrl: 'https://luby.atlassian.net/images/icons/status_generic.gif';
          name: 'A fazer';
          id: '10800';
          statusCategory: StatusCategory;
        };
        priority: {
          self: 'https://luby.atlassian.net/rest/api/3/priority/3';
          iconUrl: 'https://luby.atlassian.net/images/icons/priorities/medium.svg';
          name: 'Medium';
          id: '3';
        };
        issuetype: {
          self: 'https://luby.atlassian.net/rest/api/3/issuetype/10003';
          id: '10003';
          description: 'Uma parte pequena de um trabalho que pertence a uma tarefa maior.';
          iconUrl: 'https://luby.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium';
          name: 'Subtarefa';
          subtask: true;
          avatarId: 10316;
          hierarchyLevel: -1;
        };
      };
    }[];
    reporter: Person;
    aggregateprogress: { progress: number; total: number; percent?: number };
    progress: { progress: number; total: number; percent?: number };
    votes: {
      self: string;
      votes: number;
      hasVoted: boolean;
    };
    issuetype: {
      self: string;
      id: string;
      description: string;
      iconUrl: string;
      name: string;
      subtask: boolean;
      avatarId: number;
      hierarchyLevel: number;
    };
    timespent: number | null;
    project: {
      self: string;
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      simplified: boolean;
      avatarUrls: AvatarUrls;
    };
    aggregatetimespent: number | null;
    customfield_10157: Person[];
    customfield_10027: [];
    resolutiondate: string;
    workratio: -1;
    watches: {
      self: string;
      watchCount: number;
      isWatching: false;
    };
    created: string;
    customfield_10020: Sprint[];
    customfield_10024?: string | null;
    customfield_10025: string;
    customfield_10018: {
      hasEpicLinkFieldDependency: false;
      showField: false;
      nonEditableReason: {
        reason: string;
        message: string;
      };
    };
    customfield_10019: string;
    updated: string;
    customfield_10093: string;
    customfield_10094: number;
    timeoriginalestimate: null;
    description: {
      type: string;
      version: number;
      content: (
        | {
            type: 'mediaSingle';
            attrs: { layout: 'align-start' };
            content: {
              type: 'media';
              attrs: {
                type: 'file';
                id: string;
                alt: string;
                collection: string;
                height: number;
                width: number;
              };
            }[];
          }
        | {
            type: 'heading';
            attrs: { level: number };
            content: {
              type: 'text';
              text: string;
              marks: { type: 'strong' }[];
            }[];
          }
        | {
            type: 'paragraph';
            content: (
              | { type: 'text'; text: string }
              | { type: 'text'; text: string; marks: { type: 'strong' }[] }
              | { type: 'hardBreak' }
            )[];
          }
        | { type: 'rule' }
      )[];
    };
    security: null;
    summary: string;
    customfield_10000: string;
    customfield_10002: [];
    environment: null;
    duedate: null;
  };
}

const IssueStatus = {
  todo: { key: '10800', label: 'To Do' },
  inProgress: { key: '3', label: 'In Progress' },
  inDeploy: { key: '11078', label: 'Em deploy' },
  waitTest: { key: '10778', label: 'Aguardando testes' },
  inTesting: { key: '10845', label: 'TESTES EM ANDAMENTO' },
  done: { key: '10301', label: 'Done' },
};

type StatusFrom =
  | {
      from: typeof IssueStatus.todo.key;
      fromString: typeof IssueStatus.todo.label;
    }
  | {
      from: typeof IssueStatus.inProgress.key;
      fromString: typeof IssueStatus.inProgress.label;
    }
  | {
      from: typeof IssueStatus.inDeploy.key;
      fromString: typeof IssueStatus.inDeploy.label;
    }
  | {
      from: typeof IssueStatus.waitTest.key;
      fromString: typeof IssueStatus.waitTest.label;
    }
  | {
      from: typeof IssueStatus.inTesting.key;
      fromString: typeof IssueStatus.inTesting.label;
    }
  | {
      from: typeof IssueStatus.done.key;
      fromString: typeof IssueStatus.done.label;
    };

interface HistoryItemCommon {
  fieldtype: 'jira' | 'custom';
  from: string | null;
  fromString: string | null;
  to: string | null;
  toString: string;
}

type HistoryItem =
  | ({ field: 'status'; fieldId: 'status' } & StatusFrom)
  | { field: 'Rank'; fieldId: 'customfield_10019' }
  | { field: 'WorklogId' }
  | ({ field: 'IssueParentAssociation' } & HistoryItemCommon)
  | { field: 'duedate'; fieldId: 'duedate' }
  | { field: 'timespent'; fieldId: 'timespent' }
  | { field: 'resolution'; fieldId: 'resolution' }
  | { field: 'description'; fieldId: 'description' }
  | { field: 'timeestimate'; fieldId: 'timeestimate' }
  | { field: 'timeoriginalestimate'; fieldId: 'timeoriginalestimate' }
  | {
      field: 'assignee';
      fieldId: 'assignee';
      tmpFromAccountId: null;
      tmpToAccountId: string;
    };

interface IssueChangelog extends Issue {
  changelog: {
    startAt: number;
    maxResults: number;
    total: number;
    histories: {
      id: string;
      author: {
        self: string;
        accountId: string;
        emailAddress?: string;
        avatarUrls: AvatarUrls;
        displayName: string;
        active: boolean;
        timeZone: string;
        accountType: string;
      };
      created: string;
      items: HistoryItem[];
    }[];
  };
}

const a: HistoryItem[] = [
  {
    field: 'IssueParentAssociation',
    fieldtype: 'jira',
    from: null,
    fromString: null,
    to: '54351',
    toString: 'HEM-13',
  },
  {
    field: 'status',
    fieldtype: 'jira',
    fieldId: 'status',
    from: '10301',
    fromString: 'Done',
    to: '10301',
    toString: 'Done',
  },
  {
    field: 'resolution',
    fieldtype: 'jira',
    fieldId: 'resolution',
    from: null,
    fromString: null,
    to: '10000',
    toString: 'Done',
  },
  {
    field: 'status',
    fieldtype: 'jira',
    fieldId: 'status',
    from: '10845',
    fromString: 'TESTES EM ANDAMENTO',
    to: '10301',
    toString: 'Done',
  },
  {
    field: 'status',
    fieldtype: 'jira',
    fieldId: 'status',
    from: '10778',
    fromString: 'Aguardando testes',
    to: '10845',
    toString: 'TESTES EM ANDAMENTO',
  },
  {
    field: 'timeestimate',
    fieldtype: 'jira',
    fieldId: 'timeestimate',
    from: null,
    fromString: null,
    to: '0',
    toString: '0',
  },
  {
    field: 'timespent',
    fieldtype: 'jira',
    fieldId: 'timespent',
    from: null,
    fromString: null,
    to: '3600',
    toString: '3600',
  },
  {
    field: 'WorklogId',
    fieldtype: 'jira',
    from: null,
    fromString: null,
    to: '35336',
    toString: '35336',
  },
  {
    field: 'Rank',
    fieldtype: 'custom',
    fieldId: 'customfield_10019',
    from: '',
    fromString: '',
    to: '',
    toString: 'Ranked higher',
  },
  {
    field: 'status',
    fieldtype: 'jira',
    fieldId: 'status',
    from: '11078',
    fromString: 'Em deploy',
    to: '10778',
    toString: 'Aguardando testes',
  },
  {
    field: 'status',
    fieldtype: 'jira',
    fieldId: 'status',
    from: '3',
    fromString: 'In Progress',
    to: '11078',
    toString: 'Em deploy',
  },
  {
    field: 'Rank',
    fieldtype: 'custom',
    fieldId: 'customfield_10019',
    from: '',
    fromString: '',
    to: '',
    toString: 'Ranked higher',
  },
  {
    field: 'status',
    fieldtype: 'jira',
    fieldId: 'status',
    from: '10800',
    fromString: 'To Do',
    to: '3',
    toString: 'In Progress',
  },
  {
    field: 'assignee',
    fieldtype: 'jira',
    fieldId: 'assignee',
    from: null,
    fromString: null,
    to: '6151e1c907ac3c0068a2b505',
    toString: 'Davi Gonçalves Valério',
    tmpFromAccountId: null,
    tmpToAccountId: '6151e1c907ac3c0068a2b505',
  },
  {
    field: 'description',
    fieldtype: 'jira',
    fieldId: 'description',
    from: null,
    fromString: null,
    to: null,
    toString:
      '[https://hemera.oke.luby.me/commercial-note/1078|https://hemera.oke.luby.me/commercial-note/1078]\n\n!image-20250325-134337.png|width=1659,height=817,alt="image-20250325-134337.png"!',
  },
];

interface Data {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

const getProjectIssues = async ({
  project,
}: {
  project: string;
}): Promise<Issue[]> => {
  try {
    const response = await api.get<Data>(
      `/rest/api/3/search?jql=project=${project} AND assignee=currentUser() AND updated >= startOfMonth() ORDER BY updated DESC`
    );

    return response.data.issues;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response);
    } else if (e instanceof Error) {
      console.log(e);
    }

    return [];
  }
};

const getIssueChangelog = async ({
  key,
}: {
  key: string;
}): Promise<IssueChangelog> => {
  try {
    const response = await api.get<IssueChangelog>(
      `/rest/api/3/issue/${key}?expand=changelog`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response);
    } else if (e instanceof Error) {
      console.log(e);
    }

    return undefined;
  }
};

const limitText = (text: string, maxLength = 64): string =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

const cleanNulls = <T extends Record<string, unknown>>(object: T): T =>
  Object.entries(object)
    .filter(([, value]) => value !== null)
    .reduce((aux, [key, value]) => ({ ...aux, [key]: value }), {} as T);

const main = async (): Promise<void> => {
  // const allProjects = await getAllProjects();
  const issues = await getProjectIssues({ project: 'HEM' });

  const removeNull = issues.map(({ fields, ...others }) => ({
    ...others,
    fields: cleanNulls(fields),
  }));

  // console.table(
  //   removeNull.map((issue) => ({
  //     key: issue.key,
  //     summary: limitText(issue.fields.summary),
  //     updated: parseISO(issue.fields.updated).toLocaleDateString('pt-BR'),
  //   }))
  // );

  const withTimePromise = removeNull.map(async (issue) => {
    const issueChangelog = await getIssueChangelog({ key: removeNull[0].key });

    console.log('');
    console.log('taskCreation:', issueChangelog.fields.created);
    issueChangelog.changelog.histories.map((h) => {
      // const aux = h.items.filter(({ field }) => field === 'status');

      // if (aux.length > 0) {
      console.log('historyCreation:', h.created);
      console.table(
        h.items.map((i) => ({ from: i.fromString, to: i.toString }))
      );
      // }
    });

    return {
      key: issue.key,
      summary: limitText(issue.fields.summary),
      updated: parseISO(issue.fields.updated).toLocaleDateString('pt-BR'),
      time: 0,
    };
  });

  console.table(await Promise.all(withTimePromise));

  console.log(
    removeNull.map((issue) => issue.key + ': ' + issue.fields.summary)
  );
};

main();
