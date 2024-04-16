import fetch from "node-fetch"

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = `*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* gatitos llorando`
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	try {
	await m.react('🕓')
	 await Draw(text).then((img) => {
                conn.sendFile(m.chat, img, null, m)
            })
            await m.react('✅')
      } catch (e) {
      throw eror
   }
            
}

handler.help = ["ai-image"]
handler.tags = ["tools"]
handler.command = /^ai-image$/i
handler.limit = 1
handler.register = true 

export default handler

async function Draw(propmt) {
    const Blobs = await fetch(
  "https://api-inference.huggingface.co/models/prompthero/openjourney-v2",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({ inputs: propmt }),
  }
)
  .then((res) => res.blob())
    const arrayBuffer = await Blobs.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer
}
