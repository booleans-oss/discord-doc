const { Client } = require("discord.js");
const BaseEvent = require('./EventBase');
const fs = require("fs").promises
const path = require("path");
class Bot extends Client {
    constructor(options) {
        super(options);
        this.commands = new Map();
        this.events = new Map();
        this.aliases = new Map();
    }
    async chargementCommand(cmdPath) {
        const directories = await fs.readdir(cmdPath);
        directories.forEach(async (dir) => {
            const commands = await fs.readdir("./cmd/" + dir + "/");
            try {
                commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
                    const props = new(require(`${cmdPath}${dir}${path.sep}${cmd}`))(this);
                    this.commands.set(cmd.slice(0, -10).toLowerCase(), props);
                    props.help.aliases.forEach((alias) => {
                        this.aliases.set(alias.toLowerCase(), props.help.name.toLowerCase());
                    });
                });
            } catch (e) {
                console.log(e)
            }
        });
    }
    async chargementEvent(client) {
        const filePath = path.join(__dirname, '../../events');
        const files = await fs.readdir(filePath);
        for (const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if (stat.isDirectory()) this.chargementEvent(client, path.join('../../events', file));
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const event = new Event();
                    client.events.set(event.name, event);
                    client.on(event.name, event.run.bind(event, client));
                }
            }
        }
    }
}
module.exports = Bot;
