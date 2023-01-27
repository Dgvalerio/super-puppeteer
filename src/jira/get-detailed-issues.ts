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

const joinInMD = (issues: ISimpleIssue[]): string => {
  const res = issues.map(
    (issue) => `
# ${issue.id}: ${issue.title}\n
**Priority:** ${issue.priority.name}\\
**Status:** ${issue.status.name}\\
**Resolution:** ${issue.resolution?.name}

## Dates

| Info                          | When                         |
|-------------------------------|------------------------------|
| **created**                   | ${issue.created} |
| **updated**                   | ${issue.updated} |
${
  issue.resolutionDate &&
  `| **resolutionDate**            | ${issue.resolutionDate} |`
}
| **statusCategoryChangeDate**  | ${issue.statusCategoryChangeDate} |

## Description
${issue.description}
`
  );

  return res.join('\n');
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

  // write markdown
  const name = new Date().toISOString().replace(/[:.T]/gm, '-');
  const filename = `markdowns/jira/detailed-${name}.md`;

  fs.writeFileSync(filename, joinInMD(simpleIssues));

  // eslint-disable-next-line no-console
  console.log(filename + ' ok');
})();
