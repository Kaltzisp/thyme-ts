import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";

export default {
    data: new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Kills all PromoBetting processes."),
    execute(interaction: ChatInputCommandInteraction): void {
        exec("pkill -f PromoBetting", (err, stdout, stderr) => {
            if (err) {
                interaction.reply(`\`\`\`sh\n${err.message}\`\`\``).catch(e => console.error(e));
            } else {
                interaction.reply(`\`\`\`sh\nOutput: ${stdout}\nError: ${stderr}\`\`\``).catch(e => console.error(e));
            }
        });
    }
};
