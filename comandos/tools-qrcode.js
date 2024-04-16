import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text }) => {

if (!text) throw `*Ingrese el texto* `
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '*Aqui tiene ฅ^•ﻌ•^ฅ*', m)
} 
handler.help = ['qrcode *<texto>*']
handler.tags = ['tools']
handler.command = ['qrcode'] 
handler.limit = 1
handler.register = true 

export default handler