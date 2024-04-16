import db from '../lib/database.js'

let handler = async (m, { args }) => {
   let user = global.db.data.users[m.sender]
   if (!args[0]) return m.reply('Ingresa la cantidad de Coins 🪙 que deseas Depositar.')
   if ((args[0]) < 1) return m.reply('Ingresa una cantidad válida de Coins 🪙')
   if (args[0] == 'all') {
      let count = parseInt(user.limit)
      user.limit -= count * 1
      user.bank += count * 1
      await m.reply(`*Miku Bot - MD* | 「 *DEPOSITAR* 」\n\nDepositaste *${count}* Coins 🪙 al Banco.`)
      return !0
   }
   if (!Number(args[0])) return m.reply('La cantidad deve ser un Numero.')
   let count = parseInt(args[0])
   if (!user.limit) return m.reply('No tienes Coins 🪙 en la Cartera.')
   if (user.limit < count) return m.reply(`Solo tienes *${user.limit}* Coins 🪙 en la Cartera.`)
   user.limit -= count * 1
   user.bank += count * 1
   await m.reply(`*Miku Bot - MD* | 「 *DEPOSITAR* 」\n\nDepositaste *${count}* Coins 🪙 al Banco.`)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'dep']
handler.register = true 
export default handler 