const handler = (m) => m;
handler.before = async function(m) {
  this.suit = this.suit ? this.suit : {};
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;
  const room = Object.values(this.suit).find((room) => room.id && room.status && [room.p, room.p2].includes(m.sender));
  if (room) {
    let win = '';
    let tie = false;
    if (m.sender == room.p2 && /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
      if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
        const textno = `*@${room.p2.split`@`[0]}* tuvo miedo y rechazo el *PVP*`;
        m.reply(textno, null, {mentions: this.parseMention(textno)});
        delete this.suit[room.id];
        return !0;
      }
      room.status = 'play';
      room.asal = m.chat;
      clearTimeout(room.waktu);
      const textplay = `\t\t\t*乂  G A M E   -  P V P*\n\nEl *PVP* ha iniciado, las opciones serán enviadas a sus chats\n`;
      m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)});
      const comienzop = `Por favor selecciona una opción
     
*Opciones Disponibles:* 
- piedra
- papel
- tijera

*Recompensa:* 

- Ganador *+${room.poin}XP*
- Perdedor *${room.poin_lose}XP*
`;
      const comienzop2 = `Por favor selecciona una opción
     
*Opciones Disponibles:* 
- piedra
- papel
- tijera

*Recompensa:* 

- Ganador *+${room.poin}XP*
- Perdedor *${room.poin_lose}XP*`;

      if (!room.pilih) this.sendMessage(room.p, {text: comienzop}, {quoted: m});
      if (!room.pilih2) this.sendMessage(room.p2, {text: comienzop2}, {quoted: m});
      room.waktu_milih = setTimeout(() => {
        const iniciativa = `Ninguno de los jugadores tomo la iniciativa, se cancela el *PVP*`;
        if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, {text: iniciativa}, {quoted: m});
        else if (!room.pilih || !room.pilih2) {
          win = !room.pilih ? room.p2 : room.p;
          const textnull = `@${(room.pilih ? room.p2 : room.p).split`@`[0]} no eligió ninguna opción, fin del *PVP*`;
          this.sendMessage(m.chat, {text: textnull}, {quoted: m}, {mentions: this.parseMention(textnull)});
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin;
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot;
          db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose;
        }
        delete this.suit[room.id];
        return !0;
      }, room.timeout);
    }
    const jwb = m.sender == room.p;
    const jwb2 = m.sender == room.p2;
    const g = /tijera/i;
    const b = /piedra/i;
    const k = /papel/i;
    const reg = /^(tijera|piedra|papel)/i;
    if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
      room.pilih = reg.exec(m.text.toLowerCase())[0];
      room.text = m.text;
      m.reply(`✔ haz seleccionado *${m.text}*, regresa al grupo y ${room.pilih2 ? `revisa los resultados` : 'espera los resultados'}`);
      if (!room.pilih2) this.reply(room.p2, 'El oponente ha seleccionado, es tu turno', 0);
    }
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
      room.pilih2 = reg.exec(m.text.toLowerCase())[0];
      room.text2 = m.text;
      m.reply(` haz seleccionado *${m.text}*, regresa al grupo y ${room.pilih ? `revisa los resultados` : 'espera los resultados'}`);
      if (!room.pilih) this.reply(room.p, 'El oponente ha seleccionado, es tu turno', 0);
    }
    const stage = room.pilih;
    const stage2 = room.pilih2;
    if (room.pilih && room.pilih2) {
      clearTimeout(room.waktu_milih);
      if (b.test(stage) && g.test(stage2)) win = room.p;
      else if (b.test(stage) && k.test(stage2)) win = room.p2;
      else if (g.test(stage) && k.test(stage2)) win = room.p;
      else if (g.test(stage) && b.test(stage2)) win = room.p2;
      else if (k.test(stage) && b.test(stage2)) win = room.p;
      else if (k.test(stage) && g.test(stage2)) win = room.p2;
      else if (stage == stage2) tie = true;
      this.reply(room.asal, `Resultados del *PVP* ${tie ? '\n*EMPATE!!*' : ''}
*@${room.p.split`@`[0]} (${room.text})* ${tie ? '' : room.p == win ? ` *GANO 🥳 +${room.poin}XP*` : ` *PERDIÓ 🤡 ${room.poin_lose}XP*`}
*@${room.p2.split`@`[0]} (${room.text2})* ${tie ? '' : room.p2 == win ? ` *GANO 🥳 +${room.poin}XP*` : ` *PERDIÓ 🤡 ${room.poin_lose}XP*`}
`.trim(), m, {mentions: [room.p, room.p2]} );
      if (!tie) {
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin;
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot;
        db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose;
      }
      delete this.suit[room.id];
    }
  }
  return !0;
};
handler.exp = 0;
export default handler;
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
