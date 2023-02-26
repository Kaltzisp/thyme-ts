import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { BotConfig } from "../../config.js";

export default {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluates input on Node.js and returns the result.")
        .addStringOption(option => option
            .setName("expression")
            .setDescription("The expression to evaluate.")
            .setRequired(true)),
    execute(interaction: ChatInputCommandInteraction, config: BotConfig): void {
        if (config.admins.includes(interaction.member!.user.id)) {
            const evalInput = interaction.options.getString("expression", true);
            let evalOutput = "";
            try {
                // eslint-disable-next-line no-eval
                evalOutput = eval(evalInput) as string;
            } catch (e) {
                if (e instanceof Error) {
                    evalOutput = `${e.message}\n${e.stack}`;
                } else {
                    evalOutput = "Unknown error.";
                }
            }
            interaction.reply(`\`\`\`js\n${evalInput}\n\n${evalOutput}\`\`\``).catch(err => console.error(err));
            console.log(evalOutput);
        }
    }
};
