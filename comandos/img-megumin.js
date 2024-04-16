import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
   await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }})
   let res = await fetch('https://api.waifu.pics/sfw/megumin')
   if (!res.ok) return
   let json = await res.json()
   if (!json.url) return
   conn.sendFile(m.chat, json.url, 'out.png', `*Aqui tiene ฅ^•ﻌ•^ฅ*`.trim(), m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true, externalAdReply:{ showAdAttribution: false, title: botname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}, mentions: [m.sender]}}, { quoted: m })
//   await conn.sendFile(m.chat, json.url, 'megumin.png', '*Aqui tiene ฅ^•ﻌ•^ฅ*', estilo)
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}

handler.help = ['megumin']
handler.tags = ['img']
handler.command = ['megumin']
handler.limit = 1
handler.register = true 

export default handler