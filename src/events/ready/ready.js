const EventBase = require('../../util/EventBase');

module.exports = class ReadyEvent extends EventBase {
    constructor() {
        super('ready');
    }
    async run(client) {
        console.log(`[CONNECTED] ${client.user.tag}`);
    }
};
