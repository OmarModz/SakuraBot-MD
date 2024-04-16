import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
 if (!args || !args[0]) return conn.reply(m.chat, `*• Ingresa en enlace de un Anime de AnimeBlix*`, m)
  await m.react('🕓')
    try {
        let response = await axios.get(args[0])
        let $ = cheerio.load(response.data)

        let animeName = $('.animeDetail__content h1').text().trim()

        let animeDescription = $('.animeDetail__desc.mb-3').find('p').text()

        let animeImageURL = $('.animeDetail__thumb img').attr('data-src')

        let imageResponse = await axios.get(animeImageURL, { responseType: 'arraybuffer' })

        let animeDetails = $('.animeDetail__dl.fs-14')

        let detailsList = []
        animeDetails.find('dt').each((index, element) => {
            let term = $(element).text().trim()
            let definition = $(element).next('dd').text().trim()
            detailsList.push(`*${term}* ${definition}`)
        })

        let detailsMessage = detailsList.join('\n')
        
        let episodeList = $('#episodeList .list-group-item')
        let episodes = ''
        episodeList.each((index, element) => {
            let episodeNumber = $(element).find('h5').text().trim()
            let episodeURL = $(element).attr('href')
            episodes += `*Nro ∙* ${episodeNumber}\n*Url ∙* ${episodeURL}\n\n`
        })
        
        let txt = `\t\t\t*乂  A N I M E B L I X  -  I N F O*\n\n`
            txt += `*Nombre ∙* ${animeName}\n`
            txt += `*Sinopsis ∙* ${animeDescription}\n\n`
            txt += `*Info Adicional*\n`
            txt += `${detailsMessage}\n\n`
            txt += `*Episodios*\n`
            txt += `${episodes}`

        await conn.sendFile(m.chat, imageResponse.data, 'image.jpg', txt, m)
        await m.react('✅')
    } catch (error) {
        conn.reply(m.chat, `${global.error}`, m)
    }
}
handler.help = ['infoblix *<url animeblix>*']
handler.tags = ['tools']
handler.command = ['animeblixinfo', 'infoanimeblix', 'infoaniblix', 'infoblix']
handler.register = true 
export default handler