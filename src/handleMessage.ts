import WAWebJS from 'whatsapp-web.js';
import { getProtocolDeadline } from './getProtocolDeadline';
import { client } from './main';

export function handleMessage(message: WAWebJS.Message) {
  // !protocolo 28565
  if (message.body.startsWith('!protocolo')) {
    const projectId = message.body.split(' ')[1];
    if (!projectId) client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, '*Bot:* Digite também o ID do projeto 🙄');
    getProtocolDeadline(projectId);
  } else if (message.body.startsWith('!')) {
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, '*Bot:* Não conheço esse comando 🤔');
  }
}