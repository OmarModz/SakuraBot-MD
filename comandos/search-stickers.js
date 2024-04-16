import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, {text, usedPrefix, command, conn}) => {
let sfoto = fs.readFileSync('./storage/img/sticker.jpg')
if (!text) throw `*• Ingresa el nombre del paquete de stickers que desea buscar*`
await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }})
let json = await fetch(`https://api.akuari.my.id/search/sticker?query=${text}`)
let jsons = await json.json()
let res = jsons.result.map((v, index) => `*Resultado:* ${1 + index}\n*Nombre:* ${v.title}\n*Url:* ${v.url}`).join`\n\n───\n\n`
conn.sendMessage(m.chat, {
text: res,
contextInfo: { 
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/421080582b6a6b1a46718.jpg',
sourceUrl: [global.linkgc, global.linkgc2, global.linkgc3, global.linkgc4, global.linkgc5].getRandom(),
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
//  conn.sendFile(m.chat, res, sfoto, `• Resultados Encontrados🔎`, m) 
}
handler.tags = ['sticker', 'search']
handler.command = handler.help = ['stickersearch', 'searchsticker']
handler.limit = 1
handler.register = true 

export default handler