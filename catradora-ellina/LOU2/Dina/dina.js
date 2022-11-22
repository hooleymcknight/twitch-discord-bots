const dina = require('./bot/dina-brain')
const msg = require('./bot/message')
const patrol = require('./bot/functions')
const selfCare = require('./bot/selfCare')
const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js')
const bot = new Client({
    autoReconnect: true,
    intents: [
      GatewayIntentBits.Guilds,
		  GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
})

const prefix = '!'

bot.on('ready', () => {
  // twitch is an outdated name for the channel, these functions need updated
  const twitch = bot.guilds.cache.get('762597160126119937')
  patrol.twitchRoles(twitch)

  // the below is for if I set up a function to check what Dina missed in
  // the self care channel when she was offline. this is currently not a thing though

  // const scChannel = bot.guilds.cache.get('1044531488210825257')
  // selfCare.checkMissed(scChannel)
})

bot.on('messageCreate', (message) => {
  if (message.author.bot) return
  if (message.channelId !== '814694638144978985' && message.channelId !== '1044531488210825257') return
  msg.route(message, prefix)
})

bot.login(dina.login())
