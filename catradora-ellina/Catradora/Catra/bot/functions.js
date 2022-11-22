function roll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function monitorRoles(guild) {
    let redacted = guild.channels.cache.get('721967787890966551');
    redacted.messages.fetchPinned().then(messages => {
        var message = messages.find(x => x.id === '906119859266523188');

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
        let role = guild.roles.cache.find(x => x.name === role_name)
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
    'jackbox': 'Jackoffs',
    'sus': 'AmogUs',
    'phasmo': 'Phasmo',
    'arcane': 'Zaunites',
    'catragun': 'Cat Girls',
    'aang': 'Benders',
    'rwby': 'Bumbleby',
    'ellie': 'Gay for Ellie',
    'joel': 'Clickers',
    'pf': 'ATX',
    'heb': 'Texas',
    'gay': 'LGBTQ+',
    '🇹': 'they/them',
    '🇸': 'she/her',
    '🇭': 'he/him'
}

function sendRoleEmbed(server, Discord) {
    const embed = new Discord.MessageEmbed()
      .setColor('#952d35')
      .setTitle('React here, get roles. Get outta my face.')
      .setDescription(`
          <:jackbox:828080859411251200> — Jackoffs
          <:sus:759715892598145094> — AmogUs
          <:phasmo:915883725580021790> — Phasmo

          <:arcane:915882843866021929> — Zaunites (Arcane)
          <:catragun:791077677939163136> — Cat Girls (She-Ra)
          <:aang:745636074960977952> — Benders (Avatar/Korra)
          <:rwby:828080937711304724> — Bumbleby (RWBY)
          <:ellie:731055452174942280> — Gay for Ellie (TLOU 2)
          <:joel:759713721479725076> — Clickers (TLOU 1)

          <:pf:796466155757895720> — ATX
          <:heb:796465867704893452> — Texas

          <:gay:759714548981694504> — LGBTQ+
          🇹 — they/them
          🇸 — she/her
          🇭 — he/him
      `);
      server.channels.cache.get('721967787890966551').send(embed);
}

function reactToEmbed(server) {
    let redacted = server.channels.cache.get('721967787890966551');
    redacted.messages.fetchPinned().then(messages => {
        var message = messages.find(x => x.id === '906119859266523188');
        message.react('828080859411251200'); // jackbox
        message.react('759715892598145094'); // sus (Among Us)
        message.react('915883725580021790'); // phasmo (phasmo)
        message.react('915882843866021929'); // arcane (arcane)
        message.react('791077677939163136'); // catragun (she-ra)
        message.react('745636074960977952'); // aang (avatar)
        message.react('828080937711304724'); // rwby
        message.react('731055452174942280'); // ellie (gay for ellie)
        message.react('759713721479725076'); // joel (clickers)
        message.react('796466155757895720'); // pf (atx)
        message.react('796465867704893452'); // heb (tx)
        message.react('759714548981694504'); // gay
        message.react('🇹');
        message.react('🇸');
        message.react('🇭');
    });
}

function toggleRole(server, member, role_name) {
    let has_role = member.roles.cache.find(x => x.name );
}

module.exports = { reactToEmbed, sendRoleEmbed, toggleRole, monitorRoles }