const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
module.exports = class TestingCommand extends BaseCommand {
  constructor() {
    super('info', 'lib', []);
  }

  async run(client, message, args) {
    if (args[0] === 'set') console.log(client.channels)
    let ok = new Discord.MessageEmbed()
      .setTitle("Librairie Discord.js")
      .setColor(16119285)
      .setDescription("[discord.js](https://discord.js.org/#/) est un puissant module [node.js](https://nodejs.org/) qui vous permet d'interagir très facilement avec [l'API Discord](https://discordapp.com/developers/docs/intro). Il adopte une approche beaucoup plus orientée objet que la plupart des autres bibliothèques JS Discord, ce qui rend le code de votre robot nettement plus clair et plus facile à comprendre.")
      .addField("COMMANDES", "**[djs](https://discord.js.org/#/)** ```md\n<&djs {args}>``` Retourne, si trouvées, les informations d'un élément de l'API. Dans le cas échéant, retourne la recherche des éléments semblables. \n \n **[djs -q](https://discord.js.org/#/)** ```md\n<&djs -q {args}>``` Retourne, si trouvées, les informations d'un élément et unique élément. Dans le cas échéant, retourne une liste significative, et approximative à l'argument donné. \n **[djs](https://discord.js.org/#/)** ```md\n<&djs {args}>``` Retourne, si trouvées, les informations d'un élément de l'API. Dans le cas échéant, retourne la recherche des éléments semblables. \n \n **[mdn](https://developer.mozilla.org/en-US/)** ```md\n<&mdn {args}>``` Retourne, si trouvées, le lien de l'élément dans la documentation MDN. ")
      .addField("\u200b", "**[fs](https://nodejs.org/api/fs.html)** ```md\n<&fs {args}>``` Retourne une liste de liens qui mènent à la documentation, ainsi que leurs utilisations. \n \n **[err](https://github.com/Societe1O1/APIBot/blob/master/mistakes.json)** ```md\n<&djs err {args}>``` Retourne, dans un embed des tutoriels sur les arguments donnés (*c.f. liste des tutoriels*) \n **[cs](https://github.com/Societe1O1/APIBot/blob/master/mistakes.json)** ```md\n<&djs cs {args}>``` Retourne une cheatsheet comportant les informations utiles et nécessaires à propos de l'argument (*c.f. liste des cheatsheets*)\n **[lmgt](http://letmegooglethat.com)** ```md\n<&lmgt {args}>``` Créer un lien qui expliquera comment être le plus fort. ")
      .addField("\u200b", "**[api](https://api.publicapis.org/)** ```md\n<&api categorie>``` Envoie la liste des différentes catégories d'API disponibles. \n \n **[api](https://api.publicapis.org/)** ```md\n<&api {category}}>``` Retourne une liste des différentes API disponibles pour la catégorie donnée. \n \n **[npm](http://npmjs.com)** ```md\n<&npm search {args}>``` Envoie la liste des différentes modules et packages correspondant à la requête de l'utilisateur. \n \n ```md\n<&npm {module}>``` Retourne les informations concernant le module/package souhaité.")
      .addField("LISTE DES ERREURS", "```tex\n$ - (activity, act, jeu, game, presence) \n - à suivre..```")
      .addField("LISTE DES CHEATSHEETS", "```tex\n$ - (string, str, strings, texte, text) \n  (const, let, var, variable, variables)\n - à suivre..```")
      .addField("\u200b", "\u200b")
      .addField("COURS DE JAVASCRIPT", "Ce bot est le premier bot en développement qui pourra vous apprendre le language JavaScript sur Discord. \n Pour commencer la leçon Beta (0.0.1), il vous suffit de faire ``&cours1`` et le bot vous enverra tout en MP. Activez-bien les MP!")
      .addField("\u200b", "\u200b")
      .addField("<:fail:712287744168296528> Informations (Disclaimer)", "``1.`` L'argument fourni doit être en anglais, ou dans la langue native de l'API (e.g. *&djs serveur* ne fonctionnera pas autant que *&djs guild*. \n ``2.`` Si l'argument donné, a un nombre de méthodes, ou de propriétés, supérieur à 20 *(e.g. Guild)*, le bot ne transmettra que les 20 premiers mais vous aviseras le lien de la documentation.")
    message.channel.send(ok);
  }
}
