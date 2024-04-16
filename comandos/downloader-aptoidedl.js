import fetch from 'node-fetch'
import { download } from 'aptoide-scraper'
import ufs from 'url-file-size'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
   std: 'JEDEC',
   decimalPlaces: 2,
   keepTrailingZeroes: false,
   render: (literal, symbol) => `${literal} ${symbol}B`,
})
let limit = 800

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
if (!text) return m.reply('*• Ingresa el ID de un resultado de la busqueda de Aptoide*')
await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }})
let res = await download(text)
let size = await format(await ufs(res.dllink))
if (Number(size.split(' MB')[0]) >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`)
   if (Number(size.split(' GB')[0]) >= 0) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`)
   let img = await (await fetch(res.icon)).buffer()
   
let txt = `\t\t\t*乂  D O W N L O A D  -  A P T O I D E*\n\n`
         txt += `*Nombre* : ${res.name}\n`
         txt += `*Package* : ${res.package}\n`
         txt += `*Tamaño* : ${size}\n`
         txt += `*Subido* : ${res.lastup}\n\n`
         txt += `- El archivo se esta enviando, Espere un momento.`
      await conn.sendMessage(m.chat, {
text: txt,
contextInfo: { 
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: 'bodynya',
thumbnailUrl: res.icon,
sourceUrl: [global.linkgc, global.linkgc2, global.linkgc3, global.linkgc4, global.linkgc5].getRandom(),
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
      conn.sendMessage(m.chat, { document: { url: `${res.dllink}` }, mimetype: 'application/videos.android.package-archive', fileName: `${res.name}.apk` }, { quoted: m })
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
      }

handler.tags = ['downloader', 'premium']
handler.help = ['dlaptoide *<enlace>*']
handler.command = ['aptoidedl', 'dlaptoide']
handler.premium = true 
handler.register = true 
export default handler