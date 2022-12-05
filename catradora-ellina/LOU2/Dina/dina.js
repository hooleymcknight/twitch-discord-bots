const dina = require('./bot/dina-brain')
const msg = require('./bot/message')
const patrol = require('./bot/functions')
// const selfCare = require('./bot/selfCare')

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js')
const bot = new Client({
    autoReconnect: true,
    intents: [
      GatewayIntentBits.Guilds,
		  GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
    ]
})

const prefix = '!'
let fiddlesitters

bot.on('ready', () => {
  fiddlesitters = bot.guilds.cache.get('762597160126119937')
  patrol.fsRoles(fiddlesitters)

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

bot.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id === '845283396493901834') {
    patrol.updateRoles(fiddlesitters, 'add', reaction, user)
  }
})

bot.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id === '845283396493901834') {
    patrol.updateRoles(fiddlesitters, 'remove', reaction, user)
  }
})

bot.login(dina.login())
