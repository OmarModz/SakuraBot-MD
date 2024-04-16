import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, '*Ingresa el -Link/Url- de una página*', m)
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', '*Aqui tiene ฅ^•ﻌ•^ฅ*', m)}
handler.help = ['ss', 'ssweb'].map(v => v + ' *<url>*')
handler.tags = ['tools']
handler.command = /^ss(web)?f?$/i
handler.register = true 
handler.limit = 1
export default handler
