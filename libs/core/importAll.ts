import type { Interaction } from "discord.js";
import fs from "fs";
import path from "path";

interface CommandType {
    name: string;
    alias: string[];
    description: string;
    args: never[] | string[];
    exe: (interaction: Interaction) => unknown;
}

interface LibImport {
    default: CommandType;
}

// Recursively getting modules.
function importAll(dir: string): LibImport[] {
    let libs: LibImport[] = [];
    fs.readdirSync(dir).forEach((relPath) => {
        const filePath = path.resolve(dir, relPath);
        const fileInfo = fs.statSync(filePath);
        if (fileInfo.isDirectory()) {
            const subLibs = importAll(filePath);
            libs = libs.concat(subLibs);
        } else if (path.extname(filePath) === ".js") {
            const lib = import(`file://${filePath}`) as unknown as LibImport;
            libs.push(lib);
        }
    });
    return libs;
}

export { importAll };
export type { CommandType };
