let handler = async (m, { conn, usedPrefix, command}) => {
await conn.sendFile(m.chat, "https://tinyurl.com/2yttdygn", "out.png", listo, m)
}
handler.customPrefix = /^(Ashi ashi|ashi ashi|Ashi|ashi)$/i
handler.command = new RegExp
export default handler