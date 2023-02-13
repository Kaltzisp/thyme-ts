import ThymeClient from "./Classes/Client.js";
import config from "./config.js";

const client = new ThymeClient(config);
client.login(process.env.BOT_TOKEN).catch(e => console.error(e));
client.on("ready", () => {
    client.initialize();
});
