module.exports = class {
    constructor(client) {
        this.client = client;
        this.name = "ready"
    }
    async run(client) {
        console.log(`[CONNECTED] ${client.user.tag}`);
    }
};
