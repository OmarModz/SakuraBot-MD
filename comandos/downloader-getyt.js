import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import axios from 'axios';

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args[0] || !args[1]) {
    throw `*Formato incorrecto*\n\n*Ejemplo:*\n${usedPrefix + command} <link> <calidad>\nEjemplo: ${usedPrefix + command} https://youtu.be/iFW6a1dAG-s 720p`;
  }

  if (!args[0].match(/youtu/gi)) {
    throw `El link es incorrecto`;
  }

  const link = args[0];
  const quality = args[1].toLowerCase();
  try {
    const yt = await getYouTubeVideo(link);
    const dl_url = await yt.video[quality].download();
    const title = await yt.title;
    const buffer = await getBuffer(dl_url);
    const bufferSize = buffer.byteLength;
    const sizeMB = (bufferSize / (1024 * 1024)).toFixed(2);
    const shortURL = await getTinyURL(link);

    const info = `❒═════❬ YTMP4 ❭═════╾❒
├‣ *Nombre* :
┴
${title}
┬
├‣ *Tamaño* : 
┴
${sizeMB}
┬
├‣ *Calidad* : 
┴
${quality}
┬
├‣ *Link* :
┴
${shortURL}
┬
❒═══════════════╾❒`;

    conn.sendFile(m.chat, yt.thumbnail, '', info, m);

    if (bufferSize <= 100 * 1024 * 1024) {
      conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: title + '.mp4', mimetype: 'video/mp4', caption: `Aquí tienes 🦈💕`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
    } else {
      if (bufferSize >= 180 * 1024 * 1024) {
        throw `El archivo supera el límite de tamaño de descarga (150 MB) y excede el límite de 180 MB como documento.`;
      }
      conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: title + '.mp4', mimetype: 'video/mp4', caption: `Aquí tienes 🦈💕`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
    }
  } catch (error) {
    
  }
};

handler.help = ['ytq *<link yt>* *<calidad>*'];
handler.tags = ['downloader'];
handler.command = ['ytq', 'getyt']
handler.limit = 2;
export default handler;

async function getYouTubeVideo(link) {
  try {
    return await youtubedl(link).catch(async () => await youtubedlv2(link));
  } catch (error) {
    return null;
  }
}

async function getTinyURL(longURL) {
  try {
    let response = await axios.get(`https://tinyurl.com/api-create.php?url=${longURL}`);
    return response.data;
  } catch (error) {
    return longURL;
  }
}

async function getBuffer(url, options) {
  try {
    options = options || {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (err) {
    return null;
  }
}