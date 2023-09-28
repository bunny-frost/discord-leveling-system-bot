// EXP needed for Level 1 from Level 0
const BASE_EXP = 30;

// You can customize "1.2" with any value. "0.1" = 10%
function expForNextLevel(currentLevel) {
    return Math.ceil(BASE_EXP * Math.pow(1.2, currentLevel));
};

module.exports = {
    expForNextLevel
};