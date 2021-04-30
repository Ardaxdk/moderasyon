const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
 if(!messge.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkinyok);
let everyone = msg.guild.roles.cache.find(a => a.name === '@everyone');
message.channel.updateOverwrite(everyone, { 'VIEW_CHANNEL': false });
 const embed = new Discord.MessageEmbed()
.setColor('RED')
.setTitle(":lock:  Kanal Görünütlenmeye Kapatıldı ")
message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'kanal-kapat'
};

