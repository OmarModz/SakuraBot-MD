import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let lvl =  `*Miku Bot - MD* | 「 *NIVEL* 」
        
Nombre : *${name}*
Nivel : *${user.level}*
XP : *${user.exp - min}/${xp}*

Te falta *${max - user.exp}* de *XP* para subir de nivel
`.trim()
conn.sendMessage(m.chat, {
text: lvl,
contextInfo: { 
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: 'https://telegra.ph/file/b97148e2154508f63d909.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `Bien hecho ${conn.getName(m.sender)}    Nivel:`
        let str = `*Miku Bot - MD* | 「 *LEVEL UP* 」
        
Felicitaciones, has subido de nivel!        
Tu nivel anterior era *${before}* y ahora tu nivel actual es *${user.level}*

*_Cuanto más interactúes con los bots, mayor será tu nivel_*`.trim()

conn.sendMessage(m.chat, {
text: str,
contextInfo: { 
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: 'https://telegra.ph/file/b97148e2154508f63d909.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
            //m.reply(str)
        }
    }

handler.help = ['levelup']
handler.tags = ['rpg']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler