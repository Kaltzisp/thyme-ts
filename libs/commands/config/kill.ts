import { type ChatInputCommandInteraction, SlashCommandBuilder, type TextChannel } from "discord.js";
import { exec } from "child_process";

export default {
    data: new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Kills all PromoBetting processes."),
    execute(interaction: ChatInputCommandInteraction): void {
        exec("pkill -f PromoBetting", (err, stdout, stderr) => {
            if (err) {
                console.error(err);
            } else {
                const channel = interaction.channel as TextChannel;
                channel.send(`\`\`\`sh\nOutput: ${stdout}\nError: ${stderr}\n\`\`\``).catch(e => console.error(e));
            }
        });
    }
};
