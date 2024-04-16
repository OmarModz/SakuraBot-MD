
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (!who) throw `Etiqueta o menciona a alguien`
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Agrega el número de días que el usuario sera *Premium*`
    if (isNaN(txt)) return m.reply(`Solo números!\n\*Ejemplo*\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)
    global.prems.push(`${who.split`@`[0]}`)
    var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += jumlahHari
    else user.premiumTime = now + jumlahHari
user.premium = true
    m.reply(`*Miku Bot😺* | 「 *ADD PREMIUM* 」
    
*Nombre* : ${user.name}
*Tiempo* :${txt} Días`)
}
handler.help = ['addprem *@user*']
handler.tags = ['owner']
handler.command = /^(addprem|addpremium)$/i

handler.group = true
handler.rowner = true

export default handler

//import db from '../lib/database.js'

/*let handler = async (m, { conn, text, usedPrefix, command }) => {
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) throw `✳️ Etiqueta o menciona a alguien\n\n📌 Ejemplo : ${usedPrefix + command} @user`
if (global.prems.includes(who.split`@`[0])) throw '✳️ El usuario Mensionado Ya es premium'
global.prems.push(`${who.split`@`[0]}`)

conn.reply(m.chat, `
✅ PREMIUM

@${who.split`@`[0]} ahora te conviertes en un usuario premium
┌───────────
▢ *Nombre:* ${user.name}
└───────────
`, m, { mentions: [who] })

}
handler.help = ['addprem *@user*']
handler.tags = ['owner']
handler.command = ['addprem', 'addpremium'] 

handler.group = true
handler.rowner = true

export default handler*/
