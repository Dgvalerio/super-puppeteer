const c = {
  'CAPITAL CONSIG SOCIEDADE DE CREDITO DIRETO S.A': { value: '6146' },
  'CARTEC AUTOMOTIVO LTDA ME': { value: '8240' },
  'CELVIRTUAL LDA': { value: '6151' },
  'DATAB INTELIGENCIA E ESTRATEGIA LTDA': { value: '8204' },
  'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA':
    { value: '8223' },
  'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A':
    {
      value: '8233',
      projects: {
        '[ESCOPO FECHADO] - IS - Portal CMS': {
          value: '18659',
          categories: {
            'Alinhamento com cliente': { value: '1013' },
            'Alinhamento com equipe interna': { value: '1014' },
            Daily: { value: '1033' },
            Deploy: { value: '3' },
            Desenvolvimento: { value: '1' },
            Documentacao: { value: '5' },
            'Gestao de Projetos': { value: '1007' },
            Modelagem: { value: '2' },
            'Sprint Planning': { value: '1009' },
            'Sprint Retrospective': { value: '1011' },
            'Sprint Review': { value: '1008' },
            Testes: { value: '1015' },
            'Testes Automatizados': { value: '4' },
          },
        },
      },
    },
  LUBY: {
    value: '15',
    projects: {
      'Alinhamento interno': { value: '18595' },
      'Eventos e Workshop': { value: '18728' },
      'Incubadora JS': { value: '15276' },
      'Problemas de saude': { value: '17502' },
      'Luby - Ociosidade': {
        value: '15289',
        categories: {
          Analise: { value: '6' },
          Deploy: { value: '3' },
          Desenvolvimento: { value: '1' },
          Documentacao: { value: '5' },
          'Gestao de Projetos': { value: '1007' },
          Modelagem: { value: '2' },
          Prototipacao: { value: '1016' },
          'Testes Automatizados': { value: '4' },
          Treinamento: { value: '1021' },
        },
      },
    },
  },
  'MULTILASER INDUSTRIAL S.A': { value: '8231' },
  'PETIMUNI AGENCIA ONLINE DE SERVICOS PARA ANIMAIS DE ESTIMACAO EIRELI': {
    value: '8239',
  },
};

const clients: {
  value: string;
  name: string;
  projects?: {
    value: string;
    name: string;
    categories?: { value: string; name: string }[];
  }[];
}[] = [
  {
    value: '6146',
    name: 'CAPITAL CONSIG SOCIEDADE DE CREDITO DIRETO S.A',
  },
  {
    value: '8240',
    name: 'CARTEC AUTOMOTIVO LTDA ME',
  },
  {
    value: '6151',
    name: 'CELVIRTUAL LDA',
  },
  {
    value: '8204',
    name: 'DATAB INTELIGENCIA E ESTRATEGIA LTDA',
  },
  {
    value: '8223',
    name: 'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA',
  },
  {
    value: '8233',
    name: 'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A',
    projects: [
      {
        value: '18659',
        name: '[ESCOPO FECHADO] - IS - Portal CMS',
        categories: [
          { value: '1013', name: 'Alinhamento com cliente' },
          { value: '1014', name: 'Alinhamento com equipe interna' },
          { value: '1033', name: 'Daily' },
          { value: '3', name: 'Deploy' },
          { value: '1', name: 'Desenvolvimento' },
          { value: '5', name: 'Documentação' },
          { value: '1007', name: 'Gestão de Projetos' },
          { value: '2', name: 'Modelagem' },
          { value: '1009', name: 'Sprint Planning' },
          { value: '1011', name: 'Sprint Retrospective' },
          { value: '1008', name: 'Sprint Review' },
          { value: '1015', name: 'Testes' },
          { value: '4', name: 'Testes Automatizados' },
        ],
      },
    ],
  },
  {
    value: '15',
    name: 'LUBY',
    projects: [
      { value: '18595', name: 'Alinhamento interno' },
      { value: '18728', name: 'Eventos e Workshop' },
      { value: '15276', name: 'Incubadora JS' },
      {
        value: '15289',
        name: 'Luby - Ociosidade',
        categories: [
          { value: '6', name: 'Análise' },
          { value: '3', name: 'Deploy' },
          { value: '1', name: 'Desenvolvimento' },
          { value: '5', name: 'Documentação' },
          { value: '1007', name: 'Gestão de Projetos' },
          { value: '2', name: 'Modelagem' },
          { value: '1016', name: 'Prototipação' },
          { value: '4', name: 'Testes Automatizados' },
          { value: '1021', name: 'Treinamento' },
        ],
      },
      { value: '17502', name: 'Problemas de saúde' },
    ],
  },
  {
    value: '8231',
    name: 'MULTILASER INDUSTRIAL S.A',
  },
  {
    value: '8239',
    name: 'PETIMUNI AGENCIA ONLINE DE SERVICOS PARA ANIMAIS DE ESTIMACAO EIRELI',
  },
];

export interface Context {
  client: string;
  project: string;
  category: string;
}

export const getOciosidade = (): Context => ({
  client: c.LUBY.value,
  project: c.LUBY.projects['Luby - Ociosidade'].value,
  category: c.LUBY.projects['Luby - Ociosidade'].categories.Treinamento.value,
});

export const getArredondar = (): Context => ({
  client: '15', // Luby
  project: '18781', // INSTITUTO ARREDONDAR [Pro Bono]
  category: '1', // Desenvolvimento,
});

export const getSquadIS = (): Context => ({
  client: '8233', // IS
  project: '18814', // IS - Alocação
  category: '1', // Desenvolvimento,
});

export const getIS = (
  category: keyof typeof c['INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A']['projects']['[ESCOPO FECHADO] - IS - Portal CMS']['categories'] = 'Desenvolvimento'
): Context => ({
  client:
    c[
      'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A'
    ].value,
  project:
    c[
      'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A'
    ].projects['[ESCOPO FECHADO] - IS - Portal CMS'].value,
  category:
    c[
      'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A'
    ].projects['[ESCOPO FECHADO] - IS - Portal CMS'].categories[category].value,
});

type GetContext =
  | ((
      client: 'LUBY'
    ) => (
      project: 'Luby - Ociosidade'
    ) => (
      category:
        | 'Análise'
        | 'Deploy'
        | 'Desenvolvimento'
        | 'Documentação'
        | 'Gestão de Projetos'
        | 'Modelagem'
        | 'Prototipação'
        | 'Testes Automatizados'
        | 'Treinamento'
    ) => Context)
  | ((
      client: 'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A'
    ) => (
      project: '[ESCOPO FECHADO] - IS - Portal CMS'
    ) => (
      category:
        | 'Alinhamento com cliente'
        | 'Alinhamento com equipe interna'
        | 'Daily'
        | 'Deploy'
        | 'Desenvolvimento'
        | 'Documentação'
        | 'Gestão de Projetos'
        | 'Modelagem'
        | 'Sprint Planning'
        | 'Sprint Retrospective'
        | 'Sprint Review'
        | 'Testes'
        | 'Testes Automatizados'
    ) => Context);

export const getContext =
  <
    Client extends
      | 'LUBY'
      | 'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A'
  >(
    client: Client
  ) =>
  (
    project: Client extends 'LUBY'
      ? 'Luby - Ociosidade'
      : '[ESCOPO FECHADO] - IS - Portal CMS'
  ) =>
  (
    category: Client extends 'LUBY'
      ?
          | 'Análise'
          | 'Deploy'
          | 'Desenvolvimento'
          | 'Documentação'
          | 'Gestão de Projetos'
          | 'Modelagem'
          | 'Prototipação'
          | 'Testes Automatizados'
          | 'Treinamento'
      :
          | 'Alinhamento com cliente'
          | 'Alinhamento com equipe interna'
          | 'Daily'
          | 'Deploy'
          | 'Desenvolvimento'
          | 'Documentação'
          | 'Gestão de Projetos'
          | 'Modelagem'
          | 'Sprint Planning'
          | 'Sprint Retrospective'
          | 'Sprint Review'
          | 'Testes'
          | 'Testes Automatizados'
  ): Context => {
    if (client === 'LUBY') {
      const c = '15';

      if (project === 'Luby - Ociosidade') {
        const p = '15289';

        switch (category) {
          case 'Análise':
            return { client: c, project: p, category: '6' };
          case 'Deploy':
            return { client: c, project: p, category: '3' };
          case 'Desenvolvimento':
            return { client: c, project: p, category: '1' };
          case 'Documentação':
            return { client: c, project: p, category: '5' };
          case 'Gestão de Projetos':
            return { client: c, project: p, category: '1007' };
          case 'Modelagem':
            return { client: c, project: p, category: '2' };
          case 'Prototipação':
            return { client: c, project: p, category: '1016' };
          case 'Testes Automatizados':
            return { client: c, project: p, category: '4' };
          case 'Treinamento':
            return { client: c, project: p, category: '1021' };
        }
      }
    } else if (
      client ===
      'INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A'
    ) {
      const c = '8233';

      if (project === '[ESCOPO FECHADO] - IS - Portal CMS') {
        const p = '18659';

        switch (category) {
          case 'Alinhamento com cliente':
            return { client: c, project: p, category: '1013' };
          case 'Alinhamento com equipe interna':
            return { client: c, project: p, category: '1014' };
          case 'Daily':
            return { client: c, project: p, category: '1033' };
          case 'Deploy':
            return { client: c, project: p, category: '3' };
          case 'Desenvolvimento':
            return { client: c, project: p, category: '1' };
          case 'Documentação':
            return { client: c, project: p, category: '5' };
          case 'Gestão de Projetos':
            return { client: c, project: p, category: '1007' };
          case 'Modelagem':
            return { client: c, project: p, category: '2' };
          case 'Sprint Planning':
            return { client: c, project: p, category: '1009' };
          case 'Sprint Retrospective':
            return { client: c, project: p, category: '1011' };
          case 'Sprint Review':
            return { client: c, project: p, category: '1008' };
          case 'Testes':
            return { client: c, project: p, category: '1015' };
          case 'Testes Automatizados':
            return { client: c, project: p, category: '4' };
        }
      }
    }
  };
