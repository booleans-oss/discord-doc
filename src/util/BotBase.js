const { Client } = require("discord.js");
const BaseEvent = require('./EventBase');
require('dotenv').config()
const BaseCommand = require('./BaseCommand')
const fs = require("fs").promises
const path = require("path");
class Bot extends Client {
    constructor(options) {
        super(options);
        this.commands = new Map();
        this.events = new Map();
        this.aliases = new Map();
        this._setup()
    }
    async _setup() {
      await this.login(process.env.TOKEN_BOT);
      await this._chargementEvent(path.join(__dirname, '../events/'));
      await this._chargementCommand(path.join(__dirname, "../cmd/"));
    }
    async _chargementCommand(cmdPath) {
        const files = await fs.readdir(cmdPath);
        for (const file of files) {
          const stat = await fs.lstat(path.join(cmdPath, file));
          if (stat.isDirectory()) this._chargementCommand(path.join(cmdPath, file));
          if (file.endsWith('.js')) {
            const Command = require(path.join(cmdPath, file));
            if (Command.prototype instanceof BaseCommand) {
              const cmd = new Command();
              this.commands.set(cmd.name, cmd);
              cmd.aliases.forEach((alias) => {
                this.commands.set(alias, cmd);
              });
            }
          }
        }
    }
    async _chargementEvent(eventPath) {
        const files = await fs.readdir(eventPath);
        for (const file of files) {
            const stat = await fs.lstat(path.join(eventPath, file));
            if (stat.isDirectory()) this._chargementEvent(path.join(eventPath, file));
            if (file.endsWith('.js')) {
                const Event = require(path.join(eventPath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const event = new Event();
                    this.events.set(event.name, event);
                    this.on(event.name, event.run.bind(event, this));
                }
            }
        }
    }
    
}
module.exports = Bot;
