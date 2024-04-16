import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//⊱ ━━━━.⋅ Añada los numeros a ser Propietario/a ⋅.━━━ ⊰  

global.owner = [
  ['51978291185'],
  ['51944114076'],
  ['51982519053'],
  ['51978291185'],
  ['51966938370'],
  ['51978291185'],
  ['51978291185'],
  ['51978291185'],
  ['51978291185']

]

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.mods = []
global.prems = []
   
//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.packname = ``
global.author = "const Sticker = () => {\n   return {\n      namebot: `Nino Nakano - MD`,\n      author: `おYᴏsᴍᴇʀ.ᴅɢ`\n   }\n}"
global.wm = 'Nino Nakano - MD'
global.igfg = 'Nino Bot - MD'
global.wait = '🐢 *Aɢᴜᴀʀᴅᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ, sᴏʏ ʟᴇɴᴛᴀ... ฅ^•ﻌ•^ฅ*'
global.botname = 'Nino Nakano - MD'
global.gcname = 'Nino Nakano - MD'
global.namebot = 'Nino Nakano - MD'
global.name = 'Nino Bot - MD'
global.error = '*Ocurrió un Error*'
global.adsticker = `Stickers By Nino Bot - MD` 
global.textbot = `Pᴏᴡᴇʀᴇᴅ Bʏ Yᴏsᴍᴇʀ.ᴅɢ`
global.listo = '*Aqui tiene ฅ^•ﻌ•^ฅ*'

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios'] // ['BrunoSobrino_2']
global.skizo = ['konekocyz']
global.lann = 'p8ADYJib'
global.kiicode = 'usU5RWzmQq'
global.itsrose = ['4b146102c4d500809da9d1ff']
global.botcahxkey = ['NDM8oaRr', 'Gi8erBvz', 'SYUTqCrg', 'DcAWSMo9']
global.botcahx = botcahxkey[Math.floor(botcahxkey.length * Math.random())]

global.APIs = {
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  can: 'https://pnggilajacn.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://pnggilajacn.my.id': 'ItsukaChan',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
}



global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
global.miniurl = fs.readFileSync('./storage/img/miniurl.jpg') 


//᭥🌿᭢━━━━━━━◜GRUPOS ◞━━━━━━━᭥🌿᭢
global.group = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.group2 = 'https://chat.whatsapp.com/JUbscwIz19iKWHDnXSNoXQ'
global.group3 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.group4 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.group5 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.group6 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.group7 = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'
global.canal1 = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'
global.canal2 = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'
global.canales = ['https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f', 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f']
global.canal = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'

global.linkgc = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.linkgc2 = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'
global.linkgc3 = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'
global.linkgc4 = 'https://whatsapp.com/channel/0029VaOPTbK1yT2CEbidNj0f'
global.linkgc5 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.linkchannel = ''

global.gclink = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink2 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink3 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink4 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink5 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'

global.gclink6 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink7 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink8 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
global.gclink9 = 'https://chat.whatsapp.com/La4sJ0SeygtJs6hexdiuV7'
//╰─────────────────────╯


global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'Nino Bot - MD\nCreated By おYᴏsᴍᴇʀ', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.estiloaudio = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "50499698072-1625305606@g.us" } : {}) }, message: { "audioMessage": { "mimetype":"audio/ogg; codecs=opus", "seconds": "99569", "ptt": "true"   }}}  


/*************************/
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})