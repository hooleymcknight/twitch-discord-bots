const write = require('./write');

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
        callback(body);
    });
}

function route(client, channel, user, message, self, twitch_data) {
    // starts with messages first
    if(message.toLowerCase().startsWith('!addquote') || message.toLowerCase().startsWith('!add quote')) {
        return;
    }
    // then switch list
    else {
        if(message.includes(' ')) {
            message = message.split(' ')[0];
        }
        switch(message.toLowerCase()) {
            case '!charity':
                client.say(channel, `This is a charity stream to help support Thrive Youth Center in San Antonio, Texas. TYC helps out local queer youth, particularly in giving them resources to avoid homelessness.`)
                break;
            case '!lurk':
                client.say(channel, `@${user.username}, thanks for hanging out, I appreciate the lurk!`);
                break;
            case '!deaths':
                getGame(client, twitch_data, function(body) {
                    if(body.game === 'The Last of Us Part II') {
                        var res = write.getTLOU2Deaths();
                        client.say(channel, res);
                    }
                    else if(body.game.includes('Kingdom Hearts')) {
                        var res = write.getKHDeaths();
                        client.say(channel, res);
                    }
                    else {
                        client.say(channel, `That count feature hasn't been set up for this game.`);
                    }
                })
                break;
            case '!dogs':
                getGame(client, twitch_data, function(body) {
                    if(body.game === 'The Last of Us Part II') {
                        var res = write.getDogDeaths();
                        client.say(channel, res);
                    }
                });
                break;
            case '!game':
                getGame(client, twitch_data, function(body) {
                    client.say(channel, `@${user.username} ${body.game}`);
                });
                break;
            // below are the shout outs for specific people
            case '!blake':
                client.say(channel, `Blake's Twitch: https://twitch.tv/blakeferrum`);
                break;
            case '!jackson':
            case '!jax':
                client.say(channel, `Jackson's Twitch: https://twitch.tv/jaxman0410`);
                break;
            case '!matt':
                client.say(channel, `Matt's Twitch: https://twitch.tv/airchallenged`);
                break;
            // below are the social media stuffs
            case '!socials':
            case '!social':
                client.say(channel, `Website: https://hooleymcknight.com — — Instagram: https://instagram.com/hooleymcknight — — YouTube: https://youtube.com/c/hooleymcknight — — Twitter: https://twitter.com/hooleymcknight`);
                break;
            case '!twitter':
                client.say(channel, `Hooley's Twitter: https://twitter.com/hooleymcknight`);
                break;
            case '!instagram':
            case '!ig':
                client.say(channel, `Hooley's Instagram: https://instagram.com/hooleymcknight`);
                break;
            case '!website':
                client.say(channel, `Hooley's Website: https://hooleymcknight.com/`);
                break;
            case '!youtube':
            case '!yt':
                client.say(channel, `Hooley's YouTube: https://youtube.com/c/hooleymcknight`);
                break;
            case '!discord':
                client.say(channel, `Hooley's Discord: https://discord.gg/8MYDjz5`);
                break;
            case '!quote': // these are StreamElements commands that I would like Wanda to ignore
            case '!followage':
            case '!accountage':
            case '!uptime':
            case '!watchtime':
            case '!editcounter':
            case '!setgame':
            case '!settitle':
            case '!donate':
            case '!pickmygame':
                break;
            case '!help':
            case '!list':
            case '!commands':
            default:
                client.say(channel, `Commands are: lurk, deaths, dogs, game, socials, website, discord, heartzone`);
                break;
        }
    }
}

module.exports = { route }