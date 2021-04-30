const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

if(!["809549857953939467"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));


  
  let phentos = "**Sesli Kanalda Olan Yetkililer:**\n";
  let phentos2 = "**Sesli Kanalda Olmayan Yetkililer:**\n";
  message.guild.roles.cache.get("806589780368031795").members.map(r => { //herkeste olan rolü yazın.
    phentos += r.voice.channel ? "•  <@" + r.user.id + ">\n" : "";
    phentos2 += !r.voice.channel ? "•  <@" + r.user.id + ">\n" : "";
  });

  const phentosembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription("" + phentos + "" + phentos2 + "")
  message.channel.send(phentosembed).then(s => s.s);
};
module.exports.conf = {
  aliases: ["embedsay"]
};

module.exports.help = {
  name: "embedytsay"
};
