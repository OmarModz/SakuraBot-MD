import { googleImage, pinterest } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) throw `*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix}${command}* Miku Nakano`
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    const res = await (await googleImage('wallpaper' + text)).getRandom()
  //  conn.sendFile(m.chat, res, 'error.jpg', `*Wallpaper de* ${text ? text.capitalize() : false}`, estilo)
    conn.sendFile(m.chat, res, 'out.png', `*Wallpaper* : ${text ? text.capitalize() : false}`.trim(), m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true, externalAdReply:{ showAdAttribution: false, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}, mentions: [m.sender]}}, { quoted: m })
    //conn.sendButton(m.chat,`*Nsfw Rule34* ${text ? text.capitalize() : false}`, '• Click en siguiente para ir a la siguiente imagen', res,['▷▷ SIGUIENTE', `.${command} ${text}`], fakemsg, adgp)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['wallpaper *<texto>*']
handler.tags = ['img']
handler.command = ['wallpaper', 'wallpapers', 'wp']
handler.register = true
handler.limit = 1
export default handler

/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Que fondo de pantalla busco?`
  let res = await fetch(global.API('https://wall.alphacoders.com/api2.0','/get.php', {
    auth: '3e7756c85df54b78f934a284c11abe4e',
    method: 'search',
    term: text
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)]
    
  await conn.sendFile(m.chat, img.url_image, 'wallpaper', '✅ Genial no?', m)
  
}
handler.help = ['wallpaper']
handler.tags = ['img']
handler.command = ['wallpaper', 'wallpapers', 'wp']
handler.limit = 1

export default handler*/
