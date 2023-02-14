import type { BotConfig } from "../config.js";
import { Client } from "discord.js";
import { Command } from "./Commands.js";
import { importAll } from "../core/importAll.js";

class ThymeClient extends Client {
    public config: BotConfig;
    public cmds: unknown;

    public constructor(config: BotConfig) {
        super({ intents: config.intents });
        this.config = config;
    }

    public async initialize(): Promise<void> {
        this.logStart();
        await this.registerCommands();
    }

    private async registerCommands(): Promise<void> {
        // Registering commands.
        const commmandList = (await Promise.all(importAll("./app/commands"))).map(lib => new Command(this, lib.default));
        const commands = await Command.registerCommands(this, commmandList).catch(err => console.log(err)) as Map<string, Command>;
        // // Assigning command exes.
        this.on("interactionCreate", (interaction) => {
            if (interaction.isChatInputCommand() && commands.get(interaction.commandName)) {
                const cmd = commands.get(interaction.commandName)!;
                cmd.exe(interaction);
            }
        });
    }

    private logStart(): void {
        const date = new Date();
        let time: string[] | string = date.toLocaleDateString("en-GB", {
            second: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "2-digit",
            hour12: false,
            timeZone: "Australia/Melbourne"
        }).split(", ");
        time = `BOOTED CLIENT: ${this.user!.username} @ ${time[2]} - ${time[0]} ${time[1]}`;
        const separator = new Array(time.length + 1).join("=");
        console.log(`\n\n${separator}\n${time}\n${separator}\n\n`);
    }
}

export { ThymeClient };
