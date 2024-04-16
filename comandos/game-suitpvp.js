const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;
const handler = async (m, {conn, usedPrefix, text}) => {
  conn.suit = conn.suit ? conn.suit : {};
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw '*Termina tu partida antes de empezar otra,';
  const textquien = `Etiqueta a alguien para iniciar el *PVP*`;
  if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)});
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `*La persona a la que desafíaste se encuentra en otra partida*`;
  const id = 'suit_' + new Date() * 1;
  const caption = `\t\t\t\t*乂  G A M E   -  P V P*\n\n@${m.mentionedJid[0].split`@`[0]} te han desafíado a un *PVP* de Piedra, Papel, o Tijera\n\nResponde a este mensaje con *Aceptar* para aceptar o *Rechazar* para rechazar el *PVP*`;
  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {
text: caption,
contextInfo: { 
mentionedJid: [m.mentionedJid],
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/8853e189805a614d5b68d.jpg',
sourceUrl: [global.linkgc, global.linkgc2, global.linkgc3, global.linkgc4, global.linkgc5].getRandom(),
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: estilo}),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `Se ababo el tiempo, el *PVP* se cancela`, m);

      delete conn.suit[id];
    }, timeout), poin, poin_lose, poin_bot, timeout,
  };
};
handler.help = ['pvp *@user*'];
handler.tags = ['game'];
handler.command = /^pvp|suit(pvp)?$/i;
handler.group = true;
handler.game = true;
export default handler;