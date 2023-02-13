import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

interface BotConfig {
    token: string;
    admins: string[] | undefined;
    evalChannels: string[] | undefined;
    intents: number[];
}

const config: BotConfig = {
    token: process.env.BOT_TOKEN!,
    admins: process.env.ADMINS!.split(","),
    evalChannels: process.env.EVAL_CHANNELS!.split(","),
    intents: [GatewayIntentBits.GuildInvites]
};

export default config;
export type { BotConfig };
