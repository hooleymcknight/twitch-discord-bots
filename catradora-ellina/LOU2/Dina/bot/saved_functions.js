const fiddlesitters = bot.guilds.cache.get('762597160126119937')
if(message.content === 'editit') {
  const embed = new EmbedBuilder()
    .setColor('#4f1665')
    .setTitle('React on this message to get you some new roles.')
    .setDescription(`
        <:ellie:845277458143248395> — TLOU Show
        <:jackbox:791543415665852447> — Jackbox
        <:pokeball:1043262398192173076> — Pokemanz
        <:destiny:1064354939796725890> — Destiny 2
        <:sus:771636662971006977> — Among Us
        <:pridebean:796190701431423006> — Amogus VR
        <:eso:845277561336496128> — Elder Scrolls Online
        <:stellaris:791543609538773003> — Stellaris
        <:overwatch:845277535599722566> — Overwatch
        <:phasmophobia:771645089151582228> — Phasmophobia
        <:dbd:771643407398862849> — Dead by Daylight
        <:sot:1085390699861647442> — Sea of Thieves
        <:valorant:1085391333113471016> — VALORANT
        <:apex:1115725443023241336> — Apex Legends

        <:prideglasses:794321178273120296> — LGBTQ+
        🇹 — they/them
        🇸 — she/her
        🇭 — he/him
        <:dminus:1097684168521031690> — dude minus (please don't call me "dude")
        <:dplus:1097684170739822713> — dude plus (it's okay to call me "dude")
    `)
    
    fiddlesitters.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then((messages) => {
        const message = messages.find(x => x.id === '845283396493901834')
        message.edit({ embeds: [embed] })
    })
}


// =============== BEWARE, BELOW IS NOT TOTALLY FUNCTIONAL, NEEDS RECHECKED ================================


// the below might not be needed, or at least not the roleReactions bit. I'm not sure right now because things have changed a lot and I dont think we collect reactions like we did before.
// but keep an eye out :thinking:

// put this section in bot.ready to redo this in the future:
const embed = new Discord.MessageEmbed()
  .setColor('#4f1665')
  .setTitle('React on this message to get you some new roles.')
  .setDescription(`
    <:ellie:845277458143248395> — TLOU Show
    <:jackbox:791543415665852447> — Jackbox
    <:pokeball:1043262398192173076> — Pokemanz
    <:destiny:1064354939796725890> — Destiny 2
    <:sus:771636662971006977> — Among Us
    <:pridebean:796190701431423006> — Amogus VR
    <:eso:845277561336496128> — Elder Scrolls Online
    <:stellaris:791543609538773003> — Stellaris
    <:overwatch:845277535599722566> — Overwatch
    <:phasmophobia:771645089151582228> — Phasmophobia
    <:dbd:771643407398862849> — Dead by Daylight
    <:sot:1085390699861647442> — Sea of Thieves
    <:valorant:1085391333113471016> — VALORANT
    <:apex:1115725443023241336> — Apex Legends

    <:prideglasses:794321178273120296> — LGBTQ+
    🇹 — they/them
    🇸 — she/her
    🇭 — he/him
    <:dminus:1097684168521031690> — dude minus (please don't call me "dude")
    <:dplus:1097684170739822713> — dude plus (it's okay to call me "dude")
  `)
  patrol.roleReactions(fiddlesitters)
  roles_channel.send({ embeds: [embed] })


  // on twitch collector end
  twitch_collector.on('end', (collected) => {
      console.log('I am stopping', collected)
  })