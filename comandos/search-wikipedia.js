import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
async function wikipedia(querry) {
try {
const link = await axios.get(`https://es.wikipedia.org/wiki/${querry}`)
const $ = cheerio.load(link.data)
let judul = $('#firstHeading').text().trim()
let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
let isi = []
$('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
let penjelasan = $(Ra).find('p').text().trim() 
isi.push(penjelasan)})
for (let i of isi) {
const data = {
status: link.status,
result: {
judul: judul,
thumb: 'https:' + thumb,
isi: i}}
return data}
} catch (err) {
var notFond = {
status: link.status,
Pesan: eror}
return notFond}}
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*• Ingresα un texto que deseα buscαr*\n\nEjemplo: *${usedPrefix + command}* Estrellαs`
await conn.sendMessage(m.chat, { react: { text: '🔎', key: m.key }})
wikipedia(`${text}`).then(res => {
let str = `*Resultαdos de∙* \n\n` + res.result.isi
conn.sendMessage(m.chat, {
text: str,
contextInfo: {
externalAdReply: {
title: botname,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/1ddfcd516dd8fa0b1c0b5.jpg',
sourceUrl: [global.linkgc, global.linkgc2, global.linkgc3, global.linkgc4, global.linkgc5].getRandom(),
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}).catch(() => { m.reply('*Miku Bot😺* | 「 *ERROR* 」\n\nOcurrió un *Error*') })}
handler.help = ['wikipedia']
handler.tags = ['search']
handler.command = /^(wiki|wikipedia)$/i
export default handler
