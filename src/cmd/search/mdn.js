const Discord = require("discord.js");
const axios = require('axios');
const BaseCommand = require('../../util/BaseCommand');
module.exports = class MDNCommand extends BaseCommand {
    constructor() {
        super('mdn', 'search', []);
    }

    async run(client, message, args) {
        if (args[0] === "clear") {
            message.channel.bulkDelete(5);
            return;
        }
        let characters = [
            ["!", "%21"],
            ["\"", "%22"],
            ["#", "%23"],
            ["$", "%24"],
            ["%", "%25"],
            ["&", "%26"],
            ["'", "%27"],
            ["(", "%28"],
            [")", "%29"],
            ["*", "%2A"],
            ["+", "%2B"],
            [",", "%2C"],
            [":", "%3A"],
            ["-", "%2D"],
            [".", "%2E"],
            ["/", "%2F"]
        ];
        let argument = args.join(" ");
        var re = new RegExp(" ", "g");
        argument = (argument.replace(re, "%20"));
        axios(`https://duckduckgo.com/?q=%21%20site%3Adeveloper.mozilla.org%20${argument}`).then((data) => {
            let url = data.data.match(/(replace\()(.*?)(?=\s*;)/gi);
            var tr = url[0].slice(18, -2);
            characters.forEach((value) => {
                var re = new RegExp(value[1], "g");
                tr = (tr.replace(re, value[0]));

            })
            tr = tr.replace("en-US", "fr")
            message.channel.send(tr);
        })
            .catch((err) => {
                message.channel.send("*Argh*, l'argument n'a pas été trouvé.")
            })
    }
}
