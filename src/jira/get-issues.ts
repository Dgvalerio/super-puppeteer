import * as fs from 'fs';

import config from '../../config';
import { IContentType, IIssueBean, ISimpleIssue } from './types';
import { issue } from './utils';

const key = config.jira.projectKey;

const sortByID = (a: ISimpleIssue, b: ISimpleIssue): number => {
  const n = (t: string): number => Number(t.replace(/\D/g, ''));

  if (n(a.id) > n(b.id)) return 1;
  if (n(a.id) === n(b.id)) return 0;
  if (n(a.id) < n(b.id)) return -1;
};

const ifText = (content: IContentType['content'][number]): string => {
  if (content.type !== 'text') return 'no-text';

  let aux = content.text;

  if (content.marks) {
    content.marks.forEach(({ type }) => {
      switch (type) {
        case 'strong':
          aux = `**${aux}**`;
      }
    });
  }

  return aux;
};

const ifParagraph = (
  content: IContentType['content'],
  noBreak?: boolean
): string => {
  let aux = '';

  content.map((c) => {
    switch (c.type) {
      case 'text':
        aux += ifText(c);
        break;
    }
  });

  return `${aux}${noBreak ? '' : '\\'}\n`;
};

const simplifyIssue = ({ key, fields }: IIssueBean): ISimpleIssue => {
  const id = key;
  const parent = fields?.parent?.fields?.summary;
  const title = fields.summary;

  const content = fields.description?.content || [];
  let the = '';

  content.forEach((c, i, list) => {
    switch (c.type) {
      case 'rule':
        the += '---\n';
        break;
      case 'paragraph':
        the += ifParagraph(c.content, list[i + 1]?.type !== 'paragraph');
        break;
      case 'bulletList':
        c.content.map((cc) => {
          if (cc.type === 'listItem') {
            let toAdd = '- ';

            cc.content.forEach((ccc) => {
              toAdd += ifParagraph(ccc.content, true);
            });

            the += toAdd;
          }
        });
        the += '\n';
        break;
    }
  });

  const texts = content.map((c) =>
    c.content
      ?.map((cc) => (cc.type === 'text' ? cc.text : ''))
      .filter((v) => v !== '')
      .join('\n')
  );
  const description = the || `${texts.join('\n')}`;

  return {
    id,
    created: fields.created,
    description,
    issueType: fields.issuetype,
    priority: fields.priority,
    resolution: fields.resolution,
    resolutionDate: fields.resolutiondate,
    status: fields.status,
    statusCategoryChangeDate: fields.statuscategorychangedate,
    title: parent ? `${parent} > ${title}` : title,
    summary: title,
    parentSummary: parent,
    updated: fields.updated,
  };
};

interface ISimpleIssueGrouped {
  date: ISimpleIssue['updated'];
  issues: ISimpleIssue[];
}

const sortByDate = (a: ISimpleIssueGrouped, b: ISimpleIssueGrouped): number => {
  const n = (t: string): number => Number(t.replace(/\D/g, ''));

  if (n(a.date) > n(b.date)) return 1;
  if (n(a.date) === n(b.date)) return 0;
  if (n(a.date) < n(b.date)) return -1;
};

const groupByDate = (issues: ISimpleIssue[]): ISimpleIssueGrouped[] => {
  const aux: Record<
    ISimpleIssueGrouped['date'],
    ISimpleIssueGrouped['issues']
  > = {};

  issues.forEach((issue) => {
    const day = issue.updated.split('T')[0];

    aux[day] = [...(aux[day] || []), issue];
  });

  const list: ISimpleIssueGrouped[] = Object.entries(aux).map(([d, i]) => ({
    date: d,
    issues: i,
  }));

  return list.sort(sortByDate);
};

const joinInMD = (issues: ISimpleIssueGrouped[]): string => {
  const res = issues.map(({ issues, date }) => {
    const title = `# ${date}`;

    const texts = issues.map((issue) => {
      const subTitle = issue.parentSummary && `### ${issue.parentSummary}\n`;
      const subSubTitle =
        (issue.parentSummary ? '####' : '###') +
        ` ${issue.id}: ${issue.summary}\n`;
      const priority = `**Priority:** ${issue.priority.name}\\\n`;
      const status = `**Status:** ${issue.status.name}\\\n`;
      const resolution =
        issue.resolution?.name && `**Resolution:** ${issue.resolution?.name}\n`;

      const dates = `
## Dates

| Info           | When                         |
|----------------|------------------------------|
| **created**    | ${issue.created} |
| **updated**    | ${issue.updated} |
`;
      const resolutionDate =
        issue.resolutionDate &&
        `| **resolution** | ${issue.resolutionDate} |\n`;

      return [
        subTitle,
        subSubTitle,
        priority,
        status,
        resolution,
        dates,
        resolutionDate,
      ].join('');
    });

    return `${title}\n${texts.join('\n')}`;
  });

  return res.join('\n');
};

const writeMarkdown = (issues: ISimpleIssueGrouped[]): void => {
  // write markdown
  const name = new Date().toISOString().replace(/[:.T]/gm, '-');
  const filename = `markdowns/jira/${name}.md`;

  fs.writeFileSync(filename, joinInMD(issues));

  // eslint-disable-next-line no-console
  console.log(filename + ' ok');
};

(async (): Promise<void> => {
  if (!key) return;

  const searchResults = await issue.search({
    project: key,
    assignee: `"${config.jira.email}"`,
    orderBy: { field: 'priority', order: 'DESC' },
    startAt: 0,
    maxResults: 20,
  });

  if (searchResults.total <= 0) return;

  const simpleIssues: ISimpleIssue[] = searchResults.issues
    .map(simplifyIssue)
    .sort(sortByID);

  const issuesGrouped: ISimpleIssueGrouped[] = groupByDate(simpleIssues);

  writeMarkdown(issuesGrouped);
})();
