const Discord = require("discord.js");
const BaseCommand = require('../../util/BaseCommand');
const fs = require('../../../assets/fs.json');

module.exports = class FSCommand extends BaseCommand {
    constructor() {
        super('fs', 'search', []);
    }

    async run(client, message, args) {

        let description = "";
        fs['modules'][0].methods.forEach(object => {
            let name = object.textRaw.replace(/\([^)]*\)/, " ").toLowerCase();
            let url = object.textRaw.toLowerCase()
            if (name.includes(args[0].toLowerCase())) {
                url = url.replace(/[^A-Za-z0-9]/g, "_");
                url = url.replace(/([_]+)/g, "_").slice(0, -1);
                description += `**[fs.${object.name}()](https://nodejs.org/api/fs.html#fs${url})** \n \`\`\`js\n${object.textRaw.slice(1, -1)}\`\`\` \n`
            }
        })
        let fs_msg = new Discord.MessageEmbed()
            .setAuthor(`[${args[0]}]`, client.user.avatarURL(), "https://nodejs.org/api/fs.html")
            .setColor(16119285)
            .setTitle('Résultat de la recherche')
            .setDescription(description)
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
        message.channel.send(fs_msg)
    }
}
