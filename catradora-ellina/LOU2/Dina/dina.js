const dina = require('./bot/dina-brain');
const msg = require('./bot/message');
const patrol = require('./bot/functions');
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const bot = new Client({
    autoReconnect: true,
    ws: {
        intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
    },
    partials: ['REACTION', 'MESSAGE', 'CHANNEL']
});

let prefix = '!';

bot.on('ready', () => {
  let twitch = bot.guilds.cache.get('762597160126119937');
  let mod_chat = twitch.channels.cache.get('780626462846746675');
  let roles_channel = twitch.channels.cache.get('771597376124747789');
  patrol.twitchRoles(twitch);
});

bot.on('message', message => {
  let twitch = bot.guilds.cache.get('762597160126119937');
  msg.route(bot, message, prefix);
});

bot.login(dina.login());
