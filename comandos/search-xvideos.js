import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) throw `🚫 El grupo no admite contenido nsfw \n\n Para habilitar escriba \n*${usedPrefix}enable* nsfw`
  if (!text) throw `*• Ingresa una categoría*`;
try {
let json = await krizxv(text);
let cap = `\t\t\t*乂  X V I D E O S - S E A R C H*\n\n`;
for (let v of json) {
cap += `*Título* : ${v.title}
*Url* : ${v.link}
\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n
`;
}
m.reply(cap);
} catch (e) {
}};
handler.help = ['xvsearch'].map((v) => v + ' *<texto>*');
handler.tags = ['nsfw', 'search'];
handler.command = /^xvideosearch|xvsearch$/i;
handler.limit = 1
handler.register = true 
export default handler;

(function(_0x23951f,_0x2be1f2){const _0x3e7534=_0x1229,_0x5cebdd=_0x23951f();while(!![]){try{const _0x23e5d8=parseInt(_0x3e7534(0xa0))/0x1*(-parseInt(_0x3e7534(0x9d))/0x2)+-parseInt(_0x3e7534(0xa6))/0x3*(-parseInt(_0x3e7534(0xad))/0x4)+-parseInt(_0x3e7534(0xa4))/0x5*(-parseInt(_0x3e7534(0xb0))/0x6)+parseInt(_0x3e7534(0x9f))/0x7*(parseInt(_0x3e7534(0xa9))/0x8)+parseInt(_0x3e7534(0xa1))/0x9+parseInt(_0x3e7534(0xaa))/0xa*(-parseInt(_0x3e7534(0xb2))/0xb)+-parseInt(_0x3e7534(0xa8))/0xc;if(_0x23e5d8===_0x2be1f2)break;else _0x5cebdd['push'](_0x5cebdd['shift']());}catch(_0x33ccd3){_0x5cebdd['push'](_0x5cebdd['shift']());}}}(_0x417e,0x63451));function _0x1229(_0x5878e0,_0x12a3c4){const _0x417e3a=_0x417e();return _0x1229=function(_0x1229ca,_0x2358e0){_0x1229ca=_0x1229ca-0x9d;let _0x3a2a1f=_0x417e3a[_0x1229ca];return _0x3a2a1f;},_0x1229(_0x5878e0,_0x12a3c4);}function _0x417e(){const _0xd73b1=['781178BRUBut','5282685omIHxQ','find','each','665CJupOj','load','72519iWroHa','p.metadata\x20span.duration','116508sbvogF','8hujrmI','50inlZiy','div.thumb-block','attr','44daSFbi','add','get','17310HUlLJK','push','772453lmkgyw','2iRveam','p.title\x20a','2184266jDHxHb'];_0x417e=function(){return _0xd73b1;};return _0x417e();}async function krizxv(_0x3f80aa){const _0x315c6b=_0x1229,_0x54bc99='https://www.xvideos.com';try{const _0x4401f3=await axios[_0x315c6b(0xaf)](_0x54bc99+'/?k='+encodeURIComponent(_0x3f80aa)),_0x1b910e=_0x4401f3['data'],_0x3ae1ed=cheerio[_0x315c6b(0xa5)](_0x1b910e),_0x2afeb2=[],_0x4dfc10=new Set();return _0x3ae1ed(_0x315c6b(0xab))[_0x315c6b(0xa3)]((_0x59e938,_0x4f178d)=>{const _0x5eb100=_0x315c6b,_0x1604ed=_0x3ae1ed(_0x4f178d)[_0x5eb100(0xa2)](_0x5eb100(0x9e))['text'](),_0x501634=_0x3ae1ed(_0x4f178d)[_0x5eb100(0xa2)](_0x5eb100(0xa7))['text'](),_0x5698c4=_0x3ae1ed(_0x4f178d)[_0x5eb100(0xa2)](_0x5eb100(0x9e))[_0x5eb100(0xac)]('href');!_0x4dfc10['has'](_0x5698c4)&&(_0x4dfc10[_0x5eb100(0xae)](_0x5698c4),_0x2afeb2[_0x5eb100(0xb1)]({'title':_0x1604ed,'duration':_0x501634,'link':_0x54bc99+_0x5698c4}));}),_0x2afeb2;}catch(_0x2de284){throw{'code':0x1f7,'status':![],'result':_0x2de284};}}