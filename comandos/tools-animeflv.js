import axios from 'axios' 
import cheerio from 'cheerio' 

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
if (!args || !args[0]) return conn.reply(m.chat, `*• Ingresa en enlace de un anime de AnimeFlv*`, m)
await m.react('🕓')
  try {

    let response = await axios.get(args[0]) 
    let html = response.data 

    let $ = cheerio.load(html) 

    let title = $('.Title').text().trim() 
    let status = $('.Anm-Off').text().trim() 
    let synopsis = $('p:contains("Sinopsis:")').text().replace('Sinopsis:', '').trim() 

    let imageUrl = 'https://m.animeflv.net' + $('figure.Image img').attr('src') 

    let episodeLinks = $('.List-Episodes .Episode a').map(function() {
        return 'https://m.animeflv.net' + $(this).attr('href') 
    }).get() 

    let txt = `\t\t\t*乂  A N I M E F L V  -  S E A R C H*\n\n` 
    txt += `*Estado:* ${status}\n` 
    txt += `*Sinopsis:* ${synopsis}\n` 
    txt += '\n*Enlaces de los Capítulos:*' 
    episodeLinks.forEach((link, index) => {
    txt += `\n*Nro ∙* ${index + 1}\n`
    txt += `*Url ∙* ${link}\n` 
    }) 
    
    await conn.sendFile(m.chat, imageUrl, 'anime.jpg', txt, m) 
    await m.react('✅')

  } catch (error) {
    m.reply(`${global.error}`)
  }
}

handler.help = ['infoanimeflv *<link>*']
handler.tags = ['tools']
handler.command = ['infoanimeflv', 'animeflvinfo'] 
handler.register = true 

export default handler