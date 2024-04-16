import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `*Respondα α un video o αudio*`
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    let media = await q.download?.()
    if (!media) throw '*STAFF* | Error\n\n*Vuelve α intentαrlo*'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw '*STAFF* | Error\n\n*Vuelve α intentαrlo*'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', estiloaudio, true, { mimetype: 'audio/mp4' })
}
handler.help = ['tovn']
handler.tags = ['tools']

handler.command = ['toav', 'tovn'] 
handler.register = true

export default handler