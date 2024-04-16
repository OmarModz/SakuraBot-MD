import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { lookup } from 'mime-types';
import { URL_REGEX } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  text = text.endsWith('SMH') ? text.replace('SMH', '') : text;
  if (!text) throw '*• Ingresa un texto o Url de yande.re junto al comando*';
  await m.react('🕓')
  let [query, page] = text.split(' ');
  let res = await getYandeImage(query, page);

  if (res === 'in_progress') {
    await conn.sendMessage(m.chat, 'Fetching image. Please wait...', 'conversation', { quoted: m });
    return;
  }

  let mime = await lookup(res);
  text.match(URL_REGEX)
    ? await conn.sendMessage(
        m.chat,
        { [mime.split('/')[0]]: { url: res }, caption: `*Aqui tiene ฅ^•ﻌ•^ฅ*` },
        { quoted: m }
      )
    : await conn.sendMessage(m.chat, { image: { url: res }, caption: `*Aqui tiene ฅ^•ﻌ•^ฅ*` }, { quoted: m });
    await m.react('✅')
};

handler.help = ['yandere *<texto/url>*']
handler.tags = ['img', 'downloader']
handler.command = /^(yandere|yande)$/i;
handler.limit = 1
handler.register = true 
export default handler;

async function getYandeImage(query, page = '') {
  if (query.match(URL_REGEX)) {
    let res = await fetch(query);
    let html = await res.text();
    let $ = cheerio.load(html);
    let image = $('img').attr('src');
    if (!image) throw 'Can\'t fetch image :/';
    return image;
  } else {
    let apiUrl = `https://yande.re/post.json?tags=${query}`;
    if (page) {
      const pageNumber = parseInt(page);
      if (!isNaN(pageNumber) && pageNumber > 0) {
        apiUrl += `&page=${pageNumber}`;
      }
    }

    // Simulating in-progress fetching
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let res = await fetch(apiUrl);
    let json = await res.json();
    if (json.length === 0) throw `Query "${query}" not found :/`;
    let data = json[~~(Math.random() * json.length)];
    if (!data) throw `Query "${query}" not found :/`;
    return data.file_url;
  }
}