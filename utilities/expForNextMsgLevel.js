// EXP needed for Level 1 from Level 0
const BASE_EXP = 80;

// You can customize "1.3" with any value. "0.1" = 10%
function expForNextMsgLevel(currentLevel) {
    return Math.ceil(BASE_EXP * Math.pow(1.3, currentLevel));
};

module.exports = {
    expForNextMsgLevel,
    BASE_EXP
};