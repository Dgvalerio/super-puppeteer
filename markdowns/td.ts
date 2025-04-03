/* eslint-disable prettier/prettier */
import {Context} from '../src/util/get-timesheet-project';

export interface Days {
  client: string;
  project: string;
  category: string;
  date: string;
  description: string;
  time: { initial: string; final: string }[];
}

const t = (
  initial: string,
  final: string
): { initial: string; final: string } => ({ initial, final });

const getHemera = (categoryName: 'Documentação'| 'Modelagem'| 'Desenvolvimento' | 'Deploy' | 'Testes Automatizados'): Context => {
  let category = '';

  switch (categoryName) {
    case "Desenvolvimento":
      category = '1';
      break;
    case "Modelagem":
      category = '2';
      break;
    case "Deploy":
      category = '3';
      break;
    case "Testes Automatizados":
      category = '4';
      break;
    case "Documentação":
      category = '5';
      break;
  }

  return({
    client: '6177', // INTELIGENTO PARTICIPAÇÕES LTDA
    project: '18822', // SSO e Novo Portal
    category
  });
}

const getBatePapo = (): Context => ({client: '15', project: '17507', category: '1023'})
const getOneAOne = (): Context => ({client: '15', project: '18595', category: '1017'})

const getISMAX = (categoryName: 'Documentação'| 'Modelagem'| 'Desenvolvimento' | 'Deploy' | 'Testes Automatizados'): Context => {
  let category = '';

  switch (categoryName) {
    case "Desenvolvimento":
      category = '1';
      break;
    case "Modelagem":
      category = '2';
      break;
    case "Deploy":
      category = '3';
      break;
    case "Testes Automatizados":
      category = '4';
      break;
    case "Documentação":
      category = '5';
      break;
  }

  return({
    client: '8233', // INTERNATIONAL SCHOOL SERVICOS DE ENSINO, TREINAMENTO E EDITORACAO FRANQUEADORA S.A
    project: '18814', // IS - Alocação
    category
  });
}

export const days: Days[] = [
  { date: '05/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-338: Erros de exibição e estruturação no PDF gerado ao criar a Nota Comercial
HEM-424: Botão de Aprovar e reprovar aparecendo para o primeiro aprovador`, ...getHemera('Desenvolvimento') },
  { date: '05/03/2025', time: [t('13:00', '18:00')], description: `HEM-338: Erros de exibição e estruturação no PDF gerado ao criar a Nota Comercial
HEM-424: Botão de Aprovar e reprovar aparecendo para o primeiro aprovador`, ...getHemera('Desenvolvimento') },
  { date: '06/03/2025', time: [t('08:00', '12:30')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-393: Ao clicar no link da Nota Comercial (NC), a tela volta para a aba "Em Digitação"
HEM-424: Botão de Aprovar e reprovar aparecendo para o primeiro aprovador
HEM-403: Validação incorreta ao marcar "Investidor Externo" após erro no CNPJ
HEM-392: Filtro de Data não funciona ao alternar entre abas da Situação da NC`, ...getHemera('Desenvolvimento') },
  { date: '06/03/2025', time: [t('13:30', '19:00')], description: `HEM-393: Ao clicar no link da Nota Comercial (NC), a tela volta para a aba "Em Digitação"
HEM-424: Botão de Aprovar e reprovar aparecendo para o primeiro aprovador
HEM-403: Validação incorreta ao marcar "Investidor Externo" após erro no CNPJ
HEM-392: Filtro de Data não funciona ao alternar entre abas da Situação da NC`, ...getHemera('Desenvolvimento') },
  { date: '07/03/2025', time: [t('08:00', '12:30')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-393: Ao clicar no link da Nota Comercial (NC), a tela volta para a aba "Em Digitação"
HEM-429: Erro ao criar uma NC
HEM-403: Validação incorreta ao marcar "Investidor Externo" após erro no CNPJ
HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento
HEM-391: Bloquear envio de Nota Comercial (NC) sem planilha de fluxo carregada`, ...getHemera('Desenvolvimento') },
  { date: '07/03/2025', time: [t('13:30', '19:00')], description: `Participando das reuniões:
  Alinhamento para mensuração Hemera

HEM-393: Ao clicar no link da Nota Comercial (NC), a tela volta para a aba "Em Digitação"
HEM-429: Erro ao criar uma NC
HEM-403: Validação incorreta ao marcar "Investidor Externo" após erro no CNPJ
HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento
HEM-391: Bloquear envio de Nota Comercial (NC) sem planilha de fluxo carregada`, ...getHemera('Desenvolvimento') },
  { date: '10/03/2025', time: [t('08:00', '13:30')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-429: Erro ao criar uma NC`, ...getHemera('Desenvolvimento') },
  { date: '10/03/2025', time: [t('14:30', '23:00')], description: `HEM-429: Erro ao criar uma NC`, ...getHemera('Desenvolvimento') },
  { date: '11/03/2025', time: [t('08:00', '13:30')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-429: Erro ao criar uma NC`, ...getHemera('Desenvolvimento') },
  { date: '11/03/2025', time: [t('14:30', '19:00')], description: `HEM-429: Erro ao criar uma NC`, ...getHemera('Desenvolvimento') },
  { date: '12/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-434: Front - criar tela de inicio do portal
Resolvendo problema com aprovação
Resolvendo problema no PDF`, ...getHemera('Desenvolvimento') },
  { date: '12/03/2025', time: [t('14:00', '15:00')], description: `HEM-434: Front - criar tela de inicio do portal
Resolvendo problema com aprovação
Resolvendo problema no PDF`, ...getHemera('Desenvolvimento') },
  { date: '13/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-434: Front - criar tela de inicio do portal
HEM-435: liberar consulta para o escriturador`, ...getHemera('Desenvolvimento') },
  { date: '13/03/2025', time: [t('13:00', '20:00')], description: `HEM-434: Front - criar tela de inicio do portal
HEM-435: liberar consulta para o escriturador`, ...getHemera('Desenvolvimento') },
  { date: '14/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-436: Botão Aprovar está aparecendo para o primeiro e segundo aprovador após aprovação
HEM-438: Notas canceladas não exibem informações de cancelamento
HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente`, ...getHemera('Desenvolvimento') },
  { date: '14/03/2025', time: [t('13:00', '18:00')], description: `HEM-436: Botão Aprovar está aparecendo para o primeiro e segundo aprovador após aprovação
HEM-438: Notas canceladas não exibem informações de cancelamento
HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente`, ...getHemera('Desenvolvimento') },
  { date: '17/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente
HEM-441: Estruturador Junior não está podendo Criar NC, está dando erro ao gerar pdf.`, ...getHemera('Desenvolvimento') },
  { date: '17/03/2025', time: [t('13:00', '20:00')], description: `HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente
HEM-441: Estruturador Junior não está podendo Criar NC, está dando erro ao gerar pdf.`, ...getHemera('Desenvolvimento') },
  { date: '18/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente
HEM-464: Tratamento de erro no nome de usuário
HEM-465: Master/Custodia - senior não está conseguindo soliciatar pagamento`, ...getHemera('Desenvolvimento') },
  { date: '18/03/2025', time: [t('13:00', '16:00')], description: `HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente
HEM-464: Tratamento de erro no nome de usuário
HEM-465: Master/Custodia - senior não está conseguindo soliciatar pagamento`, ...getHemera('Desenvolvimento') },
  { date: '19/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-465: Master/Custodia - senior não está conseguindo soliciatar pagamento
HEM-441: Estruturador Junior não está podendo Criar NC, está dando erro ao gerar pdf.
HEM-466: Exibição Indevida do Botão 'Cancelar' na Tela de Aprovação NC
HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente`, ...getHemera('Desenvolvimento') },
  { date: '19/03/2025', time: [t('13:00', '21:00')], description: `HEM-465: Master/Custodia - senior não está conseguindo soliciatar pagamento
HEM-441: Estruturador Junior não está podendo Criar NC, está dando erro ao gerar pdf.
HEM-466: Exibição Indevida do Botão 'Cancelar' na Tela de Aprovação NC
HEM-439: Usuário com permissão "Grupo = Custódia" e "Papel = Junior" pode baixar arquivos e visualizar botão "Enviar para aprovação" indevidamente`, ...getHemera('Desenvolvimento') },
  { date: '20/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  Hemera & Luby - Daily
  SSO & Portal de Notas - Daily

HEM-466: Exibição Indevida do Botão 'Cancelar' na Tela de Aprovação NC
HEM-441: Estruturador Junior não está podendo Criar NC, está dando erro ao gerar pdf.
HEM-392: Filtro de Data não funciona ao alternar entre abas da Situação da NC
HEM-469: Criar uma Tela de Vizualização de Modelo NC para consulta`, ...getHemera('Desenvolvimento') },
  { date: '20/03/2025', time: [t('13:00', '20:00')], description: `HEM-466: Exibição Indevida do Botão 'Cancelar' na Tela de Aprovação NC
HEM-441: Estruturador Junior não está podendo Criar NC, está dando erro ao gerar pdf.
HEM-392: Filtro de Data não funciona ao alternar entre abas da Situação da NC
HEM-469: Criar uma Tela de Vizualização de Modelo NC para consulta`, ...getHemera('Desenvolvimento') },
  { date: '21/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-469: Criar uma Tela de Vizualização de Modelo NC para consulta
HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento`, ...getHemera('Desenvolvimento') },
  { date: '21/03/2025', time: [t('13:00', '18:00')], description: `HEM-469: Criar uma Tela de Vizualização de Modelo NC para consulta
HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento`, ...getHemera('Desenvolvimento') },
  { date: '24/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento`, ...getHemera('Desenvolvimento') },
  { date: '24/03/2025', time: [t('13:00', '20:00')], description: `Participando das reuniões:
  Planning sprint 15 - portal de notas

HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento`, ...getHemera('Desenvolvimento') },
  { date: '25/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Hemera & Luby - Daily

HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento`, ...getHemera('Desenvolvimento') },
  { date: '25/03/2025', time: [t('13:00', '20:00')], description: `HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento`, ...getHemera('Desenvolvimento') },
  { date: '26/03/2025', time: [t('08:00', '11:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Alinhamento prototipo - Hemera

HEM-440: (Front) Mensagem de erro ao ser deslogado do sistema é generico
HEM-391: Bloquear envio de Nota Comercial (NC) sem planilha de fluxo carregada
HEM-478: Dados da nota não estão sendo exibido corretamente na aba garantias`, ...getHemera('Desenvolvimento') },
  { date: '26/03/2025', time: [t('11:00', '12:00')], description: `Participando das reuniões:
  Bate-papo com Alon`, ...getBatePapo() },
  { date: '27/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily
  Alinhamento prototipo - Hemera

HEM-482: O sistema da o alerta, porem é enviado a assinatura
HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento
HEM-391: Bloquear envio de Nota Comercial (NC) sem planilha de fluxo carregada`, ...getHemera('Desenvolvimento') },
  { date: '27/03/2025', time: [t('13:00', '20:00')], description: `HEM-482: O sistema da o alerta, porem é enviado a assinatura
HEM-414: Não está sendo obrigatórios os Avalistas e Cônjuges no fluxo de pagamento
HEM-391: Bloquear envio de Nota Comercial (NC) sem planilha de fluxo carregada`, ...getHemera('Desenvolvimento') },
  { date: '28/03/2025', time: [t('08:00', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily

Corrigindo PR referente a task de tela de usuários
Avaliando tasks
Revisando protótipo`, ...getHemera('Desenvolvimento') },
  { date: '28/03/2025', time: [t('13:00', '16:00')], description: `Corrigindo PR referente a task de tela de usuários
Avaliando tasks
Revisando protótipo`, ...getHemera('Desenvolvimento') },
  { date: '31/03/2025', time: [t('07:30', '12:00')], description: `Participando das reuniões:
  SSO & Portal de Notas - Daily

HEM-494: Front - Digito da conta não está sendo exibido na tela e no PDF
HEM-495: Atualizar versão do next
HEM-453: Front - Adicionar itens expansiveis ao menu`, ...getHemera('Desenvolvimento') },
  { date: '31/03/2025', time: [t('13:00', '16:30')], description: `Participando das reuniões:
  Investigação quanto ao problema em produção

HEM-494: Front - Digito da conta não está sendo exibido na tela e no PDF
HEM-495: Atualizar versão do next
HEM-453: Front - Adicionar itens expansiveis ao menu`, ...getHemera('Desenvolvimento') },
  { date: '31/03/2025', time: [t('16:30', '17:30')], description: `Reunião`, ...getOneAOne() },
  { date: '31/03/2025', time: [t('17:30', '20:30')], description: `HEM-453: Front - Adicionar itens expansiveis ao menu`, ...getHemera('Desenvolvimento') },
];
