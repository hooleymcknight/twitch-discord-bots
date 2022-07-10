const fn = require('./functions');

function route(bot, lou, message, prefix) { // export
    if(message.content.startsWith(prefix)) {
        if(message.author.id == '227607583106662400' && message.content === (prefix + 'reset')) {
            //ready.resetBot(bot);
            console.log('reset this bot');
            return;
        }
        else {
            respond(bot, lou, message);
        }
    }
    else {
        trigger(bot, message);
    }
}

function respond(bot, lou, message) { // internal
    let input = message.content.toLowerCase().slice(1, message.content.length);
    switch (input.split(" ")[0]) {
        case "ping":
            message.channel.send("Pong!");
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
        // else if(message.includes('editembed')) {
        //     const exampleEmbed = new Discord.MessageEmbed().setTitle('Some title').setDescription('Description after the edit');
        //     message.edit(exampleEmbed);
        // }
    }
    else {
        if(message.channel.type === 'dm') {
          //
        }
    }
}

function helpList(message) { // internal
    let list = `Available commands are:\n\n`
    message.channel.send(list);
}


module.exports = { route }
