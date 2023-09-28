const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { readData } = require('../utilities/userStatsData');
const { expForNextLevel } = require('../utilities/expForNextLevel');
const { expForNextMsgLevel } = require('../utilities/expForNextMsgLevel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Check your level')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose text activity you want to check')
                .setRequired(false)
        ),

    async execute(interaction) {
        const data = readData();
        const target = interaction.options.getUser(`user`) || interaction.user;
        const userStats = data[target.id] || {};


        // VC Level
        const userLevel = userStats?.level || 0;
        const userExp = userStats?.exp || 0;
        const expToNextLevel = expForNextLevel(userLevel) - userExp;
        const totalExp = expToNextLevel + userExp;
        const nextLevel = userLevel + 1;
        const timeNeeded = expToNextLevel * 5;

        // Text Level
        const userMsgExp = userStats.msgExp || 0;
        const userMsgLevel = userStats.msgLevel || 0;
        const nextMsgLevel = userMsgLevel + 1;

        const expNeededForNextLevel = expForNextMsgLevel(userMsgLevel); // This gives you the EXP needed to go from current level to the next level

        const expLeftForNextLevel = expNeededForNextLevel - userMsgExp; // This gives the remaining EXP the user needs to reach the next level

        const megaLevelEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Stats')
            .addFields(
                {
                    name: `Voice Level:`, value: `**${userLevel}**`, inline: true
                }, {
                name: `Voice EXP:`, value: `**${userExp}** / **${totalExp}**`, inline: true
            }, {
                name: `Next Level:`, value: `**${timeNeeded}** seconds needed for level **${nextLevel}**`, inline: true
            }, {
                name: `Text Level:`, value: `**${userMsgLevel}**`, inline: true
            }, {
                name: `Text EXP:`,
                value: `**${userMsgExp}** / **${expNeededForNextLevel}**`,
                inline: true
            }, {
                name: `Next Level:`,
                value: `**${expLeftForNextLevel}** exp needed for Level **${nextMsgLevel}**`,
                inline: true
            }
            )
            .setThumbnail(target.avatarURL({ dynamic: true }))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [megaLevelEmbed] });
    }
};
