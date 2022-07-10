const adora = require('./bot/adora-brain');
const msg = require('./bot/message');
const rebellion = require('./bot/functions');
const { Client, MessageEmbed } = require('discord.js');
const bot = new Client({ autoReconnect: true });

let prefix = '!';

bot.on('ready', () => {
  let HS = bot.guilds.cache.get('721967787890966548');
});

bot.on('message', message => {
  let HS = bot.guilds.cache.get('721967787890966548');
  msg.route(bot, guild, message, prefix);
});

bot.login(adora.login());