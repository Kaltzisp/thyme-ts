import type { ChatInputCommandInteraction, Message } from "discord.js";

export default {
    name: "ping",
    alias: ["ping"],
    description: "Sends the user and client ping.",
    args: {},
    async exe(interaction: ChatInputCommandInteraction): Promise<void> {
        const msg = await interaction.reply({ content: "Ping!", fetchReply: true }).catch(err => console.log(err)) as Message;
        const myPing = Math.round(msg.createdTimestamp - interaction.createdTimestamp);
        const clientPing = interaction.client.ws.ping;
        msg.edit(`>>> Pong! Latency is ${myPing}ms. API Latency is ${clientPing}ms.`).catch(e => console.log(e));
    }
};
