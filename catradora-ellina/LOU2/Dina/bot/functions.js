function fsRoles(guild) {
    guild.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
        const message = messages.find(x => x.id === '845283396493901834')

        const fsFilter = (reaction, user) => {
            return user.id !== 'null'
        }
        const fsCollector = message.createReactionCollector(fsFilter, { dispose: true })

        fsCollector.on('collect', (reaction, user) => { // give the roles
            const member = guild.members.cache.find(x => x.id === user.id)
            giveRole(guild, member, processRole(reaction.emoji.name))
        })

        fsCollector.on('remove', (reaction, user) => { // jk delete it
            const member = guild.members.cache.find(x => x.id === user.id)
            removeRole(guild, member, processRole(reaction.emoji.name))
        })
    })
}

async function updateRoles(guild, updateType, reaction, user) {
    const cachedUser = guild.members.cache.find(x => x.id === user.id)
    const member = await guild.members.fetch(cachedUser)
    const emoji = processRole(reaction.emoji.name)

    if (updateType === 'add') {
        giveRole(guild, member, emoji)
    }
    else {
        removeRole(guild, member, emoji)
    }
}

function giveRole(guild, member, role_name) {
    if(typeof(role_name) !== 'undefined') {
        const role = guild.roles.cache.find(x => x.name === role_name)
        member.roles.add(role)
    }
}

function removeRole(guild, member, role_name) {
    if(typeof(role_name) !== 'undefined') {
        const role = guild.roles.cache.find(x => x.name === role_name)
        member.roles.remove(role)
    }
}

function processRole(emoji) {
    return embed_emojis[emoji];
}

const embed_emojis = {
    'ellie': 'TLOU Show',
    'jackbox': 'Jackbox',
    'pokeball': 'Pokemanz',
    'destiny': 'Destiny 2',
    'sot': 'Sea of Thieves',
    'valorant': 'VALORANT',
    'sus': 'Among Us',
    'pridebean': 'Amogus VR',
    'eso': 'ESO',
    'stellaris': 'Stellaris',
    'overwatch': 'Overwatch',
    'phasmophobia': 'Phasmophobia',
    'dbd': 'Dead by Daylight',
    'apex': 'Apex Legends',
    'prideglasses': 'LGBTQ+',
    '🇹': 'they/them',
    '🇸': 'she/her',
    '🇭': 'he/him',
    'dminus': 'dude-',
    'dplus': 'dude+',
}

function roleReactions(guild) {
    guild.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
        const message = messages.find(x => x.id === '845283396493901834')

        message.react('845277458143248395') // TLOU Show, Ellie
        message.react('791543415665852447') // jackbox
        message.react('1043262398192173076') // pokeball
        message.react('1064354939796725890') // destiny 2
        message.react('1085390699861647442') // sea of thieves
        message.react('1085391333113471016') // valorant
        message.react('771636662971006977') // sus (Among Us)
        message.react('796190701431423006') // pridebean (Amogus VR)
        message.react('845277561336496128') // eso
        message.react('791543609538773003') // stellaris
        message.react('845277535599722566') // overwatch
        message.react('771645089151582228') // phasmophobia
        message.react('771643407398862849') // dead by daylight
        message.react('1115725443023241336') // apex legends
        message.react('794321178273120296') // prideglasses
        message.react('🇹')
        message.react('🇸')
        message.react('🇭')
        message.react('1097684168521031690') // dude minus
        message.react('1097684170739822713') // dude plus
    })
}

// ----------- BAD!!! -----------

function baddie(fiddlesitters, message) {

    // if the message has a reference (was a reply on a particular message)
    if (message.reference?.messageId) {
        message.channel.messages.fetch({ limit: 15 }).then((msgs) => {
            const badMessage = msgs.find(x => x.id === message.reference.messageId)
            applyBad(badMessage, fiddlesitters)
        })
    }
    else {
        message.channel.messages.fetch({ limit: 3 }).then((msgs) => {
            // get the author who's not the bot and not whoever called !bad
            const badMessage = msgs.find(x => !x.author.bot && x.content !== '!bad')
            applyBad(badMessage, fiddlesitters)
          })
    }
}

function applyBad(message, fiddlesitters) {
    const perpetrator = message.author
    
    removeBad(fiddlesitters)

    // add the role to the new Bad bitch
    const newBaddie = fiddlesitters.members.cache.find(x => x.id === perpetrator.id)
    giveRole(fiddlesitters, newBaddie, 'BAD')

    message.channel.send(`<@${perpetrator.id}> https://tenor.com/biden.gif`)
}

function removeBad(fiddlesitters) {
    // this should be one line, pls figure it out
    const prevBaddieUser = fiddlesitters.members.cache.filter(member => member.roles.cache.find(role => role.name === 'BAD')).map(x => x.user)[0]
    if (prevBaddieUser) {
        const prevBaddie = fiddlesitters.members.cache.find(x => x.id === prevBaddieUser.id)

        // remove previous Baddie from the Bad role
        removeRole(fiddlesitters, prevBaddie, 'BAD')
    }
}

module.exports = { roleReactions, fsRoles, updateRoles, embed_emojis, baddie, removeBad }
