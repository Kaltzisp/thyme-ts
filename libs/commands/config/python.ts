import { type ChatInputCommandInteraction, type Message, SlashCommandBuilder } from "discord.js";
import { spawn } from "child_process";

export default {
    data: new SlashCommandBuilder()
        .setName("python")
        .setDescription("Runs a python file and displays the output.")
        .addStringOption(option => option
            .setName("path")
            .setDescription("The path to the python file.")
            .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const msg = await interaction.reply({ content: "Running python...", fetchReply: true }).catch(err => console.log(err)) as Message;
        const pythonProcess = spawn("/root/miniconda3/envs/arb/bin/python", [interaction.options.getString("path", true)]);
        pythonProcess.stdout.on("data", (data) => {
            msg.edit(`\`\`\`py\n${data}\n\`\`\``).catch(e => console.log(e));
        });
        pythonProcess.stderr.on("data", (error) => {
            msg.edit(`\`\`\`py\n${error}\n\`\`\``).catch(e => console.log(e));
        });
    }
};
