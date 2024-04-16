import fetch from 'node-fetch';

let handler = async(m, { conn }) => {
  try {
  await m.react('🕓')
    const response = await fetch('https://nekos.life/api/v2/img/neko');
    const data = await response.json();

    const imageUrl = data.url;
    await conn.sendFile(m.chat, imageUrl, 'neko.jpg', '¡Aquí tienes una imagen de un neko aleatorio!', m);
  await m.react('✅')
  } catch (error) {
    console.log(error);
    await conn.reply(m.chat, 'Ocurrió un error al obtener la imagen del neko.', m);
  }
}

handler.command = ['neko2'];
handler.tags = ['img']
handler.help = ['neko2']
handler.limit = 1
handler.register = true 

export default handler;