import axios from 'axios'
import request from 'request'
import fetch from 'node-fetch' 

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args || !args[0]) return conn.reply(m.chat, `*• Ingresa un enlace de SoundCloud`, m)
if (!args[0].match(/soundcloud/gi)) return conn.reply(m.chat, `Verifica que el enlace sea de SoundCloud`, m)
await m.react('🕓')
try {
let user = global.db.data.users[m.sender]
let res = await soundcloud(args[0])
let img = await (await fetch(`${res.thumb}`)).buffer()  
let txt = `\t\t\t*乂  S O U N D C L O U D  -  D O W N L O A D*\n\n`
       txt += `*Titulo ∙* ${res.judul}\n`
       txt += `*Tamaño ∙* ${res.download_count}\n`
       txt += `*Url ∙* ${args[0]}\n\n`
       txt += `- El audio se esta enviando, Espere un momento.`
       
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

await conn.sendFile(m.chat, res.link, res.judul + '.mp3', `
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} catch {
await m.reply(`${global.error}`)
}}
handler.help = ['soundcloud'].map(v => v + ' *<url>*')
handler.tags = ['downloader']
handler.command = /^soundl|sounclouddl$/i
export default handler
async function soundcloud(link) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: "https://www.klickaud.co/download.php",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
                'value': link,
                '2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3'
            }
        }

        request(options, async function (error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            resolve({
                judul: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
                download_count: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
                thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
                link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0]
            })
        })
    })
}