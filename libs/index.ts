import { Events } from "discord.js";
import { ThymeClient } from "./Classes/Client.js";
import { config } from "./core/config.js";

const client = new ThymeClient(config);
client.login(config.token).catch(e => console.error(e));
client.once(Events.ClientReady, () => {
    client.initialize().catch(e => console.error(e));
});
