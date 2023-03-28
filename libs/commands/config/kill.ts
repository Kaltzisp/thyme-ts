import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";

export default {
    data: new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Kills all PromoBetting processes."),
    execute(interaction: ChatInputCommandInteraction): void {
        exec("pgrep -f PromoBetting | grep -v $$ | xargs kill", (err) => {
            if (err) {
                interaction.reply("`Command failed. Are you sure there was a process running?`").catch(e => console.log(e));
            } else {
                interaction.reply("`Command executed succesfully.`").catch(e => console.log(e));
            }
        });
    }
};
