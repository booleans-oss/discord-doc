const BaseCommand = require('../../utils/structures/BaseCommand');
const mistakes = require('../apprentissage/assets/mistakes.json');
module.exports = class ErrorCommand extends BaseCommand {
  constructor() {
    super('error', 'apprentissage', ["err"], "Permet de reçevoir un aide sur erreur sur les argements données. \n \n **Différentes erreurs **: ```tex\n$ - undefined \n - of unedfined \n - à suivre..```", "``&error {args}`` ou ``&err {args}``", ["&err undefined", "&error of undefined"], "```yaml\n&error help``` ```yaml\n&err help```");
  }

  async run(client, message, args) {
        mistakes['errors'].forEach(object => {
            if (object.alias.includes(args.join(" ").toLowerCase())) return message.channel.send({
              embed: object.embed_structure
            })
            message.channel.send(`Aucune erreur ne convient à l'argument \`\`${args.join(" ")}\`\``);
          })
  }
}