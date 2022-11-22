const catra = require('./bot/catra-brain');
const msg = require('./bot/message');
const fn = require('./bot/functions');
const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({
    autoReconnect: true,
    intents: [
      GatewayIntentBits.Guilds,
		  GatewayIntentBits.GuildMessages,
    ]
});

let prefix = '!';

bot.on('ready', () => {
  let HS = bot.guilds.cache.get('721967787890966548');
  fn.monitorRoles(HS);
});

bot.on('message', message => {
  let HS = bot.guilds.cache.get('721967787890966548');
  msg.route(bot, HS, message, prefix, Discord);
});

bot.on('guildMemberAdd', member => {
    let HS = bot.guilds.cache.get('721967787890966548');
    let redacted = HS.channels.cache.get('721967787890966551');
    redacted.send(`*Hey, ${member.displayName}...* <:catra:731079728169091153>`);
});

bot.login(catra.login());