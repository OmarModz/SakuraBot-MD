let handler = async (m, { conn, text }) => {
if (!text) throw '*Agregue el texto que enviará el Bot*'
m.reply(text, false, {
contextInfo: {
mentionedJid: conn.parseMention(text)
}})}
handler.help = ['mention *<texto>*']
handler.tags = ['tools']
handler.command = /^mention$/i
handler.register = true 

export default handler