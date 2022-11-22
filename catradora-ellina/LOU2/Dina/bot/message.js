// patrol is the name of the first full mission in The Last of Us II
// this is a set of functions that are getting performed by Dina, the same person who runs patrol in that mission
const patrol = require('./functions')
const selfCare = require('./selfCare')

function route(message, prefix) { // export
    if(message.content.startsWith(prefix)) {
        if(message.author.id == '227607583106662400' && message.content === (prefix + 'reset')) {
            //ready.resetBot(bot)
            return
        }
        else if (message.content.includes('self') && message.content.includes('care')) { // this feels like a general way to catch it all if someone types things wrong
            selfCare.store(message)
            const encouragement = selfCare.encourage()
            message.reply(encouragement)
        }
        else {
            respond(message)
        }
    }
    else {
        trigger(message)
    }
}

function respond(message) { // internal
    const input = message.content.toLowerCase().slice(1, message.content.length)
    switch (input.split(" ")[0]) {
        case "ping":
            message.channel.send("Pong!")
            break
        // case "disapprove":
        //     message.channel.send("https://imgur.com/YB9wlIk")
        //     break
        // case "disgusted":
        //     message.channel.send("https://imgur.com/itcwW9w")
        //     break
        // case "bad":
        //     patrol.spritz(message)
        //     setTimeout(function() {
        //         message.channel.send('<@&738508654201929859> https://tenor.com/0FM2.gif')
        //     }, 500)
        //     break
        // case "roles":
        //     const server = message.guild
        //     const member = message.member
        //     message.channel.send(`<@${member.id}> I can help you get the roles you need.` +
        //     `\n${patrol.rolesInfo()}`).then(async function(message) {
        //         await patrol.roleReactions(message)
        //         patrol.getEmojis(server, message, message.channel, member)
        //     })
        //     break
        case "test":
            break
        case "help":
            helpList(message)
            break
        default:
            break
    }
}

function trigger(message) { // internal
    const input = message.content.toLowerCase()
    if(message.mentions.users.find(x => x.id == '256269727142248448')) {
        if(input.includes('hi') || input.includes('hey') || input.includes('hello')) {
            message.reply('hello!')
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
    message.channel.send(list)
}

module.exports = { route }