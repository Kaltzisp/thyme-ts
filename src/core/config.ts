import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

// Getting env variables.
dotenv.config();

// Setting bot parameters.
const config = {
    name: process.env.BOT_NAME!,
    token: process.env.BOT_TOKEN!,
    admins: process.env.ADMINS!.split(","),
    evalChannels: process.env.EVAL_CHANNELS!.split(","),
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
};

export { config };
