const fs = require('fs')
const verif = async function () {
    let mandatory_modules = ["discord.js", "Dotenv", "discord.js-docs", "axios", "moment", "turndown"];
    await Promise.all(mandatory_modules.map(module => { if(!isModuleInstalled(module)) throw new Error(`\x1b[33m%s\x1b[0m`, `${module} n'a pas été installé. --- `, `\x1b[0m`, `npm i ${module}`) }))
}

function isModuleInstalled(name) {
    try {
        require.resolve(name);
        return true;
    } catch(e){

    }
    return false;
}

module.exports = verif;