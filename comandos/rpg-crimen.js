let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)
  
  let tiempoEspera = 4 * 60 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`*Miku Bot - MD* | 「 *CRIMEN* 」\n\nYa has cometido un Crimen recientemente, espera *${tiempoRestante}* para cometer tu próximo Crimen y evitar ser atrapado`)
    return
  }
  
  cooldowns[m.sender] = Date.now()
  
  let senderLimit = users[senderId].limit || 0

  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]

  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }

  let randomUserLimit = users[randomUserId].limit || 0

  let minAmount = 15
  let maxAmount = 50

  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
    case 0:
      users[senderId].limit = Math.min(senderLimit + amountTaken, maxAmount)
      users[randomUserId].limit = Math.max(randomUserLimit - amountTaken, 0)
      conn.sendMessage(m.chat, {
        text: `*Miku Bot - MD* | 「 *CRIMEN* 」\n\n¡Lograste cometer tu crimen con exito!, acabas de robar *${amountTaken} 🪙 Coins* a @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} 🪙 Coins* a ${senderName}.`,
        contextInfo: { 
          mentionedJid: [randomUserId],
        }
      }, { quoted: m })
      break

    case 1:
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderLimit - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].limit = Math.max(senderLimit - amountSubtracted, 0)
      conn.reply(m.chat, `*Miku Bot - MD* | 「 *CRIMEN* 」\n\nNo fuiste cuidadoso y te atraparon mientras cometias tu cirme, se restaron *-${amountSubtracted} 🪙 Coins* a ${senderName}.`, m);
      break

    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserLimit / 2 - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].limit = Math.min(senderLimit + smallAmountTaken, maxAmount)
      users[randomUserId].limit = Math.max(randomUserLimit - smallAmountTaken, 0)
      conn.sendMessage(m.chat, {
        text: `*Miku Bot - MD* | 「 *CRIMEN* 」\n\nLograste cometer tu crimen con exito, pero te descubrieron y solo lograste tomar *${smallAmountTaken} 🪙 Coins* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} 🪙 Coins* a ${senderName}.`,
        contextInfo: { 
          mentionedJid: [randomUserId],
        }
      }, { quoted: m })
      break
  }
  
  global.db.write()
}
handler.tags = ['rpg']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${horas} horas, ${minutos} minutos y ${segundosRestantes} segundos`
}

/*let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)
  let time = global.db.data.users[m.sender].lastcrime + 10800000
  if (new Date - global.db.data.users[m.sender].lastcrime < 10800000) throw `Espere *${msToTime(time - new Date())}* para volver a realizar tu próximo crimen`
  global.db.data.users[m.sender].lastcrime = new Date * 1
  let senderLimit = users[senderId].limit || 0

  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]

  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }

  let randomUserLimit = users[randomUserId].limit || 0

  let minAmount = 15
  let maxAmount = 50

  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
    case 0:
      users[senderId].limit = Math.min(senderLimit + amountTaken, maxAmount)
      users[randomUserId].limit = Math.max(randomUserLimit - amountTaken, 0)
      conn.sendMessage(m.chat, {
        text: `¡Lograste cometer tu crimen con exito!, acabas de robar *${amountTaken} 🪙 Coins* a @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} 🪙 Coins* a ${senderName}.`,
        contextInfo: { 
          mentionedJid: [randomUserId],
        }
      }, { quoted: m })
      break

    case 1:
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderLimit - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].limit = Math.max(senderLimit - amountSubtracted, 0)
      conn.reply(m.chat, `No fuiste cuidadoso y te atraparon mientras cometias tu cirme, se restaron *-${amountSubtracted} 🪙 Coins* a ${senderName}.`, m);
      break

    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserLimit / 2 - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].limit = Math.min(senderLimit + smallAmountTaken, maxAmount)
      users[randomUserId].limit = Math.max(randomUserLimit - smallAmountTaken, 0)
      conn.sendMessage(m.chat, {
        text: `Lograste cometer tu crimen con exito, pero te descubrieron y solo lograste tomar *${smallAmountTaken} 🪙 Coins* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} 🪙 Coins* a ${senderName}.`,
        contextInfo: { 
          mentionedJid: [randomUserId],
        }
      }, { quoted: m })
      break
  }
  
  global.db.write()
}
handler.tags = ['rpg']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + " minutos " + seconds + " segundos"
}*/