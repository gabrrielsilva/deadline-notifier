import { client, connection } from './main';

let sentNotification = false;

export async function consultDeadlines() { 
  if (!sentNotification) {
    const data = await connection.query<{ id: string, acionamentos: string, prazo_licenciamentos: string }[]>('SELECT id, acionamentos, prazo_licenciamentos FROM "Project"');
  
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (day % 2 === 0) {
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

      sentNotification = true;
    } else {
      sentNotification = false;
    }
  } else {
    setTimeout(() => {
      consultDeadlines();
    }, 1000 * 60 * 60 * 12) // 12 hours
  }

  if (new Date().getDate() % 2 !== 0) {
    sentNotification = false;
  }

  setTimeout(() => {
    consultDeadlines();
  }, 1000 * 60 * 60 * 12) // 12 hours
}