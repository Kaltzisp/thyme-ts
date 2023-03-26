import { type ChatInputCommandInteraction, SlashCommandBuilder, type TextChannel } from "discord.js";
import { spawn } from "child_process";

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
            case "nba":
                path = "PromoBetting/H2HPromo/h2h_promo.py";
                break;
            default:
                // Pass.
        }
        // "C:/Users/peter/miniconda3/envs/arb/python.exe"
        const pythonProcess = spawn(process.env.CONDA_PATH!, [path]);
        const channel = interaction.channel as TextChannel;
        pythonProcess.stdout.on("data", (data) => {
            channel.send(`\`\`\`py\n${data}\n\`\`\``).catch(e => console.log(e));
        });
        pythonProcess.stderr.on("data", (error) => {
            channel.send(`\`\`\`py\n${error}\n\`\`\``).catch(e => console.log(e));
        });
    }
};
