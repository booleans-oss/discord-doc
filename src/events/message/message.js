const EventBase = require('../../util/EventBase');

module.exports = class MessageEvent extends EventBase {
    constructor() {
        super('message');
    }
    async run (client, message) {
        if (message.author.bot) return;
        if (message.content.startsWith(process.env.PREFIX_BOT)) {
            const args = message.content.slice(1).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd = client.commands.get(command) || client.commands.get(this.client.aliases.get(command));
            if(cmd) cmd.run(client, message, args)
        }
    }
};
