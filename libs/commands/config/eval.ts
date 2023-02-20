import type { ChatInputCommandInteraction } from "discord.js";

export default {
    name: "eval",
    alias: ["eval"],
    description: "Evaluates input on Node.js and returns the result.",
    args: {
        expression: "The expression to evaluate."
    },
    exe(interaction: ChatInputCommandInteraction): void {
        if (process.env.ADMINS!.split(",").includes(interaction.member!.user.id)) {
            let evalOutput = "";
            try {
                // eslint-disable-next-line no-eval
                evalOutput = eval(interaction.options.getString("expression", true)) as string;
            } catch (e) {
                if (e instanceof Error) {
                    evalOutput = e.message;
                } else {
                    evalOutput = "Unknown error.";
                }
            }
            interaction.reply(evalOutput).catch(err => console.error(err));
            console.log(evalOutput);
        }
    }
};
