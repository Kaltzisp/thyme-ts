import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

interface BotConfig {
    name: string | undefined;
    token: string | undefined;
    admins: string[] | undefined;
    evalChannels: string[] | undefined;
    intents: number[];
}

const config: BotConfig = {
    name: process.env.BOT_NAME,
    token: process.env.BOT_TOKEN,
    admins: process.env.ADMINS?.split(","),
    evalChannels: process.env.EVAL_CHANNELS?.split(","),
    intents: [GatewayIntentBits.GuildInvites]
};

export default config;
export type { BotConfig };
