import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { ThymeClient } from "../../../Classes/Client.js";

export default {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Joins the user's voice channel."),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        if (!interaction.inCachedGuild()) {
            return;
        }
        const client = interaction.client as ThymeClient;
        client.player(interaction.guildId)
            .joinChannel((await interaction.member.fetch(false)).voice.channelId)
            .catch(e => console.error(e));
    }
};
