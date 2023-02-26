import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { BotConfig } from "../../config.js";

export default {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluates input on Node.js and returns the result.")
        .addStringOption(option => option.setName("expression").setDescription("The expression to evaluate.")),
    execute(interaction: ChatInputCommandInteraction, config: BotConfig): void {
        if (config.admins.includes(interaction.member!.user.id)) {
            let evalOutput = "";
            try {
                // eslint-disable-next-line no-eval
                evalOutput = eval(interaction.options.getString("expression", true)) as string;
            } catch (e) {
                if (e instanceof Error) {
                    evalOutput = e.message;
                } else {
                    evalOutput = "Unknown error.";
                }
            }
            interaction.reply(evalOutput).catch(err => console.error(err));
            console.log(evalOutput);
        }
    }
};
