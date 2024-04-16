import db from '../lib/database.js'

let cooldowns = {}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `
Cuanto quieres apostar? 

      *Ejemplo:*
*${usedPrefix + command}* 100`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let apuesta = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    
    let tiempoEspera = 30
	    
	    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`*Miku Bot - MD* | 「 *SLOTS* 」\n\nYa has iniciado una apuesta recientemente, espera *${tiempoRestante}* para apostar nuevamente`)
    return
  }
 
    if (apuesta > 2000) throw 'Máximo de la apuesta es *1500 XP*'
    if (users.exp < apuesta) {
        throw `Tu *XP* no es suficiente`
    }

    let emojis = ["🍎", "🍉", "🍓"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `GANASTE   *+${apuesta} XP*`
        users.exp += apuesta
    } else if (a == b || a == c || b == c) {
        end = `Casi lo logras sigue intentando :) \nTen *+10 XP*`
        users.exp += 10
    } else {
        end = `Perdiste  *-${apuesta} XP*`
        users.exp -= apuesta
    }
    cooldowns[m.sender] = Date.now()
    let name = await conn.getName(m.sender)
    let fakemsg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "17608914335-1625305606@g.us" } : {}) }, message: { "extendedTextMessage": { "text": `${end}\n• ${name}`, "title": 'Miku Bot - MD', 'jpegThumbnail': catalogo}}}
    return await conn.reply(m.chat,
        `
  🎰 | *SLOTS* 
──────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
────────── `, fakemsg) 
}
handler.help = ['slot *<apuesta>*']
handler.tags = ['game']
handler.command = ['slot']
handler.register = true
handler.group = true 
export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}