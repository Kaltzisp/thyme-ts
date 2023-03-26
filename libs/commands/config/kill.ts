import { type ChatInputCommandInteraction, SlashCommandBuilder, type TextChannel } from "discord.js";
import { exec } from "child_process";

export default {
    data: new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Kills all PromoBetting processes."),
    execute(interaction: ChatInputCommandInteraction): void {
        const channel = interaction.channel as TextChannel;
        exec("pgrep -f PromoBetting", (error, stdout) => {
            if (error) {
                channel.send(`\`${error.message}\``).catch(e => console.error(e));
                return;
            }
            const pid = stdout.split("\n").slice(0, -2).join("\n");
            exec(`kill ${pid}`, (err, output) => {
                if (err) {
                    channel.send(`\`${err.message}\``).catch(e => console.error(e));
                    return;
                }
                channel.send(`Script executed with output: ${output}\``).catch(e => console.error(e));
            });
        });
    }
};
