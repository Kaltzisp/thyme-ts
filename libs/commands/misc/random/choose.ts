import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("choose")
        .setDescription("Chooses an option from a set of | separated choices")
        .addStringOption(option => option
            .setName("choices")
            .setDescription("Options, separated by | .")
            .setRequired(true)),
    execute(interaction: ChatInputCommandInteraction): void {
        const choices = interaction.options.getString("choices", true).split("|");
        const selection = choices[Math.floor(Math.random() * choices.length)];
        interaction.reply(`I chose: \`${selection}\``).catch(e => console.error(e));
    }
};
