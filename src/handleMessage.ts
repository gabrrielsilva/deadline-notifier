import WAWebJS from 'whatsapp-web.js';
import { consultDeadlines } from './consultDeadlines';
import { getProtocolDeadline } from './getProtocolDeadline';
import { client } from './main';

export async function handleMessage(message: WAWebJS.Message) {
  // !protocolo 28565
  if (message.body.startsWith('!protocolo')) {
    const projectId = message.body.split(' ')[1];
    if (!projectId) client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, '*Bot:* Digite também o ID do projeto 🙄');
    getProtocolDeadline(projectId);
  } else if (message.body === '!prazos') {
    await consultDeadlines();
  } else if (message.body === '!chatId') {
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, `Chat ID = ${(await message.getChat()).id}`);
  } else if (message.body.startsWith('!')) {
    client.sendMessage(process.env.CHAT_ID_PROTOCOLOS_INFINITEL, '*Bot:* Não conheço esse comando 🤔');
  }
}