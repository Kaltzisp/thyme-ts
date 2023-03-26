import { type ChatInputCommandInteraction, type Message, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Sends the client and user ping."),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const msg = await interaction.reply({ content: "Ping!", fetchReply: true }).catch(err => console.log(err)) as Message;
        const myPing = Math.round(msg.createdTimestamp - interaction.createdTimestamp);
        const clientPing = interaction.client.ws.ping;
        msg.edit(`>>> Pong! Latency is ${myPing}ms. API Latency is ${clientPing}ms.`).catch(e => console.error(e));
    }
};
