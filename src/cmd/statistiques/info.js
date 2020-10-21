const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super('info', 'statistiques', ["info", "help"], "Permet de voir les différentes commandes disponibles ainsi que les catégories.", "``&help`` ou ``&info``", ["&info", "&help"], "```yaml\n&info help```");
  }

  async run(client, message, args) {
    let msg = {
      "embed": {
        "title": "Commandes",
        "description": "``&{command} help`` pour avoir plus d'informations sur une commande. \n ``&{categorie} help`` pour avoir plus d'informations sur une catégorie.",
        "color": 16119285,
        "footer": {
          "icon_url": message.author.displayAvatarURL(),
          "text": "Discord.js"
        },
        "thumbnail": {
          "url": client.user.displayAvatarURL()
        },
        "fields": [{
            "name": "Documentation",
            "value": "``djs `` ``npm`` ``fs`` ``mdn`` ``api``",
            "inline": true
          },
          {
            "name": "Apprentissage",
            "value": "``error`` ``cheatsheet`` ``cours1``",
            "inline": true
          },
          {
            "name": "Statistiques",
            "value": "``info`` ``server`` ``uptime`` ``addbot``",
            "inline": true
          }
        ]
      }
    };
    message.channel.send(msg)
  }
}