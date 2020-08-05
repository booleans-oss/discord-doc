const reqEvent = (event) => require(`../event/${event}`)
 
module.exports = client => {
    client.on("ready", function() {reqEvent("ready") (client)});
    client.on("reconnecting", () => reqEvent("reconnecting") (client))
    client.on("disconnect", () => reqEvent("disconnect") (client))
    client.on("warn", reqEvent("warn"))
    client.on("error", reqEvent("error"))
}