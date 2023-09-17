import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { BotConfig } from "../../core/config.js";
import { downloadFile } from "../../core/utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName("save")
        .setDescription("Saves a CSV file in /PromoBetting/RacePromo.")
        .addAttachmentOption(option => option
            .setName("file")
            .setDescription("The file to save.")
            .setRequired(true)),
    execute(interaction: ChatInputCommandInteraction, config: BotConfig): void {
        if (config.admins.includes(interaction.member!.user.id)) {
            const attachmentUrl = interaction.options.getAttachment("file", true).url;
            const saveLocation = "PromoBetting/RacePromo/promo_race.csv";
            downloadFile(attachmentUrl, saveLocation, (statusMessage) => {
                interaction.reply(`Saved file to \`${saveLocation}\` with code: \`${statusMessage}\``).catch(err => console.log(err));
            });
        }
    }
};
