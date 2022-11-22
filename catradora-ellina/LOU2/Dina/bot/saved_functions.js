if(message.content === 'editit') {
    const embed = new Discord.MessageEmbed()
      .setColor('#4f1665')
      .setTitle('React on this message to get you some new roles.')
      .setDescription(`
          <:ellie:845277458143248395> — The Last of Us, Parts I & II
          <:jackbox:791543415665852447> — Jackbox
          <:sus:771636662971006977> — Among Us
          <:eso:845277561336496128> — Elder Scrolls Online
          <:stellaris:791543609538773003> — Stellaris
          <:overwatch:845277535599722566> — Overwatch
          <:phasmophobia:771645089151582228> — Phasmophobia
          <:dbd:771643407398862849> — Dead by Daylight

          <:prideglasses:794321178273120296> — LGBTQ+
          🇹 — they/them
          🇸 — she/her
          🇭 — he/him

          <:exu:858135615940722688> - Exandria Unlimited Spoilers
      `);
      twitch.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
          var message = messages.find(x => x.id === '845283396493901834');
          message.edit(embed);
      });
}
else if(message.content === 'exu') {
    twitch.channels.cache.get('771597376124747789').messages.fetch({ limit: 5 }).then(messages => {
        var message = messages.find(x => x.id === '845283396493901834');
        message.react('858135615940722688'); // exu
    });
}


// put this section in bot.ready to redo this in the future:
const embed = new Discord.MessageEmbed()
  .setColor('#4f1665')
  .setTitle('React on this message to get you some new roles.')
  .setDescription(`
      <:ellie:845277458143248395> — The Last of Us, Parts I & II
      <:jackbox:791543415665852447> — Jackbox
      <:sus:771636662971006977> — Among Us
      <:eso:845277561336496128> — Elder Scrolls Online
      <:stellaris:791543609538773003> — Stellaris
      <:overwatch:845277535599722566> — Overwatch
      <:phasmophobia:771645089151582228> — Phasmophobia
      <:dbd:771643407398862849> — Dead by Daylight

      <:prideglasses:794321178273120296> — LGBTQ+
      🇹 — they/them
      🇸 — she/her
      🇭 — he/him
  `);
  patrol.roleReactions(twitch);
  roles_channel.send(embed);


  // on twitch collector end
  twitch_collector.on('end', collected => {
      console.log('I am stopping');
  })