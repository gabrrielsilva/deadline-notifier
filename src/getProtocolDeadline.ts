import { client, connection } from './main';

export async function getProtocolDeadline(projectId: string) {
  const validProtocols = ['PREFEITURA', 'CONVIAS', 'RODOVIA', 'FERROVIA', 'ENERGIA'];
  const [data] = await connection.query<[{ acionamentos: string, prazo_licenciamentos: string }]>('SELECT acionamentos, prazo_licenciamentos FROM "Project" WHERE id = $1 ::text', [projectId]);
  
  if (data?.acionamentos && data?.prazo_licenciamentos) {
    const { acionamentos: protocols, prazo_licenciamentos } = data;
    const protocolsArray = protocols.replace(/[{}]/g, '').split(',');    
    const filteredProtocols = protocolsArray.filter(protocol => { return validProtocols.includes(protocol) });
    const formatedDate = prazo_licenciamentos.substring(8, 10) + '/' + prazo_licenciamentos?.substring(5, 7) + '/' + prazo_licenciamentos.substring(0, 4);
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, `O prazo dos protocolos ${filteredProtocols.join(', ')} para o projeto *ID${projectId}* é *${formatedDate}* 🕑`);
  } else {
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, 'Não encontrei um projeto com esse ID 😕');
  }
}