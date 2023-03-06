import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("get")
        .setDescription("Gets a file and sends it in the text channel.")
        .addStringOption(option => option
            .setName("path")
            .setDescription("The path to the file.")
            .setRequired(true)),
    execute(interaction: ChatInputCommandInteraction): void {
        const path = interaction.options.getString("path", true);
        interaction.reply({
            files: [path]
        }).catch((e) => {
            console.log(e);
        });
    }
};
