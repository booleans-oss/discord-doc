const BaseCommand = require('../../util/BaseCommand');
const Discord = require("discord.js");
const axios = require('axios');
const moment = require('moment')
module.exports = class NPMCommand extends BaseCommand {
  constructor() {
    super('npm', 'search', []);
}

  async run(client, message, args) {
    if(args[0] === "search") {
        let research = args.slice(1).join("+")
        let data = (await axios.get(`https://api.npms.io/v2/search/suggestions?q=${research}`)).data;
        if(data.length === 0) return message.channel.send("Il n'y a aucun package correspond à cette recherche.")
        let embed = new Discord.MessageEmbed()
        .setTitle(`<${args.join(" ")}>`)
        .setColor("#cb3837")
        .setFooter("Cliquer sur les logos (NPM & Github) pour accéder aux liens")
        data = data.filter((a, i) => i <= 15);
        data.forEach(pack => {
            let note = "";
            if(pack.score.final*100 >= 75) note = "🟢";
            if(pack.score.final*100 >= 50 && pack.score.final*100<75) note = "🟡";
            if(pack.score.final*100 >= 50 && pack.score.final*100<75) note = "🔴";
            if(pack.score.final*100 >= 25 && pack.score.final*100<50) note = "🟤";
            if(pack.score.final*100 >= 0 && pack.score.final*100<25) note = "⚫";
            embed.addField(`\`\`\`${pack.package.name}\`\`\``, `\n **${pack.package.description}**\n __Overall__: \\${note} *(\`\`${Math.floor(pack.score.final*100)}/100\`\`)* \n  > *version*: ${pack.package.version}\n>  [<:npm:741639566993260674>](${pack.package.links.npm})  \t \t [<:github:741639401884483585>](${pack.package.links.homepage})` , true)
        })
        message.channel.send(embed).catch(() => {
            message.channel.send("La liste de module est trop longue.")
        })
    } else {
        let data;
            try {
            data = (await axios.get(`https://api.npms.io/v2/package/${args[0]}`)).data;
        } catch (err) {
            return message.channel.send("Il n'y a aucun package correspond à cette recherche.")
        }
            let download = "";
            data.collected.npm.downloads.forEach(dw => {
                download += `*\`\`[${moment(dw.from).format('L')} -> ${moment(dw.to).format('L')}]\`\`*: ${dw.count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} \n`
            })
            let total = data.collected.npm.downloads.map(m => m.count).reduce((a, b) => a+b).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            let embed = new Discord.MessageEmbed()
            .setTitle(data.collected.metadata.name)
            .setURL(data.collected.metadata.links.npm)
            .setFooter("Cliquer sur les logos (NPM & Github) pour accéder aux liens")
            .setColor("#cb3837")
            .setDescription(`${data.collected.metadata.description} \n **version**: ${data.collected.metadata.version}`)
            .addField("keywords", `${data.collected.metadata.keywords.map(k => `\`\`${k}\`\``).join(" | ")}`)
            .addField("downloads", `${download}> Total: ${total}`)
            .addField("score", `> final: **${rateNumber(data.score.final)}** \n > qualité: **${rateNumber(data.score.detail.quality)}** \n > popularité: **${rateNumber(data.score.detail.popularity)}** `)
            .addField("\u200b", ` \n [<:npm:741639566993260674>](${data.collected.metadata.links.npm})  \t \t [<:github:741639401884483585>](${data.collected.metadata.links.homepage})`)
            message.channel.send(embed)
    }
    function rateNumber(number) {
        if(number*100 >= 75) return `${Math.floor(number*100)} \\🟢`
            if(number*100 >= 50 && number*100<75)return `${Math.floor(number*100)} \\🟡`;
            if(number*100 >= 50 && number*100<75)return `${Math.floor(number*100)} \\🔴`;
            if(number*100 >= 25 && number*100<50)return `${Math.floor(number*100)} \\🟤`;
            if(number*100 >= 0 && number*100<25)return `${Math.floor(number*100)} \\⚫`;
    }
    }
}
