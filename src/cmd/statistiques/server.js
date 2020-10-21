const BaseCommand = require('../../utils/structures/BaseCommand');
const moment = require('moment');
moment.locale('fr')
module.exports = class ServeurCommand extends BaseCommand {
  constructor() {
    super('server', 'statistiques', ["server", "serveur"], "Permet de reçevoir les informations sur le serveur.", "``&serveur`` ou ``&server``", ["&serveur", "&server"], "```yaml\n&serveur help```");
  }

  async run(client, message, args) {
    let msg = {
      "embed": {
        "description": `\`\`\`ts\nclass _Guild { \n this.owner = { id: ${message.guild.ownerID}, pseudo: ${message.guild.owner.user.username}} \n this.roles = ${message.guild.roles.cache.size} \n this.channels = ${message.guild.channels.cache.size} \n this.members = ${message.guild.members.cache.size} \n this.createdAt = ${moment(message.guild.createdTimestamp).format('LLL')}\n}\`\`\``,
        "color": 16119285,
      }
    };
  message.channel.send(msg)
  }
}