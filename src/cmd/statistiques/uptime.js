const BaseCommand = require('../../utils/structures/BaseCommand');
const moment = require('moment');
moment.locale('fr')
module.exports = class LMGTFYCommand extends BaseCommand {
    constructor() {
        super('uptime', 'statistiques', [], "Permet de connaître la durée d'activité du bot.", "``&uptime`", ["&uptime"], "```yaml\n&uptime help```");
    }
    restartTime() {
        var midnight = new Date();
        midnight.setHours( 24 );
        midnight.setMinutes( 0 );
        midnight.setSeconds( 0 );
        midnight.setMilliseconds( 0 );
        let duration = midnight.getTime() - new Date().getTime();
          let seconds = Math.floor((duration / 1000) % 60);
          let minutes = Math.floor((duration / (1000 * 60)) % 60);
          let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return `_HEURES(${hours}) + _MINUTES(${minutes}) + _SECONDES(${seconds})`;
      }
    format(seconds){
        function pad(s){
          return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60*60));
        var minutes = Math.floor(seconds % (60*60) / 60);
        var seconds = Math.floor(seconds % 60);
        return `_HEURES(${pad(hours)}) + _MINUTES(${pad(minutes)}) + _SECONDES(${pad(seconds)})`;
      }
    async run(client, message, args) {
        let msg = {
            "embed": {
              "description": `\`\`\`ts\n function getUptime() { \n // UPTIME \n \t return: ${this.format(process.uptime())} \n \n function getETA() { \n // TEMPS RESTANT AVANT RESTART \n \t return: ${this.restartTime()}\`\`\``,
              "color": 16119285,
            }
          };
        message.channel.send(msg)
    }
}