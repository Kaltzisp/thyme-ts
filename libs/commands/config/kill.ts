import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";

export default {
    data: new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Kills all PromoBetting processes."),
    execute(interaction: ChatInputCommandInteraction): void {
        exec("pgrep -f PromoBetting", (error, stdout) => {
            interaction.reply("`Ending PromoBetting processes:`").catch(e => console.log(e));
            if (error) {
                interaction.followUp(`\`${error.message}\``).catch(e => console.error(e));
                return;
            }
            const pid = stdout.split("\n").slice(0, -2).join("\n");
            exec(`kill ${pid}`, (err, output) => {
                if (err) {
                    interaction.followUp(`\`${err.message}\``).catch(e => console.error(e));
                    return;
                }
                interaction.followUp(`Script executed with output: ${output}\``).catch(e => console.error(e));
            });
        });
    }
};
