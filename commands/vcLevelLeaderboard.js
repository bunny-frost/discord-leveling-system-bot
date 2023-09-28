const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { readData } = require('../utilities/userStatsData');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vc-leaderboard')
        .setDescription('Displays the top users by vc level and experience'),

    async execute(interaction) {
        const data = readData();

        // Sort the data by level first, then EXP
        const sortedUsers = Object.entries(data)
            .sort(([idA, userA], [idB, userB]) => {
                if (userA.level === userB.level) return userB.exp - userA.exp;
                return userB.level - userA.level;
            });

        // Format the data for display in an embed
        let embedDescription = '';
        for (let i = 0; i < sortedUsers.length && i < 10; i++) {  // Limit to top 10 for brevity
            const userId = sortedUsers[i][0];
            const userLevel = sortedUsers[i][1].level;
            const userExp = sortedUsers[i][1].exp;

            const user = await interaction.client.users.fetch(userId).catch(() => null);
            if (user) {
                embedDescription += `${i + 1}. <@${userId}> - Level ${userLevel} with ${userExp} EXP\n`;
            } else {
                embedDescription += `${i + 1}. Unknown User (ID: ${userId}) - Level ${userLevel} with ${userExp} EXP\n`;
            }
        }

        const leaderboardEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Voice Channel Leaderboard')
            .setDescription(embedDescription)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true })})
            .setTimestamp();

        await interaction.reply({ embeds: [leaderboardEmbed] });
    }
};
