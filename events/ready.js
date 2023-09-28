const fs = require(`fs`);
const { clientId, guildId } = require(`../config.json`);

module.exports = {
    name: 'ready',
    once: true, // Because we want this event to run only once when the client is ready
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        // Fetch the list of existing commands for your bot in the guild and delete them.
        // const commands = await client.guilds.cache.get(guildId).commands.fetch();
        // commands.forEach(cmd => {
        //     client.guilds.cache.get(guildId).commands.delete(cmd.id);
        // });

        // Use the following if you want to delete commands Globally:

        // Fetch the list of existing global commands for your bot and delete them.
        // const commands = await client.application.commands.fetch();
        // commands.forEach(cmd => {
        //     cmd.delete().then(() => {
        //         console.log(`Deleted command: ${cmd.name}`);
        //     }).catch(err => {
        //         console.error(`Failed to delete command: ${cmd.name}. Error: ${err.message}`);
        //     });
        // });


        // Register the new commands.
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            // Use client.application.commands.create(command.data); if you want to register commands Globally
            client.guilds.cache.get(guildId).commands.create(command.data);
        }

        console.log('Commands refreshed!');
        client.user.setPresence({
            activities: [{ name: 'with your user stats!' }],
            status: 'dnd',
            // Can be dnd, afk, online
            type: 'PLAYING',
            // Can be WATCHING, PLAYING, STREAMING
        });
    },
};
