import type { Message } from "discord.js";

export default {
    alias: "ping",
    info: "Sends the user and client ping.",
    args: [],
    async exe(msg: Message): Promise<void> {
        const m = await msg.channel.send("Ping!");
        const myPing = Math.round(m.createdTimestamp - msg.createdTimestamp);
        const clientPing = Math.round(msg.client.ws.ping);
        m.edit(`>>> Pong! Latency is ${myPing}ms. API Latency is ${clientPing}ms.`).catch(e => console.log(e));
    }
};
