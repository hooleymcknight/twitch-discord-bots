const patrol = require('./functions');

function route(bot, message, prefix) { // export
    if(message.content.startsWith(prefix)) {
        if(message.author.id == '227607583106662400' && message.content === (prefix + 'reset')) {
            //ready.resetBot(bot);
            return;
        }
        else {
            respond(bot, message);
        }
    }
    else {
        trigger(bot, message);
    }
}

function respond(bot, message) { // internal
    let server = message.guild;
    let input = message.content.toLowerCase().slice(1, message.content.length);
    let redacted = server.channels.cache.get('721967787890966551');
    switch (input.split(" ")[0]) {
        case "ping":
            message.channel.send("Pong!");
            break;
        case "disapprove":
            message.channel.send("https://imgur.com/YB9wlIk");
            break;
        case "disgusted":
            message.channel.send("https://imgur.com/itcwW9w");
            break;
        case "bad":
            patrol.spritz(message);
            setTimeout(function() {
                message.channel.send('<@&738508654201929859> https://tenor.com/0FM2.gif');
            }, 500);
            break;
        case "roles":
            let member = message.member;
            message.channel.send(`<@${member.id}> I can help you get the roles you need.` +
            `\n${patrol.rolesInfo()}`).then(async function(message) {
                await patrol.roleReactions(message);
                patrol.getEmojis(server, message, message.channel, member);
            })
            break;
        case "test":
            break;
        case "help":
            helpList(message);
            break;
        default:
            break;
    }
}

function trigger(bot, message) { // internal
    let input = message.content.toLowerCase();
    if(message.mentions.users.find(x => x.id == '256269727142248448')) {
        if(input.includes('hi') || input.includes('hey') || input.includes('hello')) {
            message.reply('hello!');
        }
    }
    else {
        if(message.channel.type === 'dm') {
          //
        }
    }
}

function helpList(message) { // internal
    let list = `Available commands are:\n\n`
    + `\`\`!bad\`\` = I'll spritz somebody with water. Eat it, shrimps!\n`
    + `\`\`!disapprove\`\`\n`
    + `\`\`!disgusted\`\`\n`
    message.channel.send(list);
}

module.exports = { route }