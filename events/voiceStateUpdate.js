const { handleEventError } = require('../error handlers/handleEventError');
const { readData, writeData } = require('../utilities/userStatsData');
const { expForNextLevel } = require('../utilities/expForNextLevel');

const voiceActivityStart = new Map();  // This is to keep track of when a user joins a VC

module.exports = {
    name: 'voiceStateUpdate',
    execute(oldState, newState, client) {
        try {
            // User joined a VC
            if (!oldState.channelId && newState.channelId) {
                if (newState.member.bot) return;

                console.log(`Setting join time for user ${newState.member.id}`);
                voiceActivityStart.set(newState.member.id, Date.now());
                console.log(`User ${newState.member.id} joined a voice channel.`);
            }
            // User left a VC
            if (oldState.channelId && !newState.channelId) {
                if (oldState.member.bot) return;

                const joinTime = voiceActivityStart.get(oldState.member.id);
                console.log(`Retrieved join time for user ${oldState.member.id}: ${joinTime}`);

                const currentTime = Date.now();
                const diff = currentTime - joinTime;
                console.log(`User ${oldState.member.id} spent ${diff} milliseconds in voice channel.`);

                // Calculate EXP for the session
                const sessionExp = Math.floor(diff / 5000); // Assuming 1 EXP for every 5 seconds
                console.log(sessionExp)

                const data = readData();
                const oldDuration = data[oldState.member.id]?.time || 0;
                const oldExp = data[oldState.member.id]?.exp || 0;
                const oldLevel = data[oldState.member.id]?.level || 0;

                let newExp = oldExp + sessionExp;
                let newLevel = oldLevel;

                while (newExp >= expForNextLevel(newLevel)) {
                    newExp -= expForNextLevel(newLevel);
                    newLevel++;
                }

                // Update the data with new values
                data[oldState.member.id] = {
                    time: oldDuration + diff,
                    exp: newExp,
                    level: newLevel
                };

                writeData(data);
                voiceActivityStart.delete(oldState.member.id);

                console.log(`User ${oldState.member.id}'s total accumulated voice activity is ${oldDuration + diff} milliseconds.`);
                console.log(`User ${oldState.member.id} left a voice channel.`);
            }
        } catch (error) {
            handleEventError(error, 'voiceStateUpdate');
        }
    }
};
