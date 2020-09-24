const BaseCommand = require('../../util/BaseCommand');
const Doc = require('discord.js-docs');
const TurndownService = require('turndown');
module.exports = class DJSCommand extends BaseCommand {
  constructor() {
    super('djs', 'search', []);
  }

  async run(client, message, args) {
    if (!args[0]) return message.channel.send("Utilisation: ``&djs <recherche>``")
    if (args[0].startsWith("Collection")) {
      const doc = await Doc.fetch('collection');
      let data = doc.resolveEmbed(args[0]);
      var turndownService = new TurndownService()
      data.color = 16119285;
      data.description = turndownService.turndown(data.description)
      data.description = data.description.replace(/\\/g, "");
      data.author.icon_url = client.user.avatarURL()
      data.footer = {
        text: `${message.author.username} (${message.author.id})`,
        icon_url: message.author.displayAvatarURL()
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
      } else {
        data.title = `Résultat de la recherche pour \`\`${args[0]}\`\``
        data.description = data.description.split(" ").join("\n")
      }
      data = JSON.stringify(data)
      data = data.replace("<p>", " ");
      data = data.replace("</p>", " ");
      return message.channel.send({
        embed: JSON.parse(data)
      }).then(rea => {
        rea.react("712285915942486088").then(() => {
          reaction(message, rea);
        })
      })
    } else {
      const doc = await Doc.fetch('stable');
      let data = doc.resolveEmbed(args[0]);
      data.color = 16119285;
      if (!data) {
        return message.channel.send("Aucun élément de la documentation ``@discord.js`` ne correspond à votre requête ou à ses similitudes.")
      }
      if(args[1] === "-l") {
        if(data.fields) return message.channel.send(`Ceci est une requête exacte. \`\`&djs ${args[0]}\`\``);
        data.author = {
          name: `[${args[0]}]`,
          icon_url: `${client.user.avatarURL()}`
        }
        data.footer = {
          text: `${message.author.username} (${message.author.id})`,
          icon_url: `${message.author.avatarURL()}`
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
          name: `[${args[0]}]`,
          icon_url: `${client.user.avatarURL()}`
        }
        data.footer = {
          text: `${message.author.username} (${message.author.id})`,
          icon_url: `${message.author.avatarURL()}`
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
            name: `[${args[0]}]`,
            icon_url: `${client.user.avatarURL()}`
          }
          facts.footer = {
            text: `${message.author.username} (${message.author.id})`,
            icon_url: `${message.author.avatarURL()}`
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
