import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, args, text }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '*Responde a una imagen o video*'
if (!text) throw '*Ingresa el peso nuevo de la imágen/video*'
  if (isNaN(text)) throw ' *sólo números*'
if (!/image\/(jpe?g|png)|video|document/.test(mime)) throw `*Formato no soportado*`
let img = await q.download()
let url = await uploadImage(img)

if (/image\/(jpe?g|png)/.test(mime)) {
conn.sendMessage(m.chat, { image: {url: url}, caption: ``, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: m})
} else if (/video/.test(mime)) {
return conn.sendMessage(m.chat, { video: {url: url}, caption: ``, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: m })}
}
handler.tags = ['tools']
handler.help = ['tamaño *<cantidad>*']
handler.command = /^(length|filelength|edittamaño|totamaño|tamaño)$/i
handler.limit = 1
handler.register = true 

export default handler