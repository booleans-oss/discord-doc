const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const fs = require('./assets/fs.json');
module.exports = class FSCommand extends BaseCommand {
  constructor() {
    super('fs', 'documentation', [], "Permet de faire des requêtes dans la documentation de File System (fs)", "``&fs {args}``", ["&fs readFileSync"], "```yaml\n&fs help```");
  }

  async run(client, message, args) {
    let description = "";
    if(!fs['modules'][0].methods.some(object => object.textRaw.replace(/\([^)]*\)/, " ").trim().toLowerCase().includes(args[0].toLowerCase()))) return message.channel.send("Aucune méthode ou propriété ne correspond à votre requête.") 
    let object = fs['modules'][0].methods.find(object => object.textRaw.replace(/\([^)]*\)/, " ").trim().toLowerCase().includes(args[0].toLowerCase()));
      let name = object.textRaw.replace(/\([^)]*\)/, " ").trim().toLowerCase();
      let url = object.textRaw.toLowerCase()
      let links = object.desc.match(/<a href=".*?<\/a>/g);
      links.forEach(link => {
        let data = object.desc.match(/(?<=<a href=")(.*?)(?=">)/g);
        console.log(link, data[0])
        object.desc = object.desc.replace(link, `[${link.slice(data[0].length + 11, -4)}](https://nodejs.org/api/fs.html#${data})`)
      })
        url = url.replace(/[^A-Za-z0-9]/g, "_");
        url = url.replace(/([_]+)/g, "_").slice(0, -1);
        object.desc = object.desc.replace(/<p>|<\/p>/g, "")
        object.desc = object.desc.replace(/<pre><code class="language-js">|<\/code><\/pre>/g, "```")
        object.desc = object.desc.replace(/<code>|<\/code>/g, "``")
        description += `**[fs.${object.name}()](https://nodejs.org/api/fs.html#fs${url})** \n \`\`\`js\n${object.textRaw.slice(1, -1)}\`\`\` \n ${object.desc}`
    let fs_msg = new Discord.MessageEmbed()
      .setAuthor(`[${args[0]}]`, client.user.avatarURL(), "https://nodejs.org/api/fs.html")
      .setColor(16119285)
      .setTitle('Résultat de la recherche')
      .setDescription(description)
      .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
    message.channel.send(fs_msg)
  }
}