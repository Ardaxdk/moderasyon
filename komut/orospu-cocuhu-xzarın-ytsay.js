module.exports.operate = ({msg, args, author, cfg}) => {
    if (!author.permissions.has("ADMINISTRATOR")) return;
    if (!args[0]) {
      let uyeler = msg.guild.members.cache.filter(u => {
        return (
          u.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
        )
      }).map(u => u.user);
      msg.channel.send(`**Aktif olup seste olmayan yetkililer : \n \n** ${uyeler.join(", \n")}`);
    } else if (["dm", "dm-at"].includes(args[0])) {
      msg.guild.members.cache.filter(u => {
        return (
          u.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
        );
      }).forEach(uye => {
        var text = "Merhabalar sunucumuzun ses aktifliğini arttırmak için lütfen müsait isen public odalara değil isen alone odalarına geçer misin?";
        uye.send(text).catch(err => {
          msg.channel.send(`${uye} adlı üyeye dmden mesaj atamıyorum. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin.`);
        });
      });
    };
  };
  
  exports.conf = { enabled: true, guildOnly: true, aliases: ["xzarytsay", "xzarytsay"], permLevel: 0 };

  exports.help = { name: "xzarytsay", description: "Erkek kullanıcıları kayıt etme komutu.", usage: "erkek @kişi isim yaş" };