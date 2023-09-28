module.exports = {
    handleCommandError: (error, interaction) => {
        console.error('Error executing command:', error);

        if (interaction && interaction.replied) {
            interaction.followUp({ content: 'Oops! Something went wrong while executing that command.', ephemeral: true });
        } else if (interaction) {
            interaction.reply({ content: 'Oops! Something went wrong while executing that command.', ephemeral: true });
        }
    },
};