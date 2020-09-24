const BaseCommand = require('../../util/BaseCommand');
const mistakes = require('../../../assets/mistakes.json');
module.exports = class LibCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
      if(args[0] === "cs") {
        mistakes['djs'].forEach(object => {
            if (object.alias.includes(args[0].toLowerCase())) return message.channel.send({
              embed: object.embed_structure
            })
          })
      }
      if(args[0] === "err") {
        mistakes['errors'].forEach(object => {
            if (object.alias.includes(args.join(" ").toLowerCase())) return message.channel.send({
              embed: object.embed_structure
            })
          })
      }
  }
}
