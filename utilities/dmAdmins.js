async function sendToManageServerMembers(guild, content) {
    const membersWithPermission = await guild.members.fetch({ withPresences: false });
    const managers = membersWithPermission.filter(member => member.permissions.has('MANAGE_GUILD') && !member.user.bot);
    
    for (const manager of managers.values()) {
        try {
            await manager.send(content);
        } catch (error) {
            console.warn(`Couldn't DM member ${manager.id}: ${error.message}`);
        }
    }
};

module.exports = {
    sendToManageServerMembers
}