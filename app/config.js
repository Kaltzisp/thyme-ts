import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
const config = {
    name: process.env.BOT_NAME,
    token: process.env.BOT_TOKEN,
    admins: process.env.ADMINS?.split(","),
    evalChannels: process.env.EVAL_CHANNELS?.split(","),
    intents: [GatewayIntentBits.GuildInvites]
};
export default config;
//# sourceMappingURL=config.js.map