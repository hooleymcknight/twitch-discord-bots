const fs = require('fs');
const config = require('config.json');
const ConfigParser = require('configparser');
const path = require("path");

const conf = new ConfigParser();
conf.read(path.resolve(__dirname, '../keys/config.ini'));
conf.sections();

function ellieDied() {
    let ellie_deaths = Number(conf.get('STATS', 'Ellie_deaths')) + 1;
    let total_deaths = Number(conf.get('STATS', 'TLOU2_deaths')) + 1;
    conf.set('STATS', 'TLOU2_deaths', `${total_deaths}`);
    conf.set('STATS', 'Ellie_deaths', `${ellie_deaths}`);
    conf.write('./keys/config.ini');
    return `Hooley has gotten Ellie killed ${ellie_deaths} times now. In total, Ellie and Abby have died ${total_deaths} times.`;
}

function abbyDied() {
    let abby_deaths = Number(conf.get('STATS', 'Abby_deaths')) + 1;
    let total_deaths = Number(conf.get('STATS', 'TLOU2_deaths')) + 1;
    conf.set('STATS', 'TLOU2_deaths', `${total_deaths}`);
    conf.set('STATS', 'Abby_deaths', `${abby_deaths}`);
    conf.write('./keys/config.ini');
    return `Hooley has gotten Abby killed ${abby_deaths} times now. In total, Ellie and Abby have died ${total_deaths} times.`;
}

function dogDied() {
    let dog_deaths = Number(conf.get('STATS', 'TLOU2_dogs')) + 1;
    conf.set('STATS', 'TLOU2_dogs', `${dog_deaths}`);
    conf.write('./keys/config.ini');
    return `Hooley has now slaughtered ${dog_deaths} dogs in this playthrough, and she's extremely unhappy about it.`;
}

function getDogDeaths() {
    let dog_deaths = Number(conf.get('STATS', 'TLOU2_dogs'));
    return `Hooley has slaughtered ${dog_deaths} dogs in this playthrough, and she's extremely unhappy about it.`;
}

function getTLOU2Deaths() {
    let ellie_deaths = Number(conf.get('STATS', 'Ellie_deaths'));
    let abby_deaths = Number(conf.get('STATS', 'Abby_deaths'));
    let total_deaths = Number(conf.get('STATS', 'TLOU2_deaths'));
    return `Hooley has gotten Ellie killed ${ellie_deaths} times, and Abby killed ${abby_deaths} times. In total, they've died ${total_deaths} times.`
}

function soraDied() {
    let sora_deaths = Number(conf.get('STATS', 'Sora_deaths')) + 1;
    let total_deaths = Number(conf.get('STATS', 'KH_deaths')) + 1;
    conf.set('STATS', 'KH_deaths', `${total_deaths}`);
    conf.set('STATS', 'Sora_deaths', `${sora_deaths}`);
    conf.write('./keys/config.ini');
    return `Hooley has gotten Sora killed ${sora_deaths} times now. In total, Sora and Roxas have died ${total_deaths} times.`;
}

function roxasDied() {
    let roxas_deaths = Number(conf.get('STATS', 'Roxas_deaths')) + 1;
    let total_deaths = Number(conf.get('STATS', 'KH_deaths')) + 1;
    conf.set('STATS', 'KH_deaths', `${total_deaths}`);
    conf.set('STATS', 'Roxas_deaths', `${roxas_deaths}`);
    conf.write('./keys/config.ini');
    return `Hooley has gotten Roxas killed ${roxas_deaths} times now. In total, Sora and Roxas have died ${total_deaths} times.`;
}

function getKHDeaths() {
    let sora_deaths = Number(conf.get('STATS', 'Sora_deaths'));
    let roxas_deaths = Number(conf.get('STATS', 'Roxas_deaths'));
    let total_deaths = Number(conf.get('STATS', 'KH_deaths'));
    return `Hooley has gotten Sora killed ${sora_deaths} times, and Roxas killed ${roxas_deaths} times. In total, they've died ${total_deaths} times.`
}

module.exports = { ellieDied, abbyDied, dogDied, getDogDeaths, getTLOU2Deaths, soraDied, roxasDied, getKHDeaths }