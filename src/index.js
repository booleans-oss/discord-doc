require('dotenv').config()
const Bot = require("./util/BotBase");
const bot = new Bot({ partials: ['MESSAGE', 'REACTION']});

(async () => {
    await bot.login(process.env.TOKEN_BOT);
    await bot.chargementCommand('../../cmd/');
    await bot.chargementEvent(bot);
})();
