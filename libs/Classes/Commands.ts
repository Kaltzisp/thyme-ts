import { type Client, type Interaction, Routes } from "discord.js";

interface CommandOptions {
    name: string;
    alias: string[];
    description: string;
    args: string[];
    exe: (interaction: Interaction) => unknown;
}

class Command {
    public name: string;
    public alias: string[];
    public description: string;
    public args: string[];
    public exe: (interaction: Interaction) => unknown;
    public constructor(client: Client, commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.alias = commandOptions.alias;
        this.description = commandOptions.description;
        this.args = commandOptions.args;
        this.exe = commandOptions.exe;
    }
    public static async registerCommands(client: Client, commandList: Command[]): Promise<Map<string, Command>> {
        await client.rest.put(Routes.applicationCommands(client.user!.id), { body: commandList }).catch(err => console.log(err));
        return new Map(commandList.map(command => [command.name, command]));
    }
}

export { Command };
