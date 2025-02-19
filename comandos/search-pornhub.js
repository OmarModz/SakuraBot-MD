import cheerio from 'cheerio';
import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) throw `*• Ingresa una categoría*`;
try {
let searchResults = await searchPornhub(args[0]);
let teks = searchResults.result.map((v, i) => 
`「 *P O R N H U B  - S E A R C H* 」
• *Título:* ${v.title}
• *Duración:* ${v.duration}
• *Link:* ${v.url}
---------------------------------------------------\n`).join('\n\n');
if (searchResults.result.length === 0) {
teks = '*Sin resultados*';
}
m.reply(teks);
} catch (e) {
}};
handler.tags = ['search']
handler.help = ['pornhubsearch']
handler.command = /^(phsearch|pornhubsearch)$/i;
handler.register = true 
handler.limit = 1
export default handler;

async function searchPornhub(search) {
try {
const response = await axios.get(`https://www.pornhub.com/video/search?search=${search}`);
const html = response.data;
const $ = cheerio.load(html);
const result = [];
$('ul#videoSearchResult > li.pcVideoListItem').each(function(a, b) {
const _title = $(b).find('a').attr('title');
const _duration = $(b).find('var.duration').text().trim();
const _views = $(b).find('var.views').text().trim();
const _url = 'https://www.pornhub.com' + $(b).find('a').attr('href');
const hasil = { title: _title, duration: _duration, views: _views, url: _url };
result.push(hasil);
});
return { result };
} catch (error) {
}}