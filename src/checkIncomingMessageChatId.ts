import { handleMessage } from './handleMessage';
import { client } from './main';

client.on('message', async message => {
  const chatID = (await message.getChat()).id;
  
  if (message.body === '!chatID') message.reply(chatID._serialized);
  if (chatID._serialized === process.env.CHAT_ID_PROTOCOLOS_INFINITEL) {
    handleMessage(message);
  }
})