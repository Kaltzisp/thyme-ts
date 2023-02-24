import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

interface BotConfig {
    token: string;
    evalChannels: string[] | undefined;
    intents: number[];
}

const config: BotConfig = {
    token: process.env.BOT_TOKEN!,
    evalChannels: process.env.EVAL_CHANNELS!.split(","),
    intents: [GatewayIntentBits.Guilds]
};

export { config };
export type { BotConfig };
