import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const q = m.quoted || m
    let mime = (q.msg || q).mimetype || ''
    if (!m.quoted) throw `*Etiquetα el video o αudio que deseα convertir en documento*`
    if(!text) throw `*• Ingresα el nombre pαrα guαrdαr el documento*`
    if (!/audio|video/.test(mime)) throw `*Respondα αl video o αudio que deseα convertir α documento con el comando*`
    let media = await q.download?.()
    if (!media) throw '*Miku Bot😺* | 「 *ERROR* 」\n\nOcurrió un *Error*'
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    if (/video/.test(mime)) {
    return conn.sendMessage(m.chat, { document: media, mimetype: 'video/mp4', fileName: `${text}.mp4`}, {quoted: m})
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
    } else if (/audio/.test(mime)) {
    return conn.sendMessage(m.chat, { document: media, mimetype: 'audio/mpeg', fileName: `${text}.mp3`}, {quoted: m})}
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['document *<audio/video>*']
handler.tags = ['tools']
handler.command = ['document', 'toducument', 'todoc']
handler.register = true

export default handler