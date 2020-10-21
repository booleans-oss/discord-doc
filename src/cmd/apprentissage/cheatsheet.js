const BaseCommand = require('../../utils/structures/BaseCommand');
const mistakes = require('../apprentissage/assets/mistakes.json');
module.exports = class CheatsheetCommand extends BaseCommand {
  constructor() {
    super('cheatsheet', 'apprentissage', ["cs"], "Permet de reçevoir une cheatsheet (fiche d'aide) sur les argements données. \n \n **différentes cheatsheets**: ```tex\n$ - (string, str, strings, texte, text) \n  - (activity, act, jeu, game, presence) \n - (const, let, var, variable, variables)\n - à suivre..```", "``&cheatsheet {args}`` ou ``&cs {args}``", ["&cs var", "&cheatsheet game"], "```yaml\n&cs help``` ```yaml\n&cheatsheet help```");
  }

  async run(client, message, args) {
        mistakes['djs'].forEach(object => {
            if (object.alias.includes(args[0].toLowerCase())) return message.channel.send({
              embed: object.embed_structure
            })
            message.channel.send(`Aucune cheatsheet ne convient à l'argument \`\`${args.join(" ")}\`\``);
          })
  }
}