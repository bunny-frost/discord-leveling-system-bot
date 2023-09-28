const { SlashCommandBuilder } = require('@discordjs/builders');
const { readData, writeData } = require('../utilities/userStatsData');
const { formatTime } = require('../utilities/formatTime');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice_activity')
        .setDescription('Checks the voice activity of a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose voice activity you want to check')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const target = interaction.options.getUser('user') || interaction.user;
        console.log(`Fetching voice activity for user ${target.id}.`);

        const data = readData();
        const totalVoiceTime = data[target.id]?.time || 0;
        const formattedTime = formatTime(totalVoiceTime);

        await interaction.reply(`${target.tag} has spent ${formattedTime} in voice channels.`);
        console.log(`Total voice activity for user ${target.id} is ${formattedTime}.`);
    }
};
