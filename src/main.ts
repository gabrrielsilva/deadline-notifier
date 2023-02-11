import dotenv from 'dotenv';
import pgp from 'pg-promise';
import qrCode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import { consultDeadlines } from './consultDeadlines';
dotenv.config();

const connection = pgp()(process.env.DATABASE_URL);
const client = new Client({
  puppeteer: {
    args: ['--no-sandbox','--disable-setuid-sandbox']
  }
});

const date = new Date();
const day = date.getDate();

client.on('qr', qr => qrCode.generate(qr, { small: true }));
client.on('ready', async () => {
  console.log('Client is ready!');
  await import('./checkIncomingMessageChatId');
  verifyPeriod();
});
client.initialize();

let sendNotification = false;
function verifyPeriod() {
  if (day % 2 === 0 && !sendNotification) {
    sendNotification = true;
    consultDeadlines();
  } else if (day % 2 !== 0) {
    sendNotification = false;
    verifyPeriod();
  }
};

verifyPeriod();

export { connection, client };

