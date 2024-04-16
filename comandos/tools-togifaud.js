let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) throw `*Respondα α un video*`
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) throw `*El tipo de αrchivos ${mime} no es correcto*`
await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
let media = await q.download()
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: '*Aqui tiene ฅ^•ﻌ•^ฅ*' }, { quoted: m })}
handler.help = ['togifaud']
handler.tags = ['tools']
handler.command = ['togifaud']
export default handler
