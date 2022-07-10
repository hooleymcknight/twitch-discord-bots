// update roles collector
if(message.content.includes('!edit')) {
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
  HS.channels.cache.get('721967787890966551').messages.fetchPinned().then(messages => {
      var message = messages.find(x => x.id === '906119859266523188');
      message.edit(embed);
  });
}
else if(message.content.includes('!react')) {
    let redacted = HS.channels.cache.get('721967787890966551');
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

// remove all reactions
if(message.content.includes('!removereactions')) {
    let redacted = HS.channels.cache.get('721967787890966551');
    redacted.messages.fetchPinned().then(messages => {
        var message = messages.find(x => x.id === '906119859266523188');
        message.reactions.removeAll();
    });
}

// reset Catra's roles
if(message.content.includes('!resetCatra')) {
    let catra = HS.members.cache.get('759653333710405633');
    catra.roles.cache.each(function(role) {
        if(role.name !== 'Bots' && role.name !== 'Cat Girls' && role.name !== 'she/her' && role.name !== '@everyone') {
            catra.roles.remove(role);
        }
    });
    //let bot_role = HS.roles.cache.find(x => x.name === 'Bots'); // 738549743462121512
    let catgirls_role = HS.roles.cache.find(x => x.name === 'Cat Girls'); // 730495301273649182
    let gay_role = HS.roles.cache.find(x => x.name === 'LGBTQ+'); // 740759065558384662

    //catra.roles.add(bot_role);
    catra.roles.add(catgirls_role);
    catra.roles.add(gay_role);
}

// get himbo role heirarchy
let himbo_role = HS.roles.cache.find(x => x.name === 'I wanna be a himbo');
let threshold = himbo_role.rawPosition;

// change permissions
let himbo_role = HS.roles.cache.find(x => x.name === 'I wanna be a himbo');
himbo_role.setPermissions(['MANAGE_EMOJIS']);
let list = himbo_role.permissions.serialize();
console.log(list);