/*export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
if (m.isBaileys && m.fromMe) return !0
if (m.isGroup) return !1
if (!m.message) return !0
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
if (bot.antiPrivate && !isOwner && !isROwner) {
await m.reply(`*Hola @${m.sender.split`@`[0]}, no es permitido escribir al privado del bot, así que seras bloqueado por ser un gay que no sabe usar el bot en grupo*`, false, { mentions: [m.sender] })
await this.updateBlockStatus(m.chat, 'block')}
return !1
}*/