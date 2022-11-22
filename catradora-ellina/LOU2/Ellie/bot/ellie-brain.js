const fs = require('fs');
const config = require('config.json');
const ConfigParser = require('configparser');
const path = require("path");

const conf = new ConfigParser();
conf.read(path.resolve(__dirname, '../../keys/config.ini'));
conf.sections();

function login() {
    return conf.get('ELLIE', 'discord');
}

function pickTwitchBanner(body) {
    // default is body.profile_banner
    if(body.title.includes('Yven')) {
        return 'https://hooleymcknight.com/images/dnd/sig_plain.png';
    }
    else {
        return body.thumbnail_url.replace('{width}', '950').replace('{height}', '540');
    }
}

module.exports = { login, pickTwitchBanner };
