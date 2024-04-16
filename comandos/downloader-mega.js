import { File } from 'megajs'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, { conn, args, usedPrefix, command }) => {
try {
let urlRegex = /^https:\/\/mega\.nz\/file\/[A-Za-z0-9_-]+#[A-Za-z0-9_-]+$/i
if (!args[0] || !urlRegex.test(args[0])) return m.reply(`*• Ingresa el enlace de un archivo de Mega*`)
await conn.sendMessage(m.chat, { react: { text: '🕜', key: m.key }})
const file = File.fromURL(args[0])
const [data, fileAttributes] = await Promise.all([file.downloadBuffer(), file.loadAttributes()])
const mimetype = await fileTypeFromBuffer(data)
await conn.sendMessage(m.chat, { document: data, fileName: fileAttributes.name, mimetype }, { quoted: m })
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} catch (error) {
}}
handler.help = ['mega'].map(v => v + ' *<url>*')
handler.tags = ['downloader', 'premium']
handler.command = ['megadl', 'mega']
handler.premium = true 
handler.register = true 
export default handler