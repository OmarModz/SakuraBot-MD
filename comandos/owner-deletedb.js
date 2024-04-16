import fs from 'fs'

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {

let data = fs.readFileSync('database.json', 'utf-8')
    
let jsonData = JSON.parse(data)

for (let user in jsonData.users) {
for (let prop in jsonData.users[user]) {
delete jsonData.users[user][prop]
}}

let updatedData = JSON.stringify(jsonData, null, 2)

fs.writeFileSync('database.json', updatedData, 'utf-8')

return conn.reply(m.chat, '*Miku Bot - MD* | 「 *RESET DB* 」\n\nSe borro con el éxito el registro de usuarios de la base de datos', m)
}
handler.tags = ['owner']
handler.help = ['deletedb']
handler.command = ['resetdb']
handler.rowner = true

export default handler