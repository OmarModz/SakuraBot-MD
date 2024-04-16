import db from '../lib/database.js'

import MessageType from '@whiskeysockets/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '*Menciona al usuario con @user*'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw 'Ingrese la cantidad de *-Coins-* que quiere transferir'
    if (isNaN(txt)) throw '*sólo números*'
    let poin = parseInt(txt)
    let limit = poin
    let imt = Math.ceil(poin * impuesto)
    limit += imt
    if (limit < 1) throw '*Mínimo es  1*'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw '*No tienes suficientes coins🪙 para dar*'
    users[m.sender].limit -= limit
    users[who].limit += poin
    
    await m.reply(`
*${-poin}* Coins
Impuesto 2% : *${-imt}* Coins
Total gastado: *${-limit}* Coins`)
    conn.fakeReply(m.chat, `*+${poin}* *Coins🪙*`, who, m.text)
}
handler.help = ['darcoins *@user <cantidad>*']
handler.tags = ['rpg']
handler.command = ['darcoins'] 
handler.register = true 

export default handler