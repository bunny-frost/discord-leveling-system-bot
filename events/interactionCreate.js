const { handleCommandError } = require('../error handlers/handleCommandError');

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction, client);
        } catch (error) {
            handleCommandError(error, interaction);
        }
    },
};
