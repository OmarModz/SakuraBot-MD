let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `*El usuario no se encuentra en mi base de datos*`
    conn.reply(m.chat, `*Miku Bot - MD* | 「 *COINS* 」
   
*@${who.split('@')[0]}* cuenta con:

🪙 *Coins restantes:* *${global.db.data.users[who].limit}*
    Tu XP total es *${user.exp}*`, m, { mentions: [who] })
}
handler.help = ['coins']
handler.tags = ['rpg']
handler.command = ['coins'] 
handler.register = true 
export default handler