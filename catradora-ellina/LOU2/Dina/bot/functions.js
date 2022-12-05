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

async function updateRoles (guild, updateType, reaction, user) {
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
    'jackbox': 'Jackbox',
    'sus': 'Among Us',
    'pridebean': 'Amogus VR',
    'eso': 'ESO',
    'stellaris': 'Stellaris',
    'overwatch': 'Overwatch',
    'phasmophobia': 'Phasmophobia',
    'dbd': 'Dead by Daylight',
    'prideglasses': 'LGBTQ+',
    '🇹': 'they/them',
    '🇸': 'she/her',
    '🇭': 'he/him',
}

function roleReactions(guild) {
    guild.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
        const message = messages.find(x => x.id === '845283396493901834')

        message.react('791543415665852447') // jackbox
        message.react('771636662971006977') // sus (Among Us)
        message.react('796190701431423006') // pridebean (Amogus VR)
        message.react('845277561336496128') // eso
        message.react('791543609538773003') // stellaris
        message.react('845277535599722566') // overwatch
        message.react('771645089151582228') // phasmophobia
        message.react('771643407398862849') // dead by daylight
        message.react('794321178273120296') // prideglasses
        message.react('🇹')
        message.react('🇸')
        message.react('🇭')
    })
}

module.exports = { roleReactions, fsRoles, updateRoles, embed_emojis }
