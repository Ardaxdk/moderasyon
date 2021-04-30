const Discord = require("discord.js");
const config = require('../config.json')
module.exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has(config.EKO)) return;

if (!args[0]) {
    let uyeler = message.guild.members.cache.filter(u => {
      return (
        u.roles.cache.some(r => config.roles.yetkiliRoller.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
      )
    }).map(u => u.user);
    message.channel.send(`**Aktif olup seste olmayan yetkililer : \n \n** ${uyeler.join(", \n")}`);
  } else if (["yt-dm", "dm-at", "dm"].includes(args[0])) {
    message.guild.members.cache.filter(u => {
      return (
        u.roles.cache.some(r => config.roles.yetkiliRoller.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
      );
    }).forEach(uye => {
      var text = "Merhabalar sunucumuzun ses aktifliğini arttırmak için lütfen müsait isen public odalara değil isen alone odalarına geçer misin?";
      uye.send(text).catch(err => {
        message.channel.send(`${uye} adlı üyeye dmden mesaj atamıyorum. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin.`);
      });
    });
  };
};
module.exports.conf = {
  aliases: ["yetkises", "ytsay", "yt-say"]
};

module.exports.help = {
  name: "sesteki-yetkililer"
};