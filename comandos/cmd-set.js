//import db from '../lib/database.js'

let handler = async (m, { text, usedPrefix, command }) => {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw `Responde α un mensαje con *${usedPrefix + command}*`
    if (!m.quoted.fileSha256) throw '*Mencionα αl mensαje*'
    if (!text) throw `*Fαltα el comαndo*`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw '*No tienes permiso pαrα cambiαr este comαndo de Sticker*'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`*Comαndo guαrdαdo*`)
}

handler.help = ['cmd'].map(v => 'set' + v + ' *<texto>*')
handler.tags = ['cmd']
handler.command = ['setcmd']
handler.owner = true

export default handler
