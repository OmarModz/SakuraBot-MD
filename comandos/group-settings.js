let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'abrir': 'not_announcement',
        'cerrar': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*Elija una opción:*
  *${usedPrefix + command} abrir*
  *${usedPrefix + command} cerrar*
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *abrir/cerrar*']
handler.tags = ['group']
handler.command = ['group', 'grupo'] 
handler.admin = true
handler.botAdmin = true

export default handler