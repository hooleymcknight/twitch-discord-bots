const dina = require('./bot/dina-brain')
const msg = require('./bot/message')
const patrol = require('./bot/functions')
const selfCare = require('./bot/selfCare')

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

const approvedChannels = [
  '814694638144978985', // bots-and-code
  '1044531488210825257', // self care
  '794399398330892289', // memes and stuff
]

bot.on('ready', () => {
  fiddlesitters = bot.guilds.cache.get('762597160126119937')
  // const botsChannel = fiddlesitters.channels.cache.get('814694638144978985')

  // remove anyone with the Bad role
  patrol.removeBad(fiddlesitters)

  // watch for people adding roles in #roles channel
  patrol.fsRoles(fiddlesitters)

  // the below is for if I set up a function to check what Dina missed in
  // the self care channel when she was offline.
  const selfCareChannel = fiddlesitters.channels.cache.get('1044531488210825257')
  selfCare.checkMissed(selfCareChannel, prefix)
})

bot.on('messageCreate', (message) => {
  if (message.author.bot) return
  if (!approvedChannels.includes(message.channelId)) return

  msg.route(fiddlesitters, message, prefix)
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
