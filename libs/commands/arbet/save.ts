import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { BotConfig } from "../../core/config.js";
import { createWriteStream } from "fs";
import { get } from "https";

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
            // Getting attachment URL.
            const fileURL = interaction.options.getAttachment("file", true).url;
            // Creating fs file stream.
            const fileStream = createWriteStream("PromoBetting/RacePromo/promo_race.csv");
            fileStream.on("finish", () => {
                fileStream.close();
                interaction.reply("Saved file to `./PromoBetting/RacePromo/promo_race.csv`").catch(err => console.log(err));
            });
            get(fileURL, (res) => {
                res.pipe(fileStream);
            }).on("error", err => console.log(err));
        }
    }
};
