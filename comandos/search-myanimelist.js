import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { text, command, usedPrefix }) => {
if (!text) throw m.reply(`*Formato incorrecto*\n\n*Ejemplo:*\n${usedPrefix + command} Dragon Ball Z Kai`)
try {
let result = await myanimelist(text)
if (result === 'Promise { <pending> }') {
return //m.reply('Chupapi muñaño')
}
let max = result.slice(0, 15)
let ttl = `「 M Y A N I M E - S E A R C H 」\n\n`
let txt = max.map((v, i) => {
return `*• Nombre:* ${v.title}
*• Imagen:* ${v.image}
*• Link:* ${v.link}
━━━━━━━━━━━━`.trim()
}).filter(v => v).join('\n\n')
m.reply(ttl + txt)
} catch (error) {
return m.reply('Error causa :c')
}}
handler.tags = ['search']
handler.help = ['myanimesearch']
handler.command = /^myanimesearch$/i
handler.register = true 
handler.limit = 1
export default handler

async function myanimelist(query) {
try {
const url = `https://myanimelist.net/anime.php?q=${query}`
const response = await axios.get(url)
const $ = cheerio.load(response.data)
const resultados = []
$('.list .hoverinfo_trigger').each((index, element) => {
const title = $(element).text()
const link = $(element).attr('href')
const image = $(element).find('img').attr('data-src') || ''
      resultados.push({
        title,
        link,
        image
      })
    })
    return resultados
  } catch (error) {
    console.error('Error causa :c', error)
    return 'Promise { <pending> }'
  }
}