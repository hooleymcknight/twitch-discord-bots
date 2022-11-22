const ellie = require('./bot/ellie-brain');
const msg = require('./bot/message');
const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({
    autoReconnect: true,
    intents: [
      GatewayIntentBits.Guilds,
		  GatewayIntentBits.GuildMessages,
    ]
});

const prefix = '!';

// bot.on('ready', () => {
//     //
// });

bot.on('message', message => {
  msg.route(bot, message, prefix);
})

bot.login(ellie.login());

function announceTwitch(body) {
    const banner = ellie.pickTwitchBanner(body)
    const twitch_embed = new Discord.MessageEmbed()
      .setColor('#4f1665')
      .setTitle(`${body.title}`)
      .setURL('https://twitch.tv/hooleymcknight')
      .setImage(`${banner}`)
      .setDescription(`Hooley is live on Twitch!`)
      .addFields(
          { name: `Playing`, value: `${body.game_name}`, inline: true },
          { name: `Link`, value: 'https://twitch.tv/hooleymcknight', inline: true }
      )
    const TwitchServer = bot.guilds.cache.get('762597160126119937');
    const general_channel = TwitchServer.channels.cache.get('762597161132228641');
    const announcement_channel = TwitchServer.channels.cache.get('762869622092988417');
    announcement_channel.send(twitch_embed);
}

module.exports = { announceTwitch }