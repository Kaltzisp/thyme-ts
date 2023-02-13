import { Client, REST, Routes } from "discord.js";
import { type Command, importAll } from "../core/registerCommands.js";
import type { BotConfig } from "../config.js";

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
        const libs = (await Promise.all(importAll("./app/commands"))).map(lib => lib.default);
        const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);
        await rest.put(Routes.applicationCommands(this.user!.id), { body: libs });
        // Restructuring to object.
        const modules: Record<string, Command> = libs.reduce((accumulator: Record<string, Command>, current) => {
            accumulator[current.name] = current;
            return accumulator;
        }, {});
        // Assigning command exes.
        this.on("interactionCreate", (interaction) => {
            if (interaction.isChatInputCommand()) {
                modules[interaction.commandName].exe(interaction);
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

export default ThymeClient;
