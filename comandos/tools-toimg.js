/*import uploadImage from '../lib/uploadFile'

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `Responde a un sticker`;
  let mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw `Responde a un sticker`
  let media = await m.quoted.download();
  let out = Buffer.alloc(0);
  if (/webp/.test(mime)) {
    out = await uploadImage(media);
  }
  await conn.sendMessage(m.chat, { image: { url: out }, caption: listo }, { quoted: m });
}

handler.help = ['toimg *<sticker>*']
handler.tags = ['sticker', 'tools']
handler.command = ['toimg', 'jpg', 'aimg'] 
handler.register = true

export default handler*/


import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn, usedPrefix, command }) => {
const notStickerMessage = `Respondα a un sticker con: *${usedPrefix + command}*`
if (!m.quoted) throw notStickerMessage
const q = m.quoted || m
let mime = q.mediaType || ''
if (!/sticker/.test(mime)) throw notStickerMessage
await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }})
let media = await q.download()
let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
conn.sendFile(m.chat, out, 'out.png', `*Aqui tiene ฅ^•ﻌ•^ฅ*`.trim(), m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true, externalAdReply:{ showAdAttribution: false, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}, mentions: [m.sender]}}, { quoted: m })
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['toimg *<sticker>*']
handler.tags = ['sticker', 'tools']
handler.command = ['toimg', 'jpg', 'aimg'] 
handler.register = true

export default handler