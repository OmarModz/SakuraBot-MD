import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch'

const handler = {};
handler.before = async (m, { conn }) => {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let user = global.db.data.users[m.sender]
if (!user.autodlyt)
return !0
try {
const text = m.text;
if (text.match(/youtube.com|youtu.be/)) {
const videoQuery = text;
const v = videoQuery;
const q = '360p';
const yt = await (async () => {
try {
return await youtubedl(v);
} catch {
return await youtubedlv2(v);
}
})();
const dl_url = await yt.audio['128kbps'].download();
const [ttl, size] = await Promise.all([
yt.title,
yt.audio['128kbps'].fileSizeH
]);
let img = await (await fetch(`${yt.thumbnail}`)).buffer()  
let txt = `\t\t\t*乂  Y O U T U B E  -  M P 3*\n\n`
       txt += `*Titulo ∙* ${ttl}\n`
       txt += `*Calidad ∙* 128kbps\n`
       txt += `*Tamaño ∙* ${size}\n\n`
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
sourceUrl: linkchannel,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})

await conn.sendFile(m.chat, dl_url, ttl + '.mp3', `
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
user.limit -= 1
await m.reply('Utilizaste *1* 🪙')
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};
export default handler