const fs = require('fs')
const selfCareData = require('./selfCare_storage.json')

const scQualifies = (message, prefix) => {
  if ((message.content.startsWith(prefix) && message.content.includes('self') && message.content.includes('care')) || message.content.startsWith('<#1044531488210825257>')) {
    return true
  }
  return false
}

const checkMissed = (channel, prefix) => {
  // function for checking if she missed any
  // if I move the bots to a server, I might abandon this
  channel.messages.fetch({ limit: 10 }).then((msgs) => {
    const recordedMessages = selfCareData.map(x => Object.values(x)[0][1])

    msgs.forEach((message) => {
      if (!recordedMessages.includes(message.id) && scQualifies(message, prefix)) {
        store(message)
        const encouragement = encourage()
        message.reply(encouragement)
      }
    })
  })
}

const store = (message) => {
  let care = ''
  if (message.content.includes('care')) {
    care = message.content.split('care ')[1]
  }
  else {
    care = message.content.split('<#1044531488210825257> ')[1]
  }

  let obj = {}
  obj[message.author.id] = [care, message.id]

  let newJSON = selfCareData
  newJSON.push(obj)

  fs.writeFile('H:/Documents/Coding/Bots/twitch-discord-bots/catradora-ellina/LOU2/Dina/bot/selfCare_storage.json', JSON.stringify(newJSON), err => {
    if (err) {
      throw err
    }
    console.log('updated file')
  })
}

const encourage = () => {
  // pick an encouraging thing to say and return it
  return encouragements[pickRandom(0, encouragements.length - 1)]
}

const encouragements = [
  'Hell yeah, way to go!',
  'Treat yo self',
  'I\'m proud of you :)',
  'aw fuck yeah!',
  'I\'m super proud of you!!',
  ':first_place:',
  'Gold star for you! <:goldstar:1049963253511508008>',
  'You go Glenn Coco!!',
  'Braver than the Marines.',
  'Believe in the me that believes in you.',
  'You got this!',
  'You\'re doing awesome!',
  'You are so strong! Hell yeah!',
  'Little you would be proud of you :)',
  'I believe in you! And unicorns. But mostly you.',
  'You\'re on a great path!',
  'You are powerful.',
  'You\'re a catch! <a:pokeballcatch:1042565878434238484>',
  'That makes you a sexy bitch! <a:pumpkintwerk:1034310616598446132>',
  'You ARE a thicc bitch! Lizzo said so!',
  'You\'ve really got layers! <:shrek:898748139593412658>',
  'Ayyyyyyyyyyyyyyyyyyyyyyyyy! <:ayyy:898043284205731840>',
  'You\'re boosted! <:powermush:1049965998633144350>',
  'You\'re the wind in my sails <a:fiddlesitters:1029569673211150407>',
  'Good for you!',
  'Be the change that you wish to see in the world.',
  'I admire how strong you are!',
  'You are my sunshine. :sun_with_face:',
  '<:praisethesun:1049967066901389312>',
  'B double E double R - U - N, beer run... Celebrate!\n https://youtu.be/PHjNEtEWjEU',
  'You deserve a coffee!',
  'Gooood self careeee',
  'Good stretch!',
  'What a win!',
  'You\'re a bad bitch!',
  'According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don\'t care what humans think is impossible.',
  'Oh no, I gjallarhorned a baby.',
  'I don\'t want you to cause divorce, you just do.',
  'I have no idea if there\'s cocaine in this video game or not. Niiiice, we got a lot of money!',
  'These fucking kids. I\'m a working adult, I don\'t have time to lose.',
  'Holly is into thoroughly tussled women.',
  'Guys, I can Tokyo drift this child.',
  'I\'m a borrower at heart.',
  'They are one of the most LGBTQ-friendly of all the missile companies, though.',
  'Bourbon is always there for me.',
  'You are truly in the spaghetti. :spaghetti:',
  'You\'re the most durable. You got all that weak shit out of you at birth.',
  'Honey\'s gonna bake *your* ham.',
  'Have some mustard. <:mustard:1099250342631309403>',
]

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = { store, encourage, checkMissed, scQualifies }