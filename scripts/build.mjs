import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('www', { recursive: true, force: true });
await mkdir('www', { recursive: true });
await cp('index.html', 'www/index.html');
const endpoint = process.env.STEADY_CHAT_ENDPOINT || '';
await writeFile('www/runtime-config.js', `window.STEADY_CHAT_ENDPOINT = ${JSON.stringify(endpoint)};\n`);
console.log('Built Steady web bundle in www/');
