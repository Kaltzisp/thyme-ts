import type { TextChannel } from "discord.js";
import { spawn } from "child_process";

function spawnProcess(path: string, channel: TextChannel): void {
    const pythonProcess = spawn(process.env.CONDA_PATH!, [path]);
    pythonProcess.stdout.on("data", (data) => {
        channel.send(`\`\`\`py\n${data}\n\`\`\``).catch(e => console.error(e));
    });
    pythonProcess.stderr.on("data", (error) => {
        channel.send(`\`\`\`py\n${error}\n\`\`\``).catch(e => console.error(e));
    });
}

export { spawnProcess };
