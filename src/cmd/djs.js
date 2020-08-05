const Discord = require("discord.js");
const axios = require('axios');
const Doc = require('discord.js-docs');

module.exports.run = async (client, message, args) => {

    if (args[0] === "err" || args[0] === "cs") {
      mistakes['djs'].forEach(object => {
        if (object.alias.includes(args[1].toLowerCase())) message.channel.send({
          embed: object.embed_structure
        })
      })
      return;
    }

    if (!args[1]) {
      const doc = await Doc.fetch('stable');
         let data = doc.resolveEmbed(args[0]);
        let categorie = false;
        if ('fields' in data) {
          categorie = true;
        } else {
          categorie = false;
        }
        if (categorie === false) {
          let discordjs = new Discord.MessageEmbed()
            .setAuthor(`[${args[0]}]`, client.user.avatarURL(), data.author.url)
            .setColor(16119285)
            .setTitle('Résultat de la recherche')
            .setDescription(data.description)
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())

          message.channel.send(discordjs).then(rea => {
            rea.react("712285915942486088").then(() => {
              reaction(message, rea);
            })
          })
        } else if (categorie === true) {
          var discordjs = new Discord.MessageEmbed();
          discordjs.setColor(16119285)
          axios.get(`https://djsdocs.sorta.moe/v2/search?src=stable&force=true&q=${args[0]}`).then(async function (response1) {
            let parent = response1.data[1].parent || "Objet"
            let type = response1.data[1].type || response1.data[1].internal_type;
            discordjs.setTitle(`${parent} dedans ${type}`);
            discordjs.setAuthor(`[${args[0]}]`, client.user.avatarURL(), data.author.url)
            discordjs.setDescription(data.description);
            discordjs.setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
            data.fields.forEach(async (field, index) => {
              var name = "";
              var value = "";
              if (field.name == "Methods") {
                name += "Méthode";
                value = field.value
              }
              if (field.name == "Properties") {
                name += "Propriétés";
                value = field.value
              }
              if (field.value.includes("View source")) {
                name += field.name;
                value = field.value.replace("View source", "Lien source")
              } else {
                name = field.name;
                value = field.value
              }
              discordjs.addField(name, value);
              name = "";
              value = "";
            })
            message.channel.send(discordjs).then(rea => {
                rea.react("712285915942486088").then(() => {
                  reaction(message, rea);
                })
              })
          })
        }
    } else if (args[0] === "-q" || args[1]) {
      axios.get(`https://djsdocs.sorta.moe/v2?src=stable&force=true&q=${args[1]}`).then(async function (response1) {
        let data = response1.data;
        let n_embed = "";
        let o_embed = "";
        let embed = new Discord.MessageEmbed()
          .setColor(16119285)
          .setAuthor(`[${args[1]}]`, client.user.avatarURL(), 'https://discord.js.org/#/docs/main/stable/')
          .setTitle(data.name)
          .setDescription(data.description)
          .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
        let post = "";
        let meth = "";
        data.props.forEach((value, index) => {
          if (index >= 20) return;
          if (index >= 10) {
            n_embed += `[${value}](https://discord.js.org/#/docs/main/stable/${data.internal_type}/${data.name}/?scrollTo=${value})\n `
          } else {
            post += `[${value}](https://discord.js.org/#/docs/main/stable/${data.internal_type}/${data.name}/?scrollTo=${value})\n `
          }
        })
        data.methods.forEach((value, index) => {
          if (index >= 20) return;
          if (index >= 10) {
            o_embed += `[${value}](https://discord.js.org/#/docs/main/stable/${data.internal_type}/${data.name}/?scrollTo=${value})\n `
          } else {
            meth += `[${value}](https://discord.js.org/#/docs/main/stable/${data.internal_type}/${data.name}/?scrollTo=${value})\n `
          }
        })
        embed.addField("\`\`\`Propriétés\`\`\`", post, true);
        if (n_embed !== "") {
          embed.addField("\u200b", n_embed, true);
          embed.addField("\u200b", '\u200b', true);
        }
        embed.addField("\`\`\`Méthodes\`\`\`", meth, true);
        if (o_embed !== "") {
          embed.addField("\u200b", o_embed, true);
        }
        message.channel.send(embed).then(rea => {
          rea.react("712285915942486088").then(() => {
            reaction(message, rea);
          })
        })
      }).catch(function (error) {
        axios.get(`https://djsdocs.sorta.moe/v2/search?src=stable&force=true&q=${args[1]}`).then(async function (response) {
          let obj = response.data;
          let msg = new Discord.MessageEmbed()
            .setColor(16119285)

          obj.forEach((value1, index) => {
            let props = "";
            let methods = "";
            if (value1.props && value1.methods) {
              if (value1.props) {
                value1.props.forEach(value => {
                  props += `${value} || `;
                })
              } else props = "";
              if (value1.methods) {
                value1.methods.forEach(value => {
                  methods += `${value} || `;
                })
              } else methods = "";
              msg.addField(`\u200b`, `**[${value1.name}](https://discord.js.org/#/docs/main/stable/${value1.internal_type}/${value1.name})** \n ${value1.description} \n\n **PROPRIÉTÉS** \n \`\`\`${props}\`\`\` \n **MÉTHODES** \n \`\`\`${methods}\`\`\``)
            } else if (value1.parent) {
              msg.addField(`\u200b`, `**[${value1.parent}#${value1.name}](https://discord.js.org/#/docs/main/stable/class/${value1.parent}?scrollTo=${value1.name})** \n ${value1.description} `)
            } else {
              msg.addField(`\u200b`, `**[${value1.name}](https://discord.js.org/#/docs/main/stable/${value1.internal_type}/${value1.name})** \n ${value1.description} `)
            }
          })
          message.channel.send(msg).then(rea => {
            rea.react("712285915942486088").then(() => {
              reaction(message, rea);
            })
          })

        })
      })
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
  module.exports.help = {
    name: "djs",
  }
