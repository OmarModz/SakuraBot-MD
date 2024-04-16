import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!text) return conn.reply(m.chat, `*• Ingresa un texto del cual deseas buscar imágenes*`, m) 
  await m.react('🕓') 
  try {
    let response = await axios.get(`https://www.uhdpaper.com/search?q=${text}&by-date=true&i=0`)
    let $ = cheerio.load(response.data)

    let imageLinks = $('span img').map((index, element) => $(element).attr('src')).get()

    let randomImageLink = imageLinks[Math.floor(Math.random() * imageLinks.length)]

    if (randomImageLink) {
      let imageBuffer = await axios.get(randomImageLink, { responseType: 'arraybuffer' })
      await conn.sendFile(m.chat, Buffer.from(imageBuffer.data), 'out.png', `${global.listo}`, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: gcname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}, mentions: [m.sender]}}, { quoted: m })
    await m.react('✅')
    } else {
      conn.reply(m.chat, `${global.error}`, m)
    }
  } finally {
  }
}
handler.tags = ['img']
handler.help = ['uhdpaper *<texto>*']
handler.command = ['uhdpaper']
handler.register = true
handler.limit = 1
export default handler