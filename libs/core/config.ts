import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

interface BotConfig {
    name: string;
    token: string;
    admins: string[];
    evalChannels: string[];
    intents: GatewayIntentBits[];
}

const config = {
    name: process.env.BOT_NAME!,
    token: process.env.BOT_TOKEN!,
    admins: process.env.ADMINS!.split(","),
    evalChannels: process.env.EVAL_CHANNELS!.split(","),
    intents: [GatewayIntentBits.Guilds]
};

export { config };
export type { BotConfig };
