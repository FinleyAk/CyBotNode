const fs = require('fs');
const configTemplate = require('./configTemplate.json');

module.exports = function constructor() {
    if (fs.existsSync('./config.json')) {
        return checkConfig();
    } else {
        return newConfig();
    }
};

function checkConfig() {
    let config = require('../../config.json');
    for (let key in configTemplate) {
        // noinspection JSUnfilteredForInLoop
        if (config[key] === undefined) return null;
    }
    return config;
}

function newConfig() {
    fs.copyFileSync('./core/config/configTemplate.json', './config.json');
    return undefined;
}
