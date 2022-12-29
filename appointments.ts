import { IAppointments, ISimpleAppointments } from './src/types';
import { makeAppointment as make } from './src/utils';

const descriptions: ISimpleAppointments[] = [
  ...make(
    '01/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na Aplicação:\n' +
      '- Finalizando o Header;\n' +
      '\n' +
      'Integração das telas de gráficos\n' +
      'Na tela de passos:\n' +
      '- Realizando configurações iniciais para recuperar dados (https://github.com/lubysoftware/multi-fit-app/commit/e0961f8cd885f697de0ec60b65427591f5025712)\n' +
      '- Utilizando os dados corretos na tela (https://github.com/lubysoftware/multi-fit-app/commit/66c6d4f49c89a16e117ee15a6e20e5fe145ec90a)\n' +
      '- Consertando lógica dos botões de switch de data do gráfico (https://github.com/lubysoftware/multi-fit-app/commit/d2b89d76ff26b4ea3de49e913109490fc1bb3fe3)\n' +
      '- Mudando títulos dinamicamente (https://github.com/lubysoftware/multi-fit-app/commit/111d982e044a97021d68c33d1f7a0a8173792432)\n' +
      '\n' +
      'Na tela de sono:\n' +
      '- Mudando títulos dinamicamente e consertando lógica (https://github.com/lubysoftware/multi-fit-app/commit/53715d110a931b63a74435b391ff147498fa7075)\n' +
      '\n' +
      'Na tela de batimentos:\n' +
      '- Mudando títulos dinamicamente e consertando lógica (https://github.com/lubysoftware/multi-fit-app/commit/6f80fbff252f37c2961525b9a6aa80a32e10a872)\n' +
      '\n' +
      'Na tela de calorias:\n' +
      '- Mudando títulos dinamicamente e consertando lógica (https://github.com/lubysoftware/multi-fit-app/commit/e64df7564f704fdf724f5130ff222b26d380a8b8)\n'
  ),
  ...make(
    '02/12/2022',
    'Integração das telas de gráficos\n' +
      '\n' +
      'Na tela de batimentos:\n' +
      '- Usando/exibindo dados corretos na tela (https://github.com/lubysoftware/multi-fit-app/commit/2559943d71c29c8f9277c4ad64818c2c647c6f67)\n' +
      '\n' +
      'Na tela de calorias:\n' +
      '- Usando/exibindo dados corretos na tela (https://github.com/lubysoftware/multi-fit-app/commit/35e251899fd3aab1085fb313fa4d4389f60f810a)\n' +
      '\n' +
      'Na tela de passos:\n' +
      '- Melhorando o mock para ajudar no desenvolvimento (https://github.com/lubysoftware/multi-fit-app/commit/b23edc8e7356d1a880a831f221f8bd2a98636df4)'
  ),
  ...make(
    '05/12/2022',
    'Integração das telas de gráficos\n' +
      '- Atualizando versão da Lib (https://github.com/lubysoftware/multi-fit-app/commit/e0d764b92139f5cbf021df27bc189634665146ca)\n' +
      '\n' +
      'Integração das telas de gráficos\n' +
      '- Consertando tipagem dos sensores (https://github.com/lubysoftware/multi-fit-app/commit/6ef1c8894711434e6905cb67de5e9366981d93bd)'
  ),
  ...make(
    '06/12/2022',
    'Na tela de calorias:\n' +
      '- Recuperando dados corretamente, direto da API (https://github.com/lubysoftware/multi-fit-app/commit/3598f1a1adea7b5f79898de1272af6a8ef26dd3b)\n' +
      '\n' +
      'Na tela de passos:\n' +
      '- Recuperando dados corretamente, direto da API (https://github.com/lubysoftware/multi-fit-app/commit/a273f7ad63952f3505c317cf1b3db9d9a9984151)\n' +
      '\n' +
      'Na tela de batimentos:\n' +
      '- Recuperando dados corretamente, direto da API (https://github.com/lubysoftware/multi-fit-app/commit/b84e658c4b105b70055576a1657932ef3ea7465d)'
  ),
  ...make(
    '07/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na padronização das fontes/correção da tipografia:\n' +
      '- Atualizando o projeto e entendendo a tarefa;\n' +
      '- Criando a base do componente (https://github.com/lubysoftware/multi-fit-app/commit/a6270e9d8f47bc1ed7b140df8bbfda5d34fc227f);\n' +
      '- Replicando problema que quebra a fonte;\n' +
      '- Testando o uso do “react-native-responsive-fontsize“;\n' +
      '- Resolvendo erro na tela de perfil.\n' +
      '- Trabalhando na task das fontes (olhar task do JIRA para mais detalhes);'
  ),

  ...make(
    '08/12/2022',
    'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Consertando estilização e lógica dos botões da tela de perfil (https://github.com/lubysoftware/multi-fit-app/commit/8e0df0149079c7b427063cbace037fc4ec1468fc)\n' +
      '- Consertando/atualizando regras de lint (https://github.com/lubysoftware/multi-fit-app/commit/d535dd7ba5002695947f9be9a002157de39eef44)\n' +
      '- Reorganizando arquivos da tela de perfil (https://github.com/lubysoftware/multi-fit-app/commit/3df491f967f43d5bbadf4a22f3fe3a470952cabb)\n' +
      '- Consertando estilos da tela de perfil (https://github.com/lubysoftware/multi-fit-app/commit/a5792e41edcae8f6a57b96f9f7882de7c640a4dd)\n' +
      '- Atualizando rotas (https://github.com/lubysoftware/multi-fit-app/commit/91a7a8c2aca90e0948790f0955e5436ec6b4447d)\n' +
      '- Resolvendo erro na tela de dashboard. No caso, no ActivityCard, no Header (https://github.com/lubysoftware/multi-fit-app/commit/f0a906c3f982e9d4cd5a5f56486f90c3fecab36c)'
  ),
  ...make(
    '09/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Removendo altura fixa, e posicionando card de atividade corretamente no Dashboard (https://github.com/lubysoftware/multi-fit-app/commit/39a3c26beb9abdee736e1c582726429029aea70c)\n' +
      '- Criando um componente de texto/tipografia;\n' +
      '- Criando variações para o componente de texto (https://github.com/lubysoftware/multi-fit-app/commit/c8886f1c23ef126a5eb4d22cf8cfe90b5e7cffc2)'
  ),
  ...make(
    '12/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Procurando elementos de texto para realizar a substituição;\n' +
      '- Analisando com a equipe a necessidade de uma refatoração geral;\n' +
      '- Substituindo componentes de texto (https://github.com/lubysoftware/multi-fit-app/commit/fd217703da550020ef792bcb431f0f7bd3b34780)\n' +
      '- Substituindo componentes de texto (https://github.com/lubysoftware/multi-fit-app/commit/8aec25e053d3210725757c594e65c29a7c376689)'
  ),
  ...make(
    '13/12/2022',
    'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Melhorando tipagem para aceitar mais propriedades (https://github.com/lubysoftware/multi-fit-app/commit/fad993d369ecd8795fbe11e81a2fa7f1feadec9d)\n' +
      '- Melhorando estilização para aceitar espessuras de fontes diferentes, mudando a família da fonte conforme necessário (https://github.com/lubysoftware/multi-fit-app/commit/4bf55014a4bd199035113e77b5101a1e62576cc2)\n' +
      '- Consertando texto na tela de Login (https://github.com/lubysoftware/multi-fit-app/commit/8ea9d3f40472f5303ad1db4b524dba5085a9a9cc)\n' +
      '- Consertando texto na tela de Onboarding (https://github.com/lubysoftware/multi-fit-app/commit/8f3e2b125b3d2e93e00b49ee7f9eef50a0db1d99)\n' +
      '- Mudando método que alterando a variação do texto (https://github.com/lubysoftware/multi-fit-app/commit/efd0be7366e4b8664795918f6d62a223b82173a4)'
  ),
  ...make(
    '14/12/2022',
    'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Consertando texto na tela de Cadastro (https://github.com/lubysoftware/multi-fit-app/commit/f52fc4d07310cbecaeb32f3ab6e78a306a79f348)\n' +
      '- Carregando estilização do componente de texto corretamente (https://github.com/lubysoftware/multi-fit-app/commit/19e346e93bf94bc8fff2ccef3380c3af8355c858)\n' +
      '- Consertando texto na tela de Primeiro acesso (https://github.com/lubysoftware/multi-fit-app/commit/78a0b88bf945d3d1cc468d84842f84debc48acc3)\n' +
      '- Consertando texto na tela de Configuração de Dispositivo (https://github.com/lubysoftware/multi-fit-app/commit/23825bff3bef4226c2c7c5dcf814c25bcdce18de)'
  ),

  ...make(
    '15/12/2022',
    'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Consertando texto na tela de Recuperação de Senha (https://github.com/lubysoftware/multi-fit-app/commit/eb4f1aede6d86a6dd0e867c98f1dc48017ba575b)\n' +
      '- Consertando texto na tela de Perfil (https://github.com/lubysoftware/multi-fit-app/commit/5d69b51c5e9f1ad0b72d4ce1e351dbffb65d46e5)\n' +
      '- Consertando texto na tela de Recuperação de senha (https://github.com/lubysoftware/multi-fit-app/commit/f5d5b638859455314ec59e0fe2b9b4dab41961e5)\n' +
      '- Consertando texto na tela de Configurações (https://github.com/lubysoftware/multi-fit-app/commit/36a37147019ec36afd2be206dca4fb71208bb65a)'
  ),
  ...make(
    '16/12/2022',
    'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Consertando texto na tela de Configurações de Dispositivo (https://github.com/lubysoftware/multi-fit-app/commit/5620077fb4c19e6e9d6190af7241c6678f17ae8b)\n' +
      '- Consertando texto na tela de Alarmes (https://github.com/lubysoftware/multi-fit-app/commit/91c2749824bd0109b86373ce4f547bc8128c33c3)\n' +
      '- Consertando texto na tela de Dashboard (https://github.com/lubysoftware/multi-fit-app/commit/27404e4649b68c6dc84205f240fca8a595b1807a)\n' +
      '- Consertando texto no componente de Atividade (https://github.com/lubysoftware/multi-fit-app/commit/50972bdddfd9205afd16040262d937ed8e088a2f)'
  ),
  ...make(
    '19/12/2022',
    'Sprint Interna\n' +
      '\n' +
      'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Consertando texto no componente de Alarme (https://github.com/lubysoftware/multi-fit-app/commit/f047b9fa5027e292cbe4adfae5a6148342501190)\n' +
      '- Consertando texto no componente de Relógio (https://github.com/lubysoftware/multi-fit-app/commit/a601a34a8c70a35c562303c759b9ef0a8d42fbd8)\n' +
      '- Consertando tipagem (https://github.com/lubysoftware/multi-fit-app/commit/be43da730e24dbaec247273292ca28f677944de1)\n' +
      '- Substituindo com o componente de texto correto (https://github.com/lubysoftware/multi-fit-app/commit/70be7cffc598ef64a540c5375296fd5b77b9cd6a)'
  ),
  ...make(
    '20/12/2022',
    'Sprint Review\n' +
      'Sprint Retrospective\n' +
      '\n' +
      'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Consertando estilização do primeiro acesso (https://github.com/lubysoftware/multi-fit-app/commit/4717d085adade9ad2a905a01b865b2a1f7e73df3)\n' +
      '- Substituindo com o componente de texto correto (https://github.com/lubysoftware/multi-fit-app/commit/5dee55bebfaaf473b839cde04a28006fd6521285)\n' +
      '- Removendo telas de calorias, passos, sono e batimentos do tab navigator e colocando na stack correta (https://github.com/lubysoftware/multi-fit-app/commit/9a39daf59cf398f92df83e93edaf67f2f15c62b1)\n' +
      '- Atualizando dependências do projeto (https://github.com/lubysoftware/multi-fit-app/commit/b9c3b893f6ad5ecf0354dba939293bd407038c18)'
  ),
  ...make(
    '21/12/2022',
    'Sprint Planning\n' +
      '\n' +
      'Trabalhando na padronização das fontes/correção da tipografia.\n' +
      '- Melhorando o Header para permitir a ocultação do botão de ação esquerdo (https://github.com/lubysoftware/multi-fit-app/commit/5c0e0aa1246c807aa5a69c595833cfc6248b92eb)\n' +
      '- Ocultando o botão de ação esquerdo do header, na tela de perfil (https://github.com/lubysoftware/multi-fit-app/commit/4a1da36850a8b1682df10a3db54a8da84ae6b2b0)\n' +
      '- Consertando estilização das telas de calorias, passos, sono e batimento (https://github.com/lubysoftware/multi-fit-app/commit/dc98aa638f056578e422b67c531f6f78636be8c4)\n' +
      '- Atualizando regras de lint conforme necessário (https://github.com/lubysoftware/multi-fit-app/commit/cdf1b6b81a2fae27565c8f8051650655decded50)'
  ),

  ...make(
    '22/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na task de implementação de Tema (https://luby.atlassian.net/browse/PM-316)\n' +
      '- Adicionando regras de lint conforme necessário (https://github.com/lubysoftware/multi-fit-app/commit/f7aad5ae4f70f48eb0867c2315e4cff4be30d942)\n' +
      '- Configurando temas claro e escuro nas telas do fluxo de OnBoarding (https://github.com/lubysoftware/multi-fit-app/commit/2a26c9a41e3f02467084fe851998254984b3f08b)'
  ),
  ...make(
    '23/12/2022',
    'Trabalhando na task de implementação de Tema (https://luby.atlassian.net/browse/PM-316)\n' +
      '- Configurando temas claro e escuro nas telas do fluxo de Login (https://github.com/lubysoftware/multi-fit-app/commit/78fe32b482fc54ac44fab73a4995eca1abf8f78d)\n' +
      '- Consertando código das telas de cadastro (https://github.com/lubysoftware/multi-fit-app/commit/4ff682607c6e918b20c3e68fcf5c31cbc352cc59)\n' +
      '- Consertando estilização das telas de cadastro (https://github.com/lubysoftware/multi-fit-app/commit/b1f5ec5ce4f8f6dbf3c9b8b32df0395872e2fb58)'
  ),
  ...make(
    '27/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na task de implementação de Tema (https://luby.atlassian.net/browse/PM-316)\n' +
      '- Consertando estilização do botão desabilitado (https://github.com/lubysoftware/multi-fit-app/commit/5a4f1a90e54b4e2a8cf9b5748aadb8fce42917eb)\n' +
      '- Configurando temas claro e escuro nas telas do fluxo de Cadastro (https://github.com/lubysoftware/multi-fit-app/commit/388fa0858a9dc87c53add23ce4a98ba67cd112df)\n' +
      '- Consertando estilização da StatusBar das telas do fluxo de cadastro (https://github.com/lubysoftware/multi-fit-app/commit/7bbf2042401f14920434d64357836ea7d734d5ef)\n' +
      '- Configurando temas claro e escuro nas telas do fluxo de Recuperação de Senha (https://github.com/lubysoftware/multi-fit-app/commit/4bfd8c58ae730bddfe005a9549e4b05e1d74ca0b)'
  ),
  ...make(
    '28/12/2022',
    'Participando da reunião diária de alinhamento (daily);\n' +
      '\n' +
      'Trabalhando na task de implementação de Tema (https://luby.atlassian.net/browse/PM-316)\n' +
      '- Configurando temas claro e escuro nas telas do fluxo de Primeiro Acesso (https://github.com/lubysoftware/multi-fit-app/commit/bcea01c8c8534b4abc14549f7d339a999092fa1c)\n' +
      '- Configurando temas claro e escuro no componente de Accordion do fluxo de Primeiro Acesso (https://github.com/lubysoftware/multi-fit-app/commit/57a791dfe6da0935162db8b734cd964debc45da8)\n' +
      '- Atualizando lógico no seletor de tema (https://github.com/lubysoftware/multi-fit-app/commit/270f73e75fa6e061ccb36e7c9e3b0a273e4b9c40)\n' +
      '- Configurando temas claro e escuro nas telas do fluxo de Configuração de Dispositivos (https://github.com/lubysoftware/multi-fit-app/commit/1cf615f7fa366e8d751b844b3230ead7fa8b7bd1)'
  ),
];

export const appointments: IAppointments[] = descriptions.map((a) => ({
  ...a,
  client: '8231',
  project: '18548',
  category: '1',
  notMonetize: false,
}));
