import { type ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Generates an invite link for the bot."),
    execute(interaction: ChatInputCommandInteraction): void {
        const bot = interaction.client.user;
        const embed = new EmbedBuilder()
            .setColor([20, 150, 130])
            .setTitle(`Invite ${bot.username} to your server!`)
            .setURL(`https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=8&scope=bot%20applications.commands`);
        interaction.reply({ embeds: [embed] }).catch(e => console.log(e));
    }
};
