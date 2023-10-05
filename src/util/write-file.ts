import * as fs from 'fs';

export const writeFile = (data: string, dir?: string): void => {
  const nameForFile = new Date().toISOString().replace(/[:.T]/gm, '-');
  const filename = `markdowns/${dir || ''}${nameForFile}.md`;

  fs.writeFileSync(filename, data);

  // eslint-disable-next-line no-console
  console.log(filename + ' ok');
};
