const fs = require('fs');
const config = require('config.json');
const ConfigParser = require('configparser');
const path = require("path");

const conf = new ConfigParser();
conf.read(path.resolve(__dirname, '../../keys/config.ini'));
conf.sections();

function login() {
    return conf.get('CATRA', 'discord');
}

module.exports = { login };
