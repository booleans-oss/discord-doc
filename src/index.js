require('dotenv').config()
const Bot = require("./util/BotBase");
const path = require("path");
const bot = new Bot({ partials: ['MESSAGE', 'REACTION']});
