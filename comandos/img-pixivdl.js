import { URL_REGEX } from '@whiskeysockets/baileys'
import { fileTypeFromBuffer } from 'file-type'
import { Pixiv } from '@ibaraki-douji/pixivts'
const pixiv = new Pixiv()

let handler = async (m, { conn, text }) => {
	if (!text) throw '*• Ingresa un texto junto al comando*'
	let res = await pixivDl(text)
	await m.react('🕓')
	for (let i = 0; i < res.media.length; i++) {
		let caption = i == 0 ? `*Nombre :* ${res.caption}\n*Subido por :* ${res.artist}\n*Tags* : ${res.tags.join(', ')}` : ''
		let mime = (await fileTypeFromBuffer(res.media[i])).mime 
		await conn.sendMessage(m.chat, { [mime.split('/')[0]]: res.media[i], caption, mimetype: mime }, { quoted: m })
		await m.react('✅')
	}
}
handler.help = ['pixiv *<texto>*']
handler.tags = ['downloader', 'img']
handler.command = /^(pixiv|pixivdl)$/i
handler.limit = 1
handler.register = true 
export default handler

async function pixivDl(query) {
	if (query.match(URL_REGEX)) {
		if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) throw 'Invalid Pixiv Url'
		query = query.replace(/\D/g, '')
		let res = await pixiv.getIllustByID(query).catch(() => null)
		if (!res) throw `Pencarian "${query}" Tidak Ditemukan`
		let media = []
		for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
		return {
			artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
		}
	} else {
		let res = await pixiv.getIllustsByTag(query)
		if (!res.length) throw `Pencarian "${query}" Tidak Di Temukan`
		res = res[~~(Math.random() * res.length)].id
		res = await pixiv.getIllustByID(res)
		let media = []
		for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
		return {
			artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
		}
	}
}