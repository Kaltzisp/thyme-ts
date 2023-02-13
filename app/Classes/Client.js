import { Client } from "discord.js";
class ThymeClient extends Client {
    config;
    constructor(config) {
        super({ intents: config.intents });
        this.config = config;
    }
    logStart() {
        const date = new Date();
        let time = date.toLocaleDateString("en-GB", {
            second: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "2-digit",
            hour12: false,
            timeZone: "Australia/Melbourne"
        }).split(", ");
        time = `BOOTED ${this.config.name} @ ${time[2]} - ${time[0]} ${time[1]}`;
        const separator = new Array(time.length + 1).join("=");
        console.log(`\n\n${separator}\n${time}\n${separator}\n\n`);
    }
}
export default ThymeClient;
//# sourceMappingURL=Client.js.map