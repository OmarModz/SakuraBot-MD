import axios from 'axios';
import cheerio from 'cheerio';

const translationMap = {
  Repository: 'Repositorio',
  Homepage: 'Página principal',
  'DownloadsWeekly Downloads': 'Descargas semanales',
  License: 'Licencia',
  'Unpacked Size': 'Tamaño',
  'Total Files': 'Archivos totales',
  'Last publish': 'Última publicación',
  Collaborators: 'Colaboradores',
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `*Formato incorrecto*\n*Ejemplo:*\n${usedPrefix + command} @tobyg74/tiktok-api-dl`
  try {
    const username = text
    const result = await npmStalk(username)
    let resultText = `*• Información de:* ${username}:\n`
    resultText += `* Lenguaje:* ${result.result.language}\n`
    resultText += `*• Dependencias:* ${result.result.dependencies}\n`
    resultText += `*• Publicado:* ${result.result.publish}\n`
    resultText += `*• Version:* ${result.result.version_count}\n`
    resultText += `*• Keywords:* ${result.result.keywords}\n`
    resultText += `*• Instalación:* ${result.result.install}\n`
    resultText += `*• Explorar:* ${result.result.explore}\n`
    resultText += `*Colaboradores:*\n`
    for (const collaborator of result.result.collaborator) {
      resultText += `*• Nombre:* ${collaborator.name}\n`
      resultText += `*• Link:* ${collaborator.url}\n`
    }
    resultText += `Información Adicional:\n`
    for (const item of result.result.info) {
      const itemType = translationMap[item.type] || item.type;
      resultText += `${itemType}: ${item.result}\n`
    }
    resultText += `*Readme:*\n${result.result.readme}\n`
    conn.reply(m.chat, resultText, m)
  } catch (error) {
    
  }
}

handler.tags = ['tools']
handler.help = ['npmstalk']
handler.command = /^(npmstalk)$/i
export default handler
const npmStalk = (username) => {
  return new Promise((resolve, reject) => {
    axios.get("https://npmjs.com/package/" + username).then(({ data }) => {
      let $ = cheerio.load(data)
      let keywords = []
      let info = []
      let collaborator = []
      $("#tabpanel-readme > div.pv4 > ul > li").each(function (a, b) {
        keywords.push($(b).text())
      })
      $("div._702d723c.dib.w-50.bb.b--black-10.pr2").each(function (a, b) {
        info.push({
          type: $(b).find("h3").text(),
          result: $(b).find("p").text() || $(b).find("a").text(),
        })
      })
      $(
        "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div.w-100 > ul > li"
      ).each(function (a, b) {
        collaborator.push({
          name: $(b).find("a").attr("href").replace("/~", ""),
          url: "https://www.npmjs.com" + $(b).find("a").attr("href"),
        })
      })
      let hasil = {
        status: "200",
        message: "Sukses",
        creator: "KrizDavidFdz",
        result: {
          title: $("#top > div.w-100.ph0-l.ph3.ph4-m > h2 > span").text(),
          language:
            $("#top > div.w-100.ph0-l.ph3.ph4-m > h2 > div").text() ||
            "Default",
          publish: $(
            "#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(4)"
          ).text(),
          readme: $("#readme").text() || "",
          explore:
            $("#package-tab-explore > span").text().replace(" Explore ", "") ||
            "",
          dependencies:
            $("#package-tab-dependencies > span")
              .text()
              .replace(" Dependencies", "") || "",
          dependents:
            $("#package-tab-dependents > span")
              .text()
              .replace(" Dependents", "") || "",
          version_count:
            $("#package-tab-versions > span").text().replace(" Versions", "") ||
            "",
          keywords: keywords || [],
          install: $(
            "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p > code > span"
          ).text(),
          info,
          collaborator,
        },
      }
      resolve(hasil)
    })
  })
}