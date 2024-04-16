import db from '../lib/database.js'

let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return
   if (!(who in global.db.data.users)) throw `*El usuario no se encuentra en mi base de datos*`
   let user = global.db.data.users[who]
   await m.reply(`*${who == m.sender ? `Miku Bot - MD* | 「 *BANCO* 」\n\nTienes *${user.bank}* Coins 🪙 en el Banco` : `Miku Bot - MD* | 「 *BANCO* 」\n\nEl usuario @${who.split('@')[0]} tiene *${user.bank}* Coins 🪙 en el Banco`}.`, null, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco'] 
handler.register = true 
export default handler 