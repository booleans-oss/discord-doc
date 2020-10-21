const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const axios = require('axios');
const categories = require('./assets/api_cat.json')
module.exports = class APICommand extends BaseCommand {
  constructor() {
    super('api', 'documentation', [], "Permet de voir les différentes APIs disponibles pour des utilisations diverses.", "``&api {args}`` \n \n *__Args__*: \n - **categorie**: (`&api categorie`) affiche les différentes catégories des API. \n - **{args}** (`&api args`): affiche les API disponibles pour l'argument donné.", ["&api category", "&api animal"], "```yaml\n&api help```");
  }

  async run(client, message, args) {
    if(args[0] === "categorie"){
        let description = categories.APIs.map(category => category.name);
        let data = new Discord.MessageEmbed()
        .setTitle("Liste des catégories d'API")
        .setAuthor(`API Request`, client.user.avatarURL(), "https://api.publicapis.org/")
        .setColor(16119285)
        .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
        .setDescription(description.join(" | "));
        return message.channel.send(data)
    }
        let cat;
        for(const category of categories.APIs) {
            if(category.aliases.includes(args.join(" ").toLowerCase())) cat = category.name
        }
        if(!cat) return message.channel.send("Cette catégorie n'existe pas.")
        let parse = (await axios.get(`https://api.publicapis.org/entries?category=${cat}&https=true`)).data.entries
        let data = new Discord.MessageEmbed()
        .setTitle(`APIs ${cat}`)
        .setAuthor(`[API Request`, client.user.avatarURL(), "https://api.publicapis.org/")
        .setColor(16119285)
        .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
        .setDescription(`Liste exhaustive des APIs correspondant à la recherche. \n \n Toutes les API peuvent être trouvé dans [ce repo Github](https://github.com/public-apis/public-apis)`);
        for(const api of parse) {
            let auth = api.Auth || "Aucun"
            data.addField(`\u200b`, `*\`\`\`${api.API}\`\`\`* ${api.Description} \n [${api.Link}](${api.Link}) \n __\`\`Authentifaction:\`\`__ ${auth}`, true)
        }
        data.addField("\u200b", `[*[Fichier source](https://github.com/public-apis/public-apis#${cat.toLowerCase()})*]`)
        message.channel.send(data)
}
}