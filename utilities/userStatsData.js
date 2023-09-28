const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'userActivityData.json');

function readData() {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}

function writeData(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
}

module.exports = {
    readData,
    writeData
};
