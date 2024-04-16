import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*• Ingresa nombre de un Manga*\n\n*Ejemplo:*\n*${usedPrefix + command}* Oshi No Ko`, m) 
  await m.react('🕓') 
    try {
        let response = await axios.get(`https://www.lexmangas.com/?s=${text}`)
        let $ = cheerio.load(response.data)

        let resultData = $('h3.cutewp-grid-post-title a').map(function (index) {
            let title = $(this).text()
            let url = $(this).attr('href')
            return `*Nro ∙* ${index + 1}\n*Titulo ∙* ${title}\n*Url ∙* ${url}`
        }).get()

        if (resultData.length > 0) {
            let message = resultData.join('\n\n')
            await conn.reply(m.chat, `\t\t\t*乂  M A N G A  -  S E A R C H*\n\n` + message, m)
            await m.react('✅')
        } else {
            conn.reply(m.chat, 'No se encontraron resultados.', m)
        }
    } catch (error) {
        conn.reply(m.chat, `${global.error}`, m)
    }
}
handler.tags = ['search']
handler.help = ['manga *<name manga*>']
handler.command = ['mangasearch', 'mangas', 'manga', 'lexmangas']
handler.register = true
//handler.limit = 1
export default handler