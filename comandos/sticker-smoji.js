
import { sticker } from '../lib/sticker.js'
import MessageType from '@whiskeysockets/baileys'
import { EmojiAPI } from 'emoji-api' 
const emoji = new EmojiAPI()

let handler = async (m, { conn, args, usedPrefix, command, isPrems }) => {
  let er = `
    *Uso del comando*
*${usedPrefix + command}* <tipo> <emoji>

    *Ejemplo:*
*${usedPrefix + command}* fa 😎

┏━⊜ *TIPOS* 
┃⋄ wha = whatsapp 
┃⋄ ap = apple
┃⋄ fa = facebook
┃⋄ ig = Instagram
┃⋄ go = google
┃⋄ ht = htc
┃⋄ mi = microsoft
┃⋄ mo = mozilla
┃⋄ op = openmoji
┃⋄ pi = pixel
┃⋄ sa = samsung
┃⋄ tw = twitter
┗━━━━━━━━━━━━⬣

Solo puede usar 1 emoji, preste atención a los espacios`
  if (!args[0]) throw er

  let template = (args[0] || '').toLowerCase()
  if (!args[1]) throw er
  if (/emo/i.test(command)) {
    try {
      switch (template) {
        case 'apple':
        case 'ip':
        case 'ap':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[6].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'facebook':
        case 'fb':
        case 'fa':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[6].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
           })
          break
        case 'google':
        case 'go':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[1].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'htc':
        case 'ht':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[12].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'lg':
        case 'ig':
        case 'instagram':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[11].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'microsoft':
        case 'mc':
        case 'mi':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[3].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'mozilla':
        case 'moz':
        case 'mo':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[13].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'openmoji':
        case 'omoji':
        case 'op':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[8].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'pixel':
        case 'pi':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[7].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'samsung':
        case 'sa':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[2].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'twitter':
        case 'tw':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
              let stiker = await sticker(false, emoji.images[5].url, global.packname, global.author)
              await conn.reply(m.chat, global.wait, fakemsg)
              conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
            })
          break
        case 'whatsapp':
        case 'wa':
        case 'wh':
        case 'wha':
          emoji.get(`${args[1]}`)
            .then(async emoji => {
            let stiker = await sticker(null, emoji.images[4].url, global.packname, global.author)
            await conn.reply(m.chat, global.wait, fakemsg)
             conn.sendFile(m.chat, stiker, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
             })
          break
      }
    } catch (e) {
      throw er
    }
  }
}
handler.help = ['semoji *<tipo>|<emoji>*']
handler.tags = ['sticker'] 
handler.command = ['emoji', 'smoji', 'semoji']
handler.limit = 1
handler.register = true 

export default handler