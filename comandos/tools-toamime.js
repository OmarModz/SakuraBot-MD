import uploadImage from '../lib/uploadImage.js';
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || '';
if (!/image/g.test(mime)) throw '*Responda a una imagen*';
await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }});
const data = await q.download?.();
const image = await uploadImage(data);
try {
const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
await conn.sendFile(m.chat, anime, 'error.jpg', null, m);
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch (i) {
try {
const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
await conn.sendFile(m.chat, anime2, 'error.jpg', null, m);
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch (a) {
try {
const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
await conn.sendFile(m.chat, anime3, 'error.jpg', null, m);
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch (e) {
throw '*Miku Bot😺* | 「 *ERROR* 」\n\nOcurrió un *Error*';
}}}};
handler.help = ["toanime"];
handler.tags = ["tools"];
handler.command = /^(jadianime|toanime)$/i;
handler.limit = 1
handler.register = true 

export default handler;