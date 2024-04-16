let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Ingresa el nuevo nombre junto al comando*`
  try {
    await conn.updateProfileName(text)
    conn.reply(m.chat, 'Nombre cambiado con éxito!', m)
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['setbotname *<nombre>*']
handler.tags = ['owner']
handler.command = /^(setbotname)$/i
handler.rowner = true

export default handler