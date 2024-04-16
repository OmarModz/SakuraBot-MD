const cooldowns = {};

let handler = async (m, { conn, isPrems }) => {
let user = global.db.data.users[m.sender]

  let tiempoEspera = 4 * 60 * 60
  
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAMinutos(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    m.reply(`Debes esperar ${tiempoRestante} antes de usar este comando nuevamente.`)
    return;
  }

  let resultado = Math.floor(Math.random() * 5000);

  cooldowns[m.sender] = Date.now();

  await m.reply(`${pickRandom(works)} *${resultado} XP*`)

  user.exp += resultado
}

function segundosAMinutos(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}

handler.help = ['work']
handler.tags = ['rpg']
handler.command = ['w','work', 'trabajar']
handler.register = true 
export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

const works = [
   "Trabajas como cortador de galletas y ganas",
   "Trabaja para una empresa militar privada, ganando",
   "Organiza un evento de cata de vinos y obtienes",
   "Limpias la chimenea y encuentras",
   "Desarrollas juegos para ganarte la vida y ganas",
   "Trabajaste en la oficina horas extras por",
   "Trabajas como secuestrador de novias y ganas",
   "Alguien vino y represent? una obra de teatro. Por mirar te dieron",
   "Compraste y vendiste art?culos y ganaste",
   "Trabajas en el restaurante de la abuela como cocinera y ganas",
   "Trabajas 10 minutos en un Pizza Hut local. Ganaste",
   "Trabajas como escritor(a) de galletas de la fortuna y ganas",
   "Revisas tu bolso y decides vender algunos art?culos in?tiles que no necesitas. Resulta que toda esa basura val?a",
   "Desarrollas juegos para ganarte la vida y ganas",
   "Trabajas todo el d?a en la empresa por",
   "Dise?aste un logo para una empresa por",
   "?Trabaj? lo mejor que pudo en una imprenta que estaba contratando y gan? su bien merecido!",
   "Trabajas como podador de arbustos y ganas",
   "Trabajas como actor de voz para Bob Esponja y te las arreglaste para ganar",
   "Estabas cultivando y Ganaste",
   "Trabajas como constructor de castillos de arena y ganas",
   "Trabajas como artista callejera y ganas",
   "?Hiciste trabajo social por una buena causa! por tu buena causa Recibiste",
   "Reparaste un tanque T-60 averiado en Afganist?n. La tripulaci?n te pag?",
   "Trabajas como ecologista de anguilas y ganas",
   "Trabajas en Disneyland como un panda disfrazado y ganas",
   "Reparas las m?quinas recreativas y recibes",
   "Hiciste algunos trabajos ocasionales en la ciudad y ganaste",
   "Limpias un poco de moho t?xico de la ventilaci?n y ganas",
   "Resolviste el misterio del brote de c?lera y el gobierno te recompens? con una suma de",
   "Trabajas como zo?logo y ganas",
   "Vendiste s?ndwiches de pescado y obtuviste",
   "Reparas las m?quinas recreativas y recibes",
]