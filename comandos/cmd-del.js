//import db from '../lib/database.js'

let handler = async (m, { text }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `*• Ingresα el nombre del comαmdo*`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw '* No puedes borrαr este comαndo*'
    delete sticker[hash]
    m.reply(`*Comαndo eliminαdo*`)
}

handler.help = ['cmd'].map(v => 'del' + v + ' *<texto>*')
handler.tags = ['cmd']
handler.command = ['delcmd']
handler.owner = true

export default handler
