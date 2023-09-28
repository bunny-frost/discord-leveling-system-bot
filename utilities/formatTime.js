function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    ms %= 1000;
    return `**${hours.toString().padStart(2, '0')}** hour(s) **${minutes.toString().padStart(2, '0')}** minute(s) **${seconds.toString().padStart(2, '0')}** second(s)`;
};

module.exports = {
    formatTime
};

// To add milliseconds: 
// Add this after **${seconds.toString().padStart(2, '0')}** second(s) : **${ms.toString().padStart(2, '0')}** millisecond(s)