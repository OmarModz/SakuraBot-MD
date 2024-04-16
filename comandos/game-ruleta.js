let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]
  
  let tiempoEspera = 10
  
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\nYa has iniciado una apuesta recientemente, espera *${tiempoRestante}* para apostar nuevamente`)
    return
  }
  
  cooldowns[m.sender] = Date.now()

  if (!text) {
    return m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\nDebes ingresar una cantidad de *🪙 Coins* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`)
  }

  let args = text.trim().split(" ")
  if (args.length !== 2) {
    return m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\nFormato incorrecto. Debes ingresar una cantidad de *🪙 Coins* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`)
  }

  let limit = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(limit) || limit <= 0) {
    return m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\nPor favor, ingresa una cantidad válida para la apuesta.`)
  }

  if (limit > 10) {
    return m.reply("*Miku Bot - MD* | 「 *RULETA* 」\n\nLa cantidad máxima de apuesta es de 10 *🪙 Coins*.");
  }

  if (!(color === 'black' || color === 'red')) {
    return m.reply("*Miku Bot - MD* | 「 *RULETA* 」\n\nDebes apostar a un color válido: *black* o *red*.")
  }

  if (limit > users.limit) {
    return m.reply("*Miku Bot - MD* | 「 *RULETA* 」\n\nNo tienes suficientes *🪙 Coins* para realizar esa apuesta.")
  }
  
  await m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\nApostaste ${limit} *🪙 Coins* al color ${color}. Espera 10 segundos para conocer el resultado.`)

  setTimeout(() => {
    let result = Math.random();
    let win = false;

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }
    
    if (win) {
      users.limit += limit
      m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\n¡Ganaste! Obtuviste ${limit} *🪙 Coins*. Total: ${users.limit} *🪙 Coins*.`)
    } else {
      users.limit -= limit
      m.reply(`*Miku Bot - MD* | 「 *RULETA* 」\n\nPerdiste. Se restaron ${limit} *🪙 Coins*. Total: ${users.limit} *🪙 Coins*.`);
    }

    
  }, 10000)
}
handler.tags = ['game']
handler.help =['ruleta *<cantidad> <color>*']
handler.command = ['ruleta', 'roulette']
handler.register = true
handler.group = true 
export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}

/*let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]
  let time = users.lastruleta + 10000
  if (new Date - users.lastruleta < 10000) throw `Espere *${msToTime(time - new Date())}* para volver a jugar`
  users.lastruleta = new Date * 1
  if (!text) {
    return m.reply(`Debes ingresar una cantidad de *🪙 Coins* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`)
  }

  let args = text.trim().split(" ")
  if (args.length !== 2) {
    return m.reply(`Formato incorrecto. Debes ingresar una cantidad de *🪙 Coins* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`)
  }

  let limit = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(limit) || limit <= 0) {
    return m.reply("Por favor, ingresa una cantidad válida para la apuesta.")
  }

  if (limit > 50) {
    return m.reply("La cantidad máxima de apuesta es de 50 *🪙 Coins*.");
  }

  if (!(color === 'black' || color === 'red')) {
    return m.reply("Debes apostar a un color válido: *black* o *red*.")
  }

  if (limit > users.limit) {
    return m.reply("No tienes suficientes *🪙 Coins* para realizar esa apuesta.")
  }
  
  await m.reply(`Apostaste ${limit} *🪙 Coins* al color ${color}. Espera 10 segundos para conocer el resultado.`)

  setTimeout(() => {
    let result = Math.random();
    let win = false;

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }
    
    if (win) {
      users.limit += limit * 0.5
      m.reply(`¡Ganaste! Obtuviste ${limit * 0.5} *🪙 Coins*. Total: ${users.limit} *🪙 Coins*.`)
    } else {
      users.limit -= limit
      m.reply(`Perdiste. Se restaron ${limit} *🪙 Coins*. Total: ${users.limit} *🪙 Coins*.`);
    }

    
  }, 10000)
}
handler.tags = ['game']
handler.help =['ruleta *<cantidad> <color>*']
handler.command = ['ruleta', 'roulette']
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

    return minutes + " m " + seconds + " s"
}*/