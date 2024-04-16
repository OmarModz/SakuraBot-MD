let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix, args }) => {

       let tiempoEspera = 15
	    
	    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nYa has iniciado una apuesta recientemente, espera *${tiempoRestante}* para apostar nuevamente`)
    return
  }
  
  cooldowns[m.sender] = Date.now()
  
 if (!text) throw `*Miku Bot - MD* | 「 *SUERTE* 」\n\n*Cara o Cruz*\n\nElije una opción\n${usedPrefix}suerte cruz\n${usedPrefix}suerte cara\n\n usar en minúsculas`
var astro = Math.random()
if (astro < 0.50) {//34
    astro = 'cara'
} else if (astro > 0.50){//34
astro = 'cruz' 
}
if (text == astro) {
global.db.data.users[m.sender].exp += 1000
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nGanaste \n\nElegiste: ${text}\nResultado: Cara\nGanaste +1000 XP`)
} else if (text == 'cara') {
if (astro == 'cara') {
global.db.data.users[m.sender].exp += 1000
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nGanaste\n\nElegiste: ${text}\nResultado: Cara \nGanaste +1000 XP`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nPerdiste\n\nElegiste: ${text}\nResultado: Cruz\nPerdiste -300 XP`)
}
} else if (text == 'cara') {
if (astro == 'cara') {
global.db.data.users[m.sender].exp += 1000
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nGanaste\n\nElegiste: ${text}\nResultado: Cara\nGanaste +1000 XP`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nPerdiste\n\nElegiste: ${text}\nResultado: Cruz\nPerdiste -300 XP*`)
}
}else if (text == 'cruz') {
if (astro == 'cruz') {
global.db.data.users[m.sender].exp += 1000
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nGanaste\n\nElegiste: ${text}\nResultado: Cruz\nGanaste+1000 XP`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nPerdiste\n\nEleguiste ${text}\nResultado: Cara\nPerdiste -300 XP`)
}} else if (text == 'cruz') {
if (astro == 'cruz') {
global.db.data.users[m.sender].exp += 1000
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nGanaste\n\nElegiste ${text}\nResultado: Cruz\nGanaste +1000 XP`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nPerdiste\n\nElegiste: ${text}\nResultado: Cara\nPerdiste -300 XP`)
}
} else if (text == 'cara') {
if (astro == 'cara') {
global.db.data.users[m.sender].exp += 1000
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nGanaste\n\nElegiste: ${text}\nResultado: Cara\nGanaste +1000 XP`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`*Miku Bot - MD* | 「 *SUERTE* 」\n\nPerdiste\n\nElegiste: ${text}\nResultado: Cruz\nPerdiste -300 XP`)
}
}}
handler.help = ['suerte']
handler.tags = ['game']
handler.command = /^(suerte)$/i
handler.group = true 
export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}