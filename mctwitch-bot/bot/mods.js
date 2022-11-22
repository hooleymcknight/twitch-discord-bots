const write = require('./write');
const ellie = require('../../catradora-ellina/LOU2/Ellie/ellie');

function getGame(client, twitch_data, callback) {
    client.api(twitch_data, function(err, res, body) {
        if(err) return;
        // options to use with body:
            // mature: true,
            // status: string stream title,
            // game: string game category,
            // created_at: string date TZ,
            // updated_at: string date TZ,
            // partner: false,
            // logo: string url pfp,
            // video_banner: string url banner with text,
            // profile_banner: string url profile banner (just the river pic),
            // url: string url to my channel,
            // views: number of total channel views I think,
            // followers: number of followers,
            // broadcaster_type: 'affiliate',
            // description: string bio
        console.log(body)
        console.log(body.data)
        callback(body.data[0]);
    });
}

function route(client, channel, user, message, self, twitch_data) {
    if(user['user-id'] == '100135110' && message.startsWith('hooleymcknight is now live')) {
        getGame(client, twitch_data, function(body) {
            ellie.announceTwitch(body);
        });
    }
    // if user is mod or Hooley
    else if(user['badges-raw'].includes('broadcaster/1') || user.mod) {
        if(message.toLowerCase().startsWith('!kadgar')) {
            let link = 'https://kadgar.net/live/hooleymcknight';
            let users = message.toLowerCase().split(' ');
            if(users.length > 16) {
                client.say(channel, `@${user.username} That's too many people for Kadgar to handle at once.`);
            }
            else {
                for(i=1; i<users.length; i++) {
                    link += `/${users[i]}`;
                }
                client.say(channel, `Watch us play at the same time: ${link}`);
            }
            return true;
        }
        else if(message.toLowerCase().startsWith('!shoutout') || message.toLowerCase().startsWith('!so')) {
            if(message.split(' ').length <= 1) {
                client.say(channel, `@${user.username} Please try again but tell me who you want to give a shout out to.`);
            }
            else {
                client.say(channel, `Check out ${message.split(' ')[1]} at https://twitch.tv/${message.toLowerCase().split(' ')[1]}`);
            }
            return true;
        }
        else {
            switch(message.toLowerCase()) {
                case '!elliedied':
                    var res = write.ellieDied();
                    client.say(channel, res);
                    break;
                case '!abbydied':
                    var res = write.abbyDied();
                    client.say(channel, res);
                    break;
                case '!dogdied':
                    var res = write.dogDied();
                    client.say(channel, res);
                    break;
                case '!soradied':
                    var res = write.soraDied();
                    client.say(channel, res);
                    break;
                case '!roxasdied':
                    var res = write.roxasDied();
                    client.say(channel, res);
                    break;
                case '!announce':
                    getGame(client, twitch_data, function(body) {
                        ellie.announceTwitch(body);
                    });
                    break;
                case '!modtest':
                    client.say(channel, 'This is a mod message test.');
                    break;
                default:
                    return false;
                    break;
            }
            return true;
        }
    }
}

module.exports = { route }