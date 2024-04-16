import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime.startsWith('image/') && !mime.startsWith('video/')) {
    return m.reply('🚩 Responde a una *Imagen.*')
  }
  await m.react('🕓')

  let media = await q.download()
  let formData = new FormData()
  formData.append('image', media, { filename: 'file' })

  let api = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
    headers: {
      ...formData.getHeaders()
    }
  })

  if (api.data.data) {
  async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${api.data.data.delete_url}`)
	return await res.text()
    }
    let imageUrl = api.data.data.url
    let img = await (await fetch(`${api.data.data.url}`)).buffer()
    let txt = `*乂  I B B  -  U P L O A D E R*\n\n`
        txt += `	✩   *Titulo* : ${q.filename || 'x'}\n`
        txt += `	✩   *Id* : ${api.data.data.id}\n`
        txt += `	✩   *Enlace* : ${api.data.data.url}\n`
        txt += `	✩   *Directo* : ${api.data.data.url_viewer}\n`
        txt += `	✩   *Mime* : ${mime}\n`
        txt += `	✩   *File* : ${q.filename || 'x.jpg'}\n`
        //txt += `	✩   *Altura* : ${api.data.data.image.height} px\n`
        //txt += `	✩   *Ancho* : ${api.data.data.image.width} px\n`
        txt += `	✩   *Extension* : ${api.data.data.image.extension}\n`
        txt += `	✩   *Delete* : ${await shortUrl(api.data.data.delete_url)}\n\n`
        txt += `🚩 *${textbot}*`

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
sourceUrl: api.data.data.url,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
  } else {
  }
}
handler.tags = ['tools']
handler.help = ['ibb']
handler.command = /^(ibb)$/i
handler.register = true 
export default handler