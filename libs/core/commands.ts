import type { Interaction, SlashCommandBuilder } from "discord.js";
import type { BotConfig } from "../config.js";
import fs from "fs";
import path from "path";

interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: Interaction, config?: BotConfig) => unknown;
}

interface LibImport {
    default: Command;
}

function getImportPaths(dir: string): string[] {
    let importPaths: string[] = [];
    fs.readdirSync(dir).forEach((relPath) => {
        const filePath = path.resolve(dir, relPath);
        const fileInfo = fs.statSync(filePath);
        if (fileInfo.isDirectory()) {
            const subPaths = getImportPaths(filePath);
            importPaths = importPaths.concat(subPaths);
        } else if (path.extname(filePath) === ".js") {
            importPaths.push(filePath);
        }
    });
    return importPaths;
}

async function getCommands(dir: string): Promise<Command[]> {
    const importPaths = getImportPaths(dir);
    const libs = [];
    for (const libPath of importPaths) {
        libs.push(import(`file://${libPath}`) as Promise<LibImport>);
    }
    const commands = (await Promise.all(libs)).map(lib => lib.default);
    return commands;
}

export { getCommands };
export type { Command };
