import fetch from "node-fetch"
import axios from "axios"
import { translate } from "@vitalets/google-translate-api"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Ingresa el nombre de su personaje**\n\n*Ejemplo:*\n*${usedPrefix + command}* Ai Hoshino`
await m.react('🕓')
  try {
    let res = await axios.get(`https://weeb-api.vercel.app/character?search=${text}`)
    
    let { id, name, gender, imageUrl, siteUrl, age, description } = res.data[0]
    let desc = await translate(`${description}`, { to: "es", autoCorrect: true })
    let gen = await translate(`${gender}`, { to: "es", autoCorrect: true })
    let img = await (await fetch(`${imageUrl}`)).buffer()
    let txt = `*乂  C H A R A C T E R  -  S E A R C H*\n\n`
        txt += `	✩   *Nombre* : ${name.full}\n`
        txt += `	✩   *Nombre Nativo* : ${name.native}\n`
        txt += `	✩   *Genero* : ${gen.text}\n`
        txt += `	✩   *Edad* : ${age}\n`
        txt += `	✩   *Descripcion* : ${desc.text}`

await conn.sendMessage(m.chat, {
text: txt,
contextInfo: {
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: img,
thumbnail: img,
sourceUrl: null,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
await m.react('✅')
} catch {
console.error(error)
await m.react('✖️')
}}
handler.help = ["character *<nombre>*"]
handler.tags = ["search", "rollwaifu"]
handler.command = ["character"]
handler.register = true
//handler.limit = 1
export default handler