const BaseCommand = require('../../utils/structures/BaseCommand');
const Doc = require('discord.js-docs');
const TurndownService = require('turndown');
module.exports = class DJSCommand extends BaseCommand {
  constructor() {
    super('djs', 'documentation', [], "Permet de faire des requêtes dans la documentation de Discord.js", " \n \t __Collection__: ``&djs {args} -c`` \n \t __Stable__: ``&djs {args}`` \n \t __Recherche__ ``&djs {args} -l``", ["&djs find -c", "&djs Message.author", '&djs User.avatar -l', '&djs array -c -l'], "```yaml\n&djs help```");
  }

  async run(client, message, args, flags) {
    if (!args[0]) return message.channel.send("Utilisation: ``&djs <recherche>``");
    let reg = args[0].match(/[.]/);
    if(reg && reg.length > 0) {
      args[0] = args[0].replace(/[.]/g, "#")
    };
    first = args[0];
    if (flags.includes("-c")) {
      const doc = await Doc.fetch('collection');
      let data = doc.resolveEmbed(first);
      if(flags.includes("-l")) {
        data.author = {
          name: `[${first}]`,
          icon_url: `${client.user.avatarURL()}`
        }
        return message.channel.send({
          embed: data
        })
      }
      var turndownService = new TurndownService()
      data.color = 16119285;
      data.description = turndownService.turndown(data.description)
      data.description = data.description.replace(/\\/g, "");
      data.author.icon_url = client.user.avatarURL()
      if (data.fields) {
        for (let i = 0; i < data.fields.length; i++) {
          if (["Properties", "Methods", "Params", "Returns", "Examples"].includes(data.fields[i].name)) {
            let trad = {
              properties: "Propriétés",
              methods: "Méthodes",
              params: "Paramètres",
              returns: "Retourne",
              examples: "Exemples"
            }
            data.fields[i].name = trad[data.fields[i].name.toLowerCase()]
          }
          if (data.fields[i].value.includes("[View source]")) {
            data.fields[i].value = data.fields[i].value.replace("View source", "Lien source")
          }
        }
      } else {
        let true_value = data.description.split("\n")[0];
        let query = true_value.match(/\[(.*?)\]/)[1];
        let facts = doc.resolveEmbed(query);
        data.color = 16119285;
        if (!facts) {
          return message.channel.send("Aucun élément de la documentation ``@discord.js/collection`` ne correspond à votre requête ou à ses similitudes.")
        }
        if (facts.fields) {
          for (let i = 0; i < facts.fields.length; i++) {
            if (["Properties", "Methods", "Params", "Returns", "Examples"].includes(facts.fields[i].name)) {
              let trad = {
                properties: "Propriétés",
                methods: "Méthodes",
                params: "Paramètres",
                returns: "Retourne",
                examples: "Exemples"
              }
              facts.fields[i].name = trad[facts.fields[i].name.toLowerCase()]
            }
            if (facts.fields[i].value.includes("[View source]")) {
              facts.fields[i].value = facts.fields[i].value.replace("View source", "Lien source")
            }
          }
          facts.author = {
            name: `[${first}]`,
            icon_url: `${client.user.avatarURL()}`
          }
          facts.description = turndownService.turndown(facts.description)
          facts.description = facts.description.replace(/\\/g, "");
          for(let i = 0; i < facts.fields.length; i++) {
          facts.fields[i].value = facts.fields[i].value.replace(/<p>|<\/p>/g, "")
          facts.fields[i].value = facts.fields[i].value.replace(/<code>|<\/code>/g, "```")
          }
          message.channel.send({
            embed: facts
          }).then(rea => {
            rea.react("712285915942486088").then(() => {
              reaction(message, rea);
            })
          })
        }
      }
    } else {
      const doc = await Doc.fetch('stable');
      let data = doc.resolveEmbed(first);
      data.color = 16119285;
      if (!data) {
        return message.channel.send("Aucun élément de la documentation ``@discord.js`` ne correspond à votre requête ou à ses similitudes.")
      }
      if(flags.includes("-l")) {
        console.log("duh")
        data.author = {
          name: `[${first}]`,
          icon_url: `${client.user.avatarURL()}`
        }
        return message.channel.send({
          embed: data
        })
      }
      if (data.fields) {
        for (let i = 0; i < data.fields.length; i++) {
          if (["Properties", "Methods", "Params", "Returns", "Examples"].includes(data.fields[i].name)) {
            let trad = {
              properties: "Propriétés",
              methods: "Méthodes",
              params: "Paramètres",
              returns: "Retourne",
              examples: "Exemples"
            }
            data.fields[i].name = trad[data.fields[i].name.toLowerCase()]
          }
          if (data.fields[i].value.includes("[View source]")) {
            data.fields[i].value = data.fields[i].value.replace("View source", "Lien source")
          }
        }
        data.author = {
          name: `[${first}]`,
          icon_url: `${client.user.avatarURL()}`
        }
        message.channel.send({
          embed: data
        }).then(rea => {
          rea.react("712285915942486088").then(() => {
            reaction(message, rea);
          })
        })
      } else {
        let true_value = data.description.split("\n")[0];
        let query = true_value.match(/\[(.*?)\]/)[1];
        let facts = doc.resolveEmbed(query);
        data.color = 16119285;
        if (!facts) {
          return message.channel.send("Aucun élément de la documentation ``@discord.js`` ne correspond à votre requête ou à ses similitudes.")
        }
        if (facts.fields) {
          for (let i = 0; i < facts.fields.length; i++) {
            if (["Properties", "Methods", "Params", "Returns", "Examples"].includes(facts.fields[i].name)) {
              let trad = {
                properties: "Propriétés",
                methods: "Méthodes",
                params: "Paramètres",
                returns: "Retourne",
                examples: "Exemples"
              }
              facts.fields[i].name = trad[facts.fields[i].name.toLowerCase()]
            }
            if (facts.fields[i].value.includes("[View source]")) {
              facts.fields[i].value = facts.fields[i].value.replace("View source", "Lien source")
            }
          }
          facts.author = {
            name: `[${first}]`,
            icon_url: `${client.user.avatarURL()}`
          }
          message.channel.send({
            embed: facts
          }).then(rea => {
            rea.react("712285915942486088").then(() => {
              reaction(message, rea);
            })
          })
        }
      }
    }
    async function reaction(message, msg) {
      const reactionFilter = (reaction, user) => ["712285915942486088"].includes(reaction.emoji.id) && !user.bot && user.id === message.author.id;
      const reactions = await msg.awaitReactions(reactionFilter, {
        max: 1,
        time: 172800000
      });
      const choice = reactions.get("712285915942486088");
      if (choice.emoji.id === "712285915942486088") {
        msg.delete();
      }
    }
  }
}
