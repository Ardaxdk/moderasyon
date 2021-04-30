const Discord = require('discord.js');


exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.MessageEmbed()
.setDescription('Kullanım: basvuru Yetkili olma sebebinizi belirtiniz!  '));
const embed = new Discord.MessageEmbed()
.setColor('BLACK')
.setDescription('Başvurunuz Bildirildi! <a:tik_3:796326520909463563> ')
message.channel.send(embed)
const embed2 = new Discord.MessageEmbed()
.setColor("BLACK")
.setFooter('Başvuru Sistemi', client.user.avatarURL())
.setDescription(`<a:9851_Loading:800313426697519165>  **${message.author.tag}** Adlı Kullanıcıdan Başvuru İsteği Aldım:`)
.addField(`Kullanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nİlgilenecek Yetkili: <@&738122168788844585> `)
.addField("Başvuru Açıklaması", type)
.setTimestamp()
.setThumbnail(message.author.avatarURL())
client.channels.cache.get('814593432852627478').send(embed2); // Kanal ID 

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["başvuru","başvur"],
  permLevel: 0 
};

exports.help = {
  name: 'basvuru',
  description: 'Başvuru de bulunursunuz.',
  usage: 'basvuru <Basvuru>'
};
