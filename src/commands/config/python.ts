import { type ChatInputCommandInteraction, SlashCommandBuilder, type TextChannel } from "discord.js";
import { spawnProcess } from "../../core/utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName("python")
        .setDescription("Runs a python file and displays the output.")
        .addStringOption(option => option
            .setName("path")
            .setDescription("The path to the python file.")
            .setRequired(true)),
    execute(interaction: ChatInputCommandInteraction): void {
        let path = interaction.options.getString("path", true);
        interaction.reply({ content: `Running python: \`${path}\``, fetchReply: true }).catch(err => console.log(err));
        switch (path) {
            case "bonuses":
                path = "PromoBetting/BonusPromo/bonus_promo.py";
                break;
            case "nba":
                path = "PromoBetting/H2HPromo/h2h_promo.py";
                break;
            case "races":
                path = "PromoBetting/RacePromo/race_promo.py";
                break;
            default:
                // Pass.
        }
        // "C:/Users/peter/miniconda3/envs/arb/python.exe"
        spawnProcess(path, interaction.channel as TextChannel);
    }
};
