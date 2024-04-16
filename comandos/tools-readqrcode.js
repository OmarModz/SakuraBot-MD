import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '*Respode al QR*'
let img = await q.download?.()
let url = await uploadImage(img)
let anu = await fetch(`https://api.lolhuman.xyz/api/read-qr?apikey=${lolkeysapi}&img=${url}`)
let json = await anu.json()
await m.reply(`*El texto del codigo QR es:* ${json.result}`)}
handler.tags = ['tools']
handler.help = ['readqr']
handler.command = /^(readqr)$/i
handler.register = true 
handler.limit = 1
export default handler
