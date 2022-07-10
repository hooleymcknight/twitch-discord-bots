function twitchRoles(guild) {
    guild.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
        var message = messages.find(x => x.id === '845283396493901834');

        const twitch_filter = (reaction, user) => {
            return user.id !== 'null';
        }
        const twitch_collector = message.createReactionCollector(twitch_filter, { dispose: true });

        twitch_collector.on('collect', (reaction, user) => { // give the roles
            var member = guild.members.cache.find(x => x.id === user.id);
            giveRole(guild, member, processRole(reaction.emoji.name));
        });

        twitch_collector.on('remove', (reaction, user) => { // jk delete it
            var member = guild.members.cache.find(x => x.id === user.id);
            removeRole(guild, member, processRole(reaction.emoji.name));
        });
    });
}

function giveRole(guild, member, role_name) {
    if(typeof(role_name) !== 'undefined') {
        let role = guild.roles.cache.find(x => x.name === role_name);
        member.roles.add(role);
    }
}

function removeRole(guild, member, role_name) {
    if(typeof(role_name) !== 'undefined') {
        let role = guild.roles.cache.find(x => x.name === role_name);
        member.roles.remove(role);
    }
}

function processRole(emoji) {
    return embed_emojis[emoji];
}

let embed_emojis = {
    'ellie': 'Last of Us',
    'jackbox': 'Jackbox',
    'sus': 'Among Us',
    'eso': 'ESO',
    'stellaris': 'Stellaris',
    'overwatch': 'Overwatch',
    'phasmophobia': 'Phasmophobia',
    'dbd': 'Dead by Daylight',
    'prideglasses': 'LGBTQ+',
    '🇹': 'they/them',
    '🇸': 'she/her',
    '🇭': 'he/him'
}

function roleReactions(guild) {
    guild.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
        var message = messages.find(x => x.id === '845283396493901834');
        message.react('845277458143248395'); // ellie
        message.react('791543415665852447'); // jackbox
        message.react('771636662971006977'); // sus (Among Us)
        message.react('845277561336496128'); // eso
        message.react('791543609538773003'); // stellaris
        message.react('845277535599722566'); // overwatch
        message.react('771645089151582228'); // phasmophobia
        message.react('771643407398862849'); // dead by daylight
        message.react('794321178273120296'); // prideglasses
        message.react('🇹');
        message.react('🇸');
        message.react('🇭');
    });
}

module.exports = { roleReactions, twitchRoles, embed_emojis }
