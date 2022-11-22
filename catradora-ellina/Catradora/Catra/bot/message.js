const fn = require('./functions');

function route(bot, server, message, prefix, Discord) { // export
    if(message.content.startsWith(prefix)) {
        if(message.author.id == '227607583106662400') {
            if(message.content === (prefix + 'reset')) {
                //ready.resetBot(bot);
                return;
            }
            else if(message.content === prefix + 'embed') {
                fn.sendRoleEmbed(server, Discord);
                return;
            }
            else if(message.content === prefix + 'pins') {
                fn.reactToEmbed(server);
            }
        }
        else {
            respond(bot, server, message);
        }
    }
    else {
        trigger(bot, message);
    }
}

function respond(bot, server, message) { // internal
    let input = message.content.toLowerCase().slice(1, message.content.length);
    switch (input.split(" ")[0]) {
        case "ping":
            message.channel.send("Pong!");
            break;
        case "roles":
            fn.parseRoleRequest(server, message.member);
            break;
        case "slap":
            message.channel.send('https://media1.tenor.com/images/edee5a638a6e9c0860e973038b2462b2/tenor.gif?itemid=19867918');
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
    let list = `Available commands are:\n\n` +
    `\`\`!slap\`\``
    message.channel.send(list);
}


module.exports = { route }
