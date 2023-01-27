import dotenv from 'dotenv';
import pgp from 'pg-promise';
import qrCode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
dotenv.config();

const connection = pgp()(process.env.DATABASE_URL);
const client = new Client({});

client.on('qr', qr => qrCode.generate(qr, { small: true }));
client.on('ready', async () => {
  console.log('Client is ready!')
  await import('./checkIncomingMessageChatId')
});
client.initialize();

export { connection, client };
