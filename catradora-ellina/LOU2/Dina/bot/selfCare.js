const fs = require('fs')
const selfCareData = require('./selfCare_storage.json')

const checkMissed = (channel) => {
  // future function for checking if she missed any
  // if I move the bots to a server, I might abandon this
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

  fs.writeFile('./bot/selfCare_storage.json', JSON.stringify(newJSON), err => {
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
  'aw fuck yeah!'
]

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = { store, encourage, checkMissed }