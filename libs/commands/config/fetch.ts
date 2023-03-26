import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("fetch")
        .setDescription("Fetches a file and sends it in the text channel.")
        .addStringOption(option => option
            .setName("path")
            .setDescription("The path to the file.")
            .setRequired(true)),
    execute(interaction: ChatInputCommandInteraction): void {
        const path = interaction.options.getString("path", true);
        interaction.reply({
            content: `Fetched file from \`${path}\``,
            files: [path]
        }).catch((e) => {
            console.error(e);
            interaction.reply(`Failed to fetch file from \`${path}\``).catch(err => console.log(err));
        });
    }
};
