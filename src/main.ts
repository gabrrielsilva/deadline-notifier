import qrCode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';

const client = new Client({});

client.on('qr', qr => qrCode.generate(qr, { small: true }));
client.on('ready', () => console.log('Client is ready!'));
client.initialize();

export { client };
