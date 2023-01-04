// patrol is the name of the first full mission in The Last of Us II
// this is a set of functions that are getting performed by Dina, the same person who runs patrol in that mission
const patrol = require('./functions')
const selfCare = require('./selfCare')

function route(fiddlesitters, message, prefix) { // export
    if (!message.content.startsWith(prefix) && !message.content.startsWith('<#1044531488210825257>')) return
    
    if (selfCare.scQualifies(message, prefix)) {
        selfCare.store(message)
        const encouragement = selfCare.encourage()
        message.reply(encouragement)
    }
    else if (message.content.includes('encourage')) {
        const prevMessage = message.content.split(' ')[1]
        fiddlesitters.channels.cache.get('1044531488210825257').messages.fetch({ limit: 10 }).then((msgs) => {
            const prevMsg = msgs.find(x => x.id === prevMessage)
            const prevEnc = selfCare.encourage()
            prevMsg.reply(prevEnc)
        })
    }
    else {
        respond(fiddlesitters, message)
    }
}

function respond(fiddlesitters, message) { // internal
    const input = message.content.toLowerCase().slice(1, message.content.length)
    switch (input.split(' ')[0]) {
        case "ping":
            message.channel.send("Pong!")
            break
        case "test":
            break
        case "help":
            helpList(message)
            break
        default:
            break
    }
}

function helpList(message) { // internal
    let list = `Available commands are:\n\n`
    + `\`\`!self-care\`\`\n`
    message.channel.send(list)
}

module.exports = { route }