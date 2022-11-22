const fn = require('./functions');

function route(bot, message, prefix) { // export
    if(message.content.startsWith(prefix)) {
        if(message.author.id == '227607583106662400' && message.content === (prefix + 'reset')) {
            //ready.resetBot(bot);
            console.log('reset this bot');
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
    let input = message.content.toLowerCase().slice(1, message.content.length);
    switch (input.split(" ")[0]) {
        case "ping":
            message.channel.send("Pong!");
            break;
        case "pick":
            if(message.content.split(' ').length == 1) {
                message.channel.send(`<@${message.author.id}> ...What.`);
            }
            else if(message.content.toLowerCase().includes('dina')) {
                message.channel.send(`<@${message.author.id}> Always Dina.`);
            }
            else {
                let picked = fn.pick(message);
                message.channel.send(`<@${message.author.id}> Seriously, you could just pick one.`);
                setTimeout(function(){
                    message.channel.send(`<@${message.author.id}> ${picked}`);
                }, 3000);
            }
            break;
        case "flick":
            message.send('https://media.tenor.com/images/d290d3a9d8991bd6cba245d3c99d7e85/tenor.gif');
            break;
        case "wut":
            message.channel.send('https://imgur.com/BiLJ1Qj');
            break;
        case "judging":
            message.channel.send("https://imgur.com/PQ0uYl8");
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
    + `\`\`!flick\`\` = I'll make out with Dina.\n`
    + `\`\`!pick\`\` = I'll pick for your indecisive ass.\n`
    + `\`\`!wut\`\`\n`
    + `\`\`!judging\`\`\n`
    message.channel.send(list);
}

module.exports = { route }
