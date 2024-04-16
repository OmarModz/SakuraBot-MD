let handler = async (m, { conn }) => {
let txt = ''
for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) txt += `\n╭─「 *${await conn.getName(jid)}* 」\n║❥  ${jid}\n║❥ [${chat?.metadata?.read_only ? 'Abandonado': 'Unido'}]\n╰────\n\n`
m.reply(`*Lista de grupos en los que esta el bot:*
${txt}
`.trim())
}
handler.help = ['grouplist']
handler.tags = ['main']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos)$/i
export default handler
