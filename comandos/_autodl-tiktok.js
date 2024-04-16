import axios from 'axios'

const handler = {}
handler.before = async (m, { conn }) => {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let user = global.db.data.users[m.sender]
if (!user.autodltt)
return !0
try {
if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(m.text)) {
return
}
let tiktokData = await tryServer1(m.text)
let videoURL = tiktokData.video?.noWatermark || tiktokData.video?.watermark
if (videoURL) {
await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', `*Aqui tiene ฅ^•ﻌ•^ฅ*`, m)
user.limit -= 1
await m.reply('Utilizaste *1* 🪙')
}} catch (error) {
console.error(error)
}}
export default handler
async function tryServer1(url) {
try {
let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`
let response = await axios.get(tiklydownAPI)
return response.data
} catch (error) {
console.error(error)
return {}
}}