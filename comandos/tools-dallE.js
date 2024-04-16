import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* gatitos llorando`;
await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }});
try {
const tiores1 = await fetch(`https://vihangayt.me/tools/imagine?q=${text}`);
const json1 = await tiores1.json();
await conn.sendMessage(m.chat, {image: {url: json1.data}}, {quoted: m});
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch {  
try {
const tiores2 = await conn.getFile(`https://vihangayt.me/tools/midjourney?q=${text}`);
await conn.sendMessage(m.chat, {image: {url: tiores2.data}}, {quoted: m});
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch {
try {
const tiores3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${text}`);
const json3 = await tiores3.json();
await conn.sendMessage(m.chat, {image: {url: json3.data[0].images[0].url}}, {quoted: m});
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch {
try {
const tiores4 = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`);
await conn.sendMessage(m.chat, {image: {url: tiores4.data}}, {quoted: m});
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch {
throw `*Miku Bot😺* | 「 *ERROR* 」\n\nOcurrió un *Error*`;
}}}}};
handler.help = ['dall-e'];
handler.tags = ['tools'];
handler.command = ['dall-e', 'dalle', 'cimg'];
handler.limit = 1
handler.register = true 

export default handler;