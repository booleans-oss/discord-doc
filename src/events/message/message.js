const EventBase = require('../../util/EventBase');
const categories = {
  "apprentissage": "Cette catégorie contient les commandes qui vont vous permettre d'apprendre le JavaScript mais aussi d'en savoir plus sur Discord.js",
  "documentation": "Cette catégorie contient les commandes qui vont vous permettre de faire requête aux différentes documentations disponibles dans cette version du bot.",
  "statistiques": "Cette catégorie contient les commandes utiles pour afficher les informations diverses du bot."
}
module.exports = class MessageEvent extends EventBase {
  constructor() {
    super('message');
  }
  async run(client, message) {
    if (message.author.bot) return;
    if (message.content.startsWith(process.env.PREFIX_BOT)) {
      let args = message.content.slice(1).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      if (["apprentissage", "statistiques", "documentation"].includes(command) && args[0] === "help") {
        let msg = {
          "embed": {
            "title": command[0].toUpperCase() + command.slice(1),
            "description": categories[command],
            "color": 16119285,
            "footer": {
              "icon_url": message.author.displayAvatarURL(),
              "text": "Discord.js"
            },
            "thumbnail": {
              "url": client.user.displayAvatarURL()
            },
            "fields": []
          }
        };
        client.categories.get(command).forEach(command => {
          msg.embed.fields.push({
            name: command.name,
            value: `${command.help} \n \n ${command.help_command}`,
            inline: true
          })
        });
        message.channel.send(msg)
      }
      const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
      if (cmd) {
        if (args[0] && args[0] === "help") {
          let examples = ""
          cmd.examples.forEach(example => {
            examples += `\`\`\`yaml\n${example}\`\`\``;
          })
          let msg = {
            "embed": {
              "title": `Help ${cmd.name}`,
              "description": `**Catégorie**: ${cmd.category} \n **Help**: ${cmd.help} \n **Usage**: ${cmd.usage}`,
              "color": 16119285,
              "footer": {
                "icon_url": message.author.displayAvatarURL(),
                "text": cmd.name
              },
              fields: [{
                "name": "Exemples",
                "value": examples
              }]
            }
          }
          return message.channel.send(msg)
        }
        let flags = args.filter(arg => arg.startsWith("-"))
        args = args.filter(arg => !arg.startsWith("-"))
        cmd.run(client, message, args, flags);
      }
    }
  }
};