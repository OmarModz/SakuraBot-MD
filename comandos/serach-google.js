import {googleIt} from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';
let handler = async (m, { conn, command, args, usedPrefix }) => {
  const fetch = (await import('node-fetch')).default;
  const text = args.join` `;
  if (!text) return conn.reply(m.chat, '*¿Que busco?*', m);
  await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }});
const url = 'https://google.com/search?q=' + encodeURIComponent(text);
google({'query': text}).then(res => {
let teks = `\t\t\t*乂  S E A R C H  -  G O O G L E*\n\n`
for (let g of res) {
teks += `*${g.title}*\n${g.link}\n${g.snippet}\n\n`
} 
conn.sendMessage(m.chat, {
text: teks,
contextInfo: { 
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/18fe5007e0e4fc5feb61a.jpg',
sourceUrl: [global.linkgc, global.linkgc2, global.linkgc3, global.linkgc4, global.linkgc5].getRandom(),
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m});
//m.reply(teks)
conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
})
}
handler.help = ['google'];
handler.tags = ['tools', 'search'];
handler.command = /^googlef?$/i;
handler.limit = 1
handler.register = true 
export default handler;