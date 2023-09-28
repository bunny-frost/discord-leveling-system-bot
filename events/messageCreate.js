const { handleEventError } = require('../error handlers/handleEventError');
const { readData, writeData } = require('../utilities/userStatsData');
const { expForNextMsgLevel } = require('../utilities/expForNextMsgLevel');
const { sendToManageServerMembers } = require(`../utilities/dmAdmins`);

const cooldowns = new Set(); // To store users on cooldown

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        try {
            // Check if it's a bot or not a text channel
            if (message.author.bot || message.channel.type !== 'GUILD_TEXT') return;

            // Cooldown check
            if (cooldowns.has(message.author.id)) return;

            // Add user to cooldown
            cooldowns.add(message.author.id);
            setTimeout(() => cooldowns.delete(message.author.id), 5000); // 5 second cooldown

            const expGain = Math.floor(Math.random() * 16) + 5; // Random XP between 5 to 20

            const data = readData();
            const oldMsgExp = data[message.author.id]?.msgExp || 0;
            const oldMsgLevel = data[message.author.id]?.msgLevel || 0;

            let newMsgExp = oldMsgExp + expGain;
            let newMsgLevel = oldMsgLevel;

            while (newMsgExp >= expForNextMsgLevel(newMsgLevel)) {
                newMsgExp -= expForNextMsgLevel(newMsgLevel);
                newMsgLevel++;
            }

            // Update data
            data[message.author.id] = {
                ...data[message.author.id], // Retain other properties
                msgExp: newMsgExp,
                msgLevel: newMsgLevel
            };

            writeData(data);

            // If user leveled up, send a notification
            if (newMsgLevel > oldMsgLevel) {
                if (message.channel.permissionsFor(message.guild.members.me).has('SEND_MESSAGES')) {
                    message.channel.send(`🎉 Congratulations <@${message.author.id}>! You've reached text level ${newMsgLevel}! 🎉`);
                } else {
                    // If bot can't send message in the original channel, try to notify in system channel
                    const systemChannel = message.guild.systemChannel;
                    if (systemChannel && systemChannel.permissionsFor(message.guild.members.me).has('SEND_MESSAGES')) {
                        systemChannel.send(`I couldn't send a congratulatory message in the original channel, but congrats <@${message.author.id}> for reaching text level ${newMsgLevel}! 🎉`);
                    } else {
                        sendToManageServerMembers(message.guild, `Couldn't send a level up congratulatory message in the server's system channel. This is because I don't have permission to send messages in the channel where the user <@${message.author.id}> typed their level up message ${message.channel.name} and the server's system channel which is ${systemChannel.name}. Enable "Send Messages" permission for me in the channels listed to disable this message!`);
                    }
                }
            }
        } catch (error) {
            handleEventError(error, 'messageCreate')
        }
    }
};