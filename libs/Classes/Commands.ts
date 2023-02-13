import fs from "fs";
import path from "path";

interface Command {
    alias: string[];
    args: never[] | string[];
    info: string;
    exe: (params: unknown) => unknown;
}

const libs: Promise<Command>[] = [];
function recursiveReq(dir: string): void {
    fs.readdirSync(dir).forEach((relPath) => {
        const filePath = path.resolve(dir, relPath);
        const fileInfo = fs.statSync(filePath);
        if (fileInfo.isDirectory()) {
            recursiveReq(filePath);
        } else if (path.extname(filePath) === ".js") {
            libs.push(import(`file://${filePath}`) as Promise<Command>);
        }
    });
}

recursiveReq("./app/commands");
export default await Promise.all(libs);
export type { Command };
