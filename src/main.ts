import { Client } from 'whatsapp-web.js';

const client = new Client({});

client.on('qr', qr => console.log('Connect:', qr));
client.on('ready', () => console.log('Client is ready!'));
client.initialize();