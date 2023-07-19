
import { Client, Collection, Events, type Interaction, REST, Routes, type TextChannel } from "discord.js";
import { type Command, getCommands } from "../core/commands.js";
import { Player, type ThymePlayer } from "./Player.js";
import type { BotConfig } from "../core/config.js";
import cron from "node-cron";
import { spawnProcess } from "../core/utils.js";

class ThymeClient extends Client {
    public config: BotConfig;
    public commands: Collection<string, Command>;
    public players: Collection<string, ThymePlayer>;

    public constructor(config: BotConfig) {
        super({ intents: config.intents });
        this.config = config;
        this.commands = new Collection();
        this.players = new Collection();
    }

    public player(guildId: string): ThymePlayer {
        if (!this.players.has(guildId)) {
            this.players.set(guildId, new Player(this, guildId));
        }
        return this.players.get(guildId)!;
    }

    public async initialize(): Promise<void> {
        this.logStart();
        await this.registerCommands().catch(e => console.error(e));
        this.on(Events.InteractionCreate, (interaction: Interaction) => {
            if (interaction.isChatInputCommand() && this.commands.has(interaction.commandName)) {
                const command = this.commands.get(interaction.commandName)!;
                command.execute(interaction, this.config);
            }
        });
        this.initCronJobs();
    }

    public async registerCommands(): Promise<void> {
        const libs = await getCommands("./app/commands/").catch(e => console.error(e)) as Command[];
        for (const command of libs) {
            this.commands.set(command.data.name, command);
        }
        const commandJSONs = this.commands.map(command => command.data.toJSON());
        const rest = new REST({ version: "10" }).setToken(this.config.token);
        rest.put(Routes.applicationCommands(this.user!.id), { body: commandJSONs }).catch(e => console.error(e));
    }

    private initCronJobs(): void {
        cron.schedule("0 9 * * *", () => {
            this.channels.fetch("1083550635040976966").then((channel) => {
                spawnProcess("PromoBetting/RacePromo/race_promo.py", channel as TextChannel);
            }).catch(err => console.log(err));
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
