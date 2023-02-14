import type { Interaction } from "discord.js";

export default {
    name: "ping",
    alias: ["ping"],
    description: "Sends the user and client ping.",
    args: [],
    exe(interaction: Interaction): void {
        console.log(interaction);
        // const m = await msg.channel.send("Ping!");
        // const myPing = Math.round(m.createdTimestamp - msg.createdTimestamp);
        // const clientPing = Math.round(msg.client.ws.ping);
        // m.edit(`>>> Pong! Latency is ${myPing}ms. API Latency is ${clientPing}ms.`).catch(e => console.log(e));
    }
};
