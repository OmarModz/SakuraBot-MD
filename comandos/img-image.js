import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Ingresa que imagen deseas buscar en Google.`
const prohibited = ['caca', 'polla', 'porno', 'porn', 'gore', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito','pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cogiendo', 'cepesito', 'hot', 'buceta', 'xxx']
if (prohibited.some(word => m.text.toLowerCase().includes(word))) return m.reply('Deja de buscar eso puto enfermo de mierda, que por eso no tienes novia')
await m.react('🕓')
let res = await googleImage(text)
conn.sendFile(m.chat, res.getRandom(), 'out.png', `*Resultado de* : ${text}`.trim(), m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true, externalAdReply:{ showAdAttribution: false, title: gcname, body: `h`, mediaType: 2, sourceUrl: group, thumbnail: miniurl}, mentions: [m.sender]}}, { quoted: m })
await m.react('✅')
}
handler.help = ['imagen *<texto>*']
handler.tags = ['search']
handler.command = ['img', 'image', 'imagen'] 
handler.limit = 1
handler.register = true 

export default handler


/*import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*¿Que imagen busco?*`
    const res = await googleImage(text)
    await conn.sendMessage(m.chat, { react: { text: '🔎', key: m.key }})
 
conn.sendButton(m.chat, `Resultado de: *${text}*`, '• Click en siguiente para ir a la siguiente imagen', res.getRandom(), [['▷▷ SIGUIENTE', `${usedPrefix + command} ${text}`]], fakemsg, adgp )
}
handler.help = ['imagen *<texto>*']
handler.tags = ['img', 'search']
handler.command = ['img', 'image', 'imagen'] 
handler.limit = 1
handler.register = true 

export default handler*/