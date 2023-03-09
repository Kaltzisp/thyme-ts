import type { ThymeClient } from "./Client.js";
import { joinVoiceChannel } from "@discordjs/voice";

interface ThymePlayer {
    joinChannel: (channelId: string | null) => Promise<void>;
}

class Player {
    private readonly client: ThymeClient;
    private readonly guildId: string;
    public constructor(client: ThymeClient, guildId: string) {
        this.client = client;
        this.guildId = guildId;
    }

    public async joinChannel(channelId: string | null): Promise<void> {
        if (!channelId) {
            return;
        }
        const guild = await this.client.guilds.fetch(this.guildId);
        joinVoiceChannel({
            channelId,
            guildId: this.guildId,
            adapterCreator: guild.voiceAdapterCreator
        });
    }
}

export { Player };
export type { ThymePlayer };
