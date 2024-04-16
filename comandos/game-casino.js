import db from '../lib/database.js'

let buatall = 1
let cooldowns = {}

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
	let user = global.db.data.users[m.sender]
        let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
        let randomkamu = `${Math.floor(Math.random() * 55)}`.trim()
        let Aku = (randomaku * 1)
        let Kamu = (randomkamu * 1)
        let count = args[0]
		let who = m.fromMe ? conn.user.jid : m.sender
	    let username = conn.getName(who)
	    
	    let tiempoEspera = 15
	    
	    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`*Miku Bot - MD* | 「 *CASINO* 」\n\nYa has iniciado una apuesta recientemente, espera *${tiempoRestante}* para apostar nuevamente`)
    return
  }
  
  cooldowns[m.sender] = Date.now()
	    
        count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        count = Math.max(1, count)
        if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'apostar <cantidad>\n ' + usedPrefix + 'apostar 1000', m)
        if (count > 1000) return conn.reply(m.chat, 'El máximo de la apuesta es *1000 XP*', m)
 
        if (user.exp >= count * 1) {
            user.exp -= count * 1
            if (Aku > Kamu) {
                conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\nVeamos que numeros tienen!\n*Miku* : ${Aku}\n*${username}* : ${Kamu}\n\n ${username}, *PERDISTE* ${count} XP`.trim(), m)
            } else if (Aku < Kamu) {
                user.exp += count * 2
                conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\nVeamos que numeros tienen!\n*Miku* : ${Aku}\n*${username}* : ${Kamu}\n\nBien! ${username}, *GANASTE!* ${count * 2} XP`.trim(), m)
            } else {
                user.exp += count * 1
                conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\nVeamos que numeros tienen!\n*Miku* : ${Aku}\n*${username}* : ${Kamu}\n\n *EMPATE*, ${username} obtienes ${count * 1} XP`.trim(), m)
            }
        } else conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\n${username}, no tienes ${count} XP para apostar!`.trim(), m)
    
}
    
handler.help = ['apostar *<cantidad>*']
handler.tags = ['game']
handler.command = /^(apostar|casino)$/i
handler.register = true

handler.fail = null

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}

/*import db from '../lib/database.js'

let buatall = 1
//let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
	let user = global.db.data.users[m.sender]
        let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
        let randomkamu = `${Math.floor(Math.random() * 55)}`.trim() //hehe Biar Susah Menang :v
        let Aku = (randomaku * 1)
        let Kamu = (randomkamu * 1)
        let count = args[0]
		let who = m.fromMe ? conn.user.jid : m.sender
	    let username = conn.getName(who)
	    let time = global.db.data.users[m.sender].lastcas + 15000
  if (new Date - global.db.data.users[m.sender].lastcas < 15000) throw `Espera *${msToTime(time - new Date())}* para regresar al casino`
  global.db.data.users[m.sender].lastcas = new Date * 1
        count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        count = Math.max(1, count)
        if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'apostar <cantidad>\n ' + usedPrefix + 'apostar 1000', m)
        if (count > 1000) return conn.reply(m.chat, 'El máximo de la apuesta es *1000 XP*', m)
  //     if (args.length > 1000) return 'Máximo de la apuesta es *500 XP*'
        if (user.exp >= count * 1) {
            user.exp -= count * 1
            if (Aku > Kamu) {
                conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\nVeamos que numeros tienen!\n*Miku* : ${Aku}\n*${username}* : ${Kamu}\n\n ${username}, *PERDISTE* ${count} XP`.trim(), m)
            } else if (Aku < Kamu) {
                user.exp += count * 2
                conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\nVeamos que numeros tienen!\n*Miku* : ${Aku}\n*${username}* : ${Kamu}\n\nBien! ${username}, *GANASTE!* ${count * 2} XP`.trim(), m)
            } else {
                user.exp += count * 1
                conn.reply(m.chat, `*Miku Bot - Md* | 「 *CASINO* 」\n\nVeamos que numeros tienen!\n*Miku* : ${Aku}\n*${username}* : ${Kamu}\n\n *EMPATE*, ${username} obtienes ${count * 1} XP`.trim(), m)
            }
        } else conn.reply(m.chat, `*Miku Bot - MD* | 「 *CASINO* 」\n\n${username}, no tienes ${count} XP para apostar!`.trim(), m)
    
}
    
handler.help = ['apostar *<cantidad>*']
handler.tags = ['game']
handler.command = /^(apostar|casino)$/i
handler.register = true

handler.fail = null

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  seconds = (seconds < 10) ? "0" + seconds : seconds

  return seconds + " segundo(s)" 
}*/