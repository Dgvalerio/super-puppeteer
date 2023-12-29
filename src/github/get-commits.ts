import { translate } from '@vitalets/google-translate-api';

import { HttpProxyAgent } from 'http-proxy-agent';

import config from '../../config';
import {
  Commit,
  ConfigurationTypes,
  DayGroupedCommit,
  GroupedCommit,
  SimpleCommit,
  TimeGroupedCommit,
} from '../types';
import { getOctokit, getRepositoryBranches, getUser } from '../util/github';
import { proxyList } from '../util/proxy-list';
import { sortBy } from '../util/sort-by';
import { writeFile } from '../util/write-file';

const translateCommitMessage = async (
  commitMessage: string,
  agent: HttpProxyAgent<string>
): Promise<string> => {
  type Category =
    | 'feat'
    | 'fix'
    | 'docs'
    | 'style'
    | 'refactor'
    | 'chore'
    | 'test'
    | 'merge'
    | 'build';

  const categories: Record<Category, string> = {
    feat: 'Adição',
    fix: 'Correção/ajuste',
    docs: 'Documentação',
    style: 'Formatação de estilos',
    refactor: 'Refatoração',
    chore: 'Outras alterações',
    test: 'Testes automatizados',
    merge: 'Review de Pull Request',
    build: 'Ajuste de build',
  };

  const match = commitMessage.match(/^(\w+)\(([^)]+)\):\s(.+)$/);

  if (match) {
    const category = match[1];
    const scope = match[2];

    const description = await translate(match[3], {
      to: 'pt-br',
      fetchOptions: { agent },
    });

    return `${categories[category]} em "${scope}": ${description.text}`;
  } else if (commitMessage.startsWith('Merge pull')) {
    const regex =
      /^Merge pull request #(\d+) from [^\n]+\n\n(.+) \(([^\n]+)\)$/;

    const result = commitMessage.match(regex);

    if (result) {
      const pull = result[1];
      const description = result[2];
      const link = result[3];

      return `Mergando Pull Request #${pull} referente a "${description}" (${link})`;
    } else {
      return commitMessage;
    }
  } else {
    return commitMessage;
  }
};

const dateNow = (dateString: string): string => {
  const date = new Date(dateString);

  date.setHours(date.getHours() - 3);

  return date.toISOString();
};

const simplifyCommit = (repo: string, _: Commit): SimpleCommit => ({
  repo,
  date: dateNow(_.commit.committer.date),
  description: _.commit.message,
  commit: _.html_url,
});

const timeNumber = (time: string): number => Number(time.replace(':', ''));

const timeFilter =
  (
    item: ConfigurationTypes['appointmentConfig']['dayTimes'][number],
    index: number
  ) =>
  (d: { time: string }): boolean =>
    (timeNumber(item.start) < timeNumber(d.time) &&
      timeNumber(d.time) < timeNumber(item.end)) ||
    (index === 0 && timeNumber(d.time) < timeNumber(item.end)) ||
    (index === config.appointmentConfig.dayTimes.length - 1 &&
      timeNumber(d.time) > timeNumber(item.start));

const groupByDate = (commits: SimpleCommit[]): GroupedCommit[] => {
  const dayGroup: DayGroupedCommit[] = [];

  commits.forEach((item) => {
    const day = item.date.split('T')[0];
    const time = item.date.split('T')[1].split('.')[0].slice(0, 5);

    let index = 0;
    const exists = dayGroup.find(({ date }, _) => {
      index = _;

      return day === date.split('T')[0];
    });

    const toAdd = {
      time,
      description: item.description,
      commit: item.commit,
      repo: item.repo,
    };

    if (exists) {
      dayGroup[index] = {
        date: dayGroup[index].date,
        descriptions: dayGroup[index].descriptions.concat([toAdd]),
      };
    } else {
      dayGroup.push({ date: day, descriptions: [toAdd] });
    }
  });

  const dayGroups: TimeGroupedCommit[] = dayGroup.map((_) => ({
    ..._,
    descriptions: config.appointmentConfig.dayTimes.map((item, i) => {
      const filterByTime: DayGroupedCommit['descriptions'] =
        _.descriptions.filter(timeFilter(item, i));

      const descriptions: TimeGroupedCommit['descriptions'][number]['descriptions'] =
        [];

      filterByTime.forEach((d) => {
        let index = 0;
        const exists = descriptions.find(({ repo }, _) => {
          index = _;

          return repo === d.repo;
        });

        const toAdd = { repo: d.repo, text: `${d.description} (${d.commit})` };

        if (exists) {
          descriptions[index] = {
            repo: descriptions[index].repo,
            text: descriptions[index].text.concat([toAdd.text]),
          };
        } else {
          descriptions.push({ repo: d.repo, text: [toAdd.text] });
        }
      });

      return { ...item, descriptions };
    }),
  }));

  return dayGroups.map((_) => ({
    ..._,
    description: _.descriptions
      .map(
        ({ start, end, descriptions }) =>
          `## ${start} - ${end}\n` +
          descriptions
            .map(
              ({ repo, text }) =>
                `### ${repo}\n${text.map((t) => ` - ${t}`).join('\n')}`
            )
            .join('\n') +
          '\n'
      )
      .join('\n'),
  }));
};

const joinLists = (commits: SimpleCommit[][]): SimpleCommit[] => {
  const items: SimpleCommit[] = [];

  commits.forEach((list) => list.forEach((c) => items.push(c)));

  return items;
};

const joinInMD = (commits: GroupedCommit[]): string => {
  let res = '';

  commits.forEach((commit, index) => {
    res =
      index === 0
        ? `# ${commit.date}\n` + commit.description
        : `${res}\n` + '\n' + `# ${commit.date}\n` + commit.description;
  });

  return res;
};

const parseRepositories = (
  repositories: ConfigurationTypes['github']['repositories']
): { name: string; owner: string; repository: string; branch: string }[] =>
  repositories.map((r) => {
    const name = r.name;
    const [owner, repository] = name.split('/');

    return { name, owner, repository, branch: r.branch };
  });

interface GetRepositoryCommitsProps {
  author: string;
  repository: {
    name: string;
    owner: string;
    repository: string;
    branch: string;
  };
  interval: ConfigurationTypes['github']['when'];
}

const getRepositoryCommits = async ({
  author,
  repository: { name, owner, repository: repo, branch },
  interval: { until, since },
}: GetRepositoryCommitsProps): Promise<SimpleCommit[]> => {
  const branches = await getRepositoryBranches({ name });
  const sha = branches.find((b) => b.name === branch)?.commit.sha;

  const response = await getOctokit().request(
    'GET /repos/{owner}/{repo}/commits',
    {
      owner,
      repo,
      author,
      sha,
      per_page: 100,
      until: until || undefined,
      since: since || undefined,
    }
  );

  return response.data.map((data) => simplifyCommit(name, data));
};

const translateCommits = async (
  commits: SimpleCommit[]
): Promise<SimpleCommit[]> => {
  const size = commits.length;

  console.log(`Traduzindo ${size} commits`);

  const translatedCommits: SimpleCommit[] = [];

  let proxyPos = 0;

  let agent = new HttpProxyAgent(proxyList[proxyPos]);

  const translateCommit = async (position: number): Promise<void> => {
    const data: SimpleCommit = commits[position];

    const percent = ((position + 1) / size) * 100;
    const progress = [...new Array(100)]
      .map((_, i) => (i < percent ? 'X' : '_'))
      .join('');

    console.log(`(${progress}) | ${percent}% | ${position + 1} de ${size}`);

    try {
      const description = await translateCommitMessage(data.description, agent);

      translatedCommits.push({ ...data, description });

      if (position + 1 < size) await translateCommit(position + 1);
    } catch (e) {
      proxyPos += 1;

      const name = (e as { name: string }).name;

      console.log(
        `Catch "${name}" with proxy "${proxyPos}", try "${proxyList[proxyPos]}"`
      );

      if (
        ['TooManyRequestsError', 'BadGatewayError', 'FetchError'].includes(name)
      ) {
        agent = new HttpProxyAgent(proxyList[proxyPos]);

        await translateCommit(position);
      } else {
        console.log(e);

        translatedCommits.push(commits[position]);

        if (position + 1 < size) await translateCommit(position + 1);
      }
    }
  };

  await translateCommit(0);

  return translatedCommits;
};

(async (): Promise<void> => {
  try {
    let email = config.github.email;

    if (!email) {
      const user = await getUser();

      email = user.email;
    }

    const repositories = parseRepositories(config.github.repositories);

    const commitsPromise = repositories.map(async (repository) =>
      getRepositoryCommits({
        author: email,
        interval: config.github.when,
        repository,
      })
    );

    const commits = await Promise.all(commitsPromise);

    const joined = joinLists(commits);

    joined.sort(sortBy('date'));

    let finish: SimpleCommit[] = [...joined];

    const translateDescription = true;

    if (translateDescription) {
      finish = await translateCommits(joined);
    }

    const groupedByDate: GroupedCommit[] = groupByDate(finish);

    writeFile(joinInMD(groupedByDate));
  } catch (e) {
    console.log(e);
  }
})();
