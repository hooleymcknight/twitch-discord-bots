const fs = require('fs')
const config = require('config.json')
const ConfigParser = require('configparser')
const path = require('path')
const tmi = require('tmi.js')

const mods = require('./bot/mods')
const cmds = require('./bot/commands')

const dbd = require('./bot/voting/voting')

const conf = new ConfigParser()
conf.read(path.resolve(__dirname, './keys/config.ini'))

conf.sections()

const client = new tmi.client({
    options: { debug: false },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: conf.get('TWITCH', 'username'),
        password: conf.get('TWITCH', 'TWITCH_OAUTH_TOKEN')
    },
    channels: ['hooleymcknight']
})

// const twitch_data = {
//     url: 'https://api.twitch.tv/helix/streams/?user_id=' + conf.get('TWITCH', 'id'),
//     method: 'GET',
//     headers: {
//         Accept: 'application/vnd.twitchtv.v5+json',
//         Authorization: 'Bearer ' + conf.get('TWITCH', 'helix_TWITCH_OAUTH_TOKEN').replace('oauth:', ''),
//         'Client-ID': conf.get('TWITCH', 'clientid')
//     }
// }

client.connect()

client.on('message', (channel, user, message, self) => {
    if(self) return
    // if(user['user-id'] !== '100135110' && message.charAt(0) !== '!') return

    console.log('message', message)
    console.log('user', user.username)
    
    if(message.startsWith('!vote')) {
        const reply = dbd.store(message, user)
        client.say(channel, reply)
    }


    // old stuff, some parts (probably related to the twitch_data object) didn't work.
    // will revisit later

    // // hit mod list first
    // let mod_command = mods.route(client, channel, user, message, self, twitch_data)
    // // then hit everyone list
    // if(user['user-id'] !== '100135110' && !mod_command) {
    //     cmds.route(client, channel, user, message, self, twitch_data)
    // }
})