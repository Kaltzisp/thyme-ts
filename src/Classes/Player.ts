import { type AudioPlayer, AudioPlayerStatus, type VoiceConnection, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import type { ThymeClient } from "./Client.js";
import ytdl from "ytdl-core";

interface ThymePlayer {
    joinChannel: (channelId: string | null) => Promise<void>;
    enqueueSong: (url: string) => void;
}

class Player {
    public queue: string[];
    private connection: VoiceConnection | undefined;
    private readonly client: ThymeClient;
    private readonly guildId: string;
    private readonly audioPlayer: AudioPlayer;
    public constructor(client: ThymeClient, guildId: string) {
        this.client = client;
        this.guildId = guildId;
        this.queue = [];
        this.audioPlayer = createAudioPlayer();
        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            this.playNextTrack();
        });
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

    public enqueueSong(url: string): void {
        this.queue.push(url);
        this.refresh();
    }

    public refresh(): void {
        if (this.audioPlayer.state.status === AudioPlayerStatus.Idle) {
            this.playTrack(this.queue[0]);
        }
    }

    private playNextTrack(): void {
        this.queue.shift();
        if (this.queue.length > 0) {
            this.playTrack(this.queue[0]);
        }
    }

    private playTrack(track: string): void {
        const videoInfo = ytdl(track, {
            highWaterMark: 2 ** 25,
            quality: "highestaudio",
            filter: "audioonly"
        });
        const resource = createAudioResource(videoInfo);
        this.assertConnection();
        this.audioPlayer.play(resource);
    }

    private assertConnection(): void {
        const connection = getVoiceConnection(this.guildId);
        if (connection !== this.connection) {
            this.connection = connection;
            connection?.subscribe(this.audioPlayer);
        }
    }
}

export { Player };
export type { ThymePlayer };
