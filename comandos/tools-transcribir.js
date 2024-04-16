import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `*• Ingresa un enlace YouTube y elige un idioma*\n\n*Ejemplo:*\n*${usedPrefix + command}* https://youtu.be/JyqD_zfXfi8 es\n\n*Lista de idiomas admitidos:*\n*- https://cloud.google.com/translate/docs/languages*`, m)
    }

    let youtubeUrl = args[0]
    let selectedLanguage = args[1].toLowerCase()

    await m.react('🕓')

    let apiURL = `https://api.yanzbotz.my.id/api/other/transcript?url=${youtubeUrl}`
    let response = await fetch(apiURL)
    let data = await response.json()

    if (data && data.status === 200 && data.result && data.result.subtitles) {
        let subtitles = data.result.subtitles
        let message = '*Resultados :*\n\n'

        for (let subtitle of subtitles) {
            let translationApiUrl = `https://api.lolhuman.xyz/api/translate/auto/${selectedLanguage}?apikey=${lolkeysapi}&text=${subtitle.f}`
            let translationResponse = await fetch(translationApiUrl)
            let translationData = await translationResponse.json()

            if (translationData && translationData.result && translationData.result.translated) {
                let translatedSubtitle = translationData.result.translated;
                message += `${translatedSubtitle}\n`
            }
        }

        await m.reply(message)
        await m.react('✅')
    } else {
        conn.reply(m.chat, `${global.error}`, m)
    }
}
handler.help = ['transcribir *<url yt> <idioma>*']
handler.tags = ['tools']
handler.command = ['transcribir', 'subtitles', 'subtítulos', 'subtitulos']
handler.limit = 1
handler.register = true
export default handler