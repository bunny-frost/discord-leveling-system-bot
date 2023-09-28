module.exports = {
    handleEventError: (error, event) => {
        console.error(`Error executing event ${event}:`, error);
    },
};