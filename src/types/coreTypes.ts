import type { GatewayIntentBits } from "discord.js";

export interface BotConfig {
    name: string;
    token: string;
    admins: string[];
    evalChannels: string[];
    intents: GatewayIntentBits[];
}
