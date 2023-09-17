import type { TextChannel } from "discord.js";
import { createWriteStream } from "fs";
import { get } from "https";
import { spawn } from "child_process";

type statusCallback = (statusMessage: string) => void;

function spawnProcess(path: string, channel: TextChannel): void {
    const pythonProcess = spawn(process.env.CONDA_PATH!, [path]);
    pythonProcess.stdout.on("data", (data) => {
        channel.send(`\`\`\`py\n${data}\n\`\`\``).catch(e => console.error(e));
    });
    pythonProcess.stderr.on("data", (error) => {
        channel.send(`\`\`\`py\n${error}\n\`\`\``).catch(e => console.error(e));
    });
}

function downloadFile(url: string, path: string, callback: statusCallback): void {
    const fileStream = createWriteStream(path);
    get(url, (response) => {
        response.pipe(fileStream);
    }).on("error", (err) => {
        console.log(err);
        callback(err.message);
    });
    fileStream.on("finish", () => {
        fileStream.close();
        callback("Success");
    });
}

export { downloadFile, spawnProcess };
