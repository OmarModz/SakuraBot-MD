import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) throw `🚫 El grupo no admite contenido nsfw \n\n Para habilitar escriba \n*${usedPrefix}enable* nsfw`
if (!text) throw `*Formato incorrecto*\n\n*Ejemplo:*\n*${usedPrefix + command}* Yuri`
try {
let search = await hentailas(text)
let cap = search.slice(1).map((v, i) =>
 `「 *H E N T A I L A  - S E A R C H* 」\n\n*• Nombre:* ${v.title}\n*• Imagen:* ${v.imagen}\n*• Link:* ${v.link}\n━━━━━━━━━━━━━━`
).join('\n')
if (search.length === 0) {
cap = '*Sin resultados*'
}
await conn.sendFile(m.chat, search[1].imagen, '', cap, m)
} catch (e) {
}}
handler.tags = ['search', 'nsfw']
handler.help = ['hentaila']
handler.command = /^hentaila$/i
export default handler
async function hentailas(buscar) {
try {
let response = await axios.get(`https://hentaila.tv/?s=${buscar}`)
let html = response.data
let $ = cheerio.load(html)
let results = []
$('h3, img, li').each((index, element) => {
let type = element.name
let content = $(element).text().trim()
let item = {}
if (type === 'h3' && content !== 'Search "Yuri"' && content !== 'Login' && content !== 'Register') { 
let tra = $(element).find('a')
let link = tra.attr('href')
if (link && link !== '#' && content !== 'Hentai' && content !== '×' && content !== 'Close') {
item = { type: 'h3', content, href: link }
results.push(item)
} else {
//results.push(item)
}} else if (type === 'img') {
let texm = $(element).attr('alt')
let link = $(element).parent().attr('href')
if (texm !== '' && link && link !== '#') {
results.push({ title: texm, link: link,
imagen: $(element).attr('src') //enlace de la imagen
})
} else if (texm === '') {
let src = $(element).attr('src')
results.push({ type: '', src })
} else {
let src = $(element).attr('src')
results.push({ type: '', src, title: texm })
}} else if (type === 'li' && !$(element).parent().is('ul')) {
results.push({ type: '', content })
}})
results.forEach(item => {
item.score = item.content ? item.content.length : 0
})
return results
} catch (error) {
return []
}}

