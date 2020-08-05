const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

require("./util/eventHandler")(client)
client.commands = new Discord.Collection();

client.login(token);

fs.readdir("./cmd/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) return

    jsfile.forEach((f, i) => {
        let props = require(`./cmd/${f}`);
        client.commands.set(props.help.name, props)
    })
})
client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(!message.content.startsWith("!")) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = client.commands.get(command.slice(1));
    if(commandFile) {
        message.delete();
        commandFile.run(client, message, args)
    }

});
