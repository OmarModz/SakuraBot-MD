let { proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  if (!args[0]) throw `*• Respondα a un mensaje usando el comando más un emoji para reaccionar*\n\n*Ejemplo:*\n*${usedPrefix + command}* 🤫`
  let q = m.quoted ? await m.getQuotedObj() : m
 conn.sendMessage(m.chat, { react: { text: args[0], key: q.key }}, { quoted: q })
}
handler.help = ['react *<emoji>*']
handler.tags = ['tools']
handler.command = ['react', 'reaccionar', 'reaccion'] 
handler.register = true 

export default handler