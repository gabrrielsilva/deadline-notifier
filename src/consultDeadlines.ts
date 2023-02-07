import { client, connection } from './main';

export async function consultDeadlines() { 
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const data = await connection.query<{ id: string, acionamentos: string, prazo_licenciamentos: string }[]>('SELECT id, acionamentos, prazo_licenciamentos FROM "Project"');
  const projectsToProtocol: string[] = []
  
  for await (const project of data) {
    if (project.prazo_licenciamentos) {
      const prazoLicenciamentos = project.prazo_licenciamentos
      const prazoLicenciamentosMonth = +prazoLicenciamentos.substring(5, 7);
      const prazoLicenciamentosDay = +prazoLicenciamentos.substring(8, 10);
  
      if (prazoLicenciamentosMonth === month && prazoLicenciamentosDay >= day) {
        // future projects in this month
        projectsToProtocol.push(project.id);
      }
    }
  }

  if (projectsToProtocol.length > 0) {
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, `*Bot:* Neste mês, a partir de hoje, devem ser protocolados os projetos: *${projectsToProtocol.join(', ')}*`)
  } else {
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, `*Bot:* Ou não há projetos para protocolar neste mês, ou eles não foram cadastrados no sistema 😡`)
  }
}