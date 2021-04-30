const Discord = require("discord.js");
const config = require('../config.json');
module.exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
  new Discord.MessageEmbed()
  .setDescription(`yetkin yok`))
  let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!kullanıcı) return message.channel.send(
  new Discord.MessageEmbed()
  .setDescription(`Bir üye belirtmelisin.`))
  let kullanıcıkanal = kullanıcı.voice.channel
  if(!kullanıcıkanal) return message.channel.send(
  new Discord.MessageEmbed()
  .setDescription(`Sesli kanalda olmassa bağlantısını nası kescen ?`))
  
  kullanıcı.voice.kick(args[0])
  message.channel.send(
  new Discord.MessageEmbed()
     .setAuthor(kullanıcı.author.tag, kullanıcı.author.displayAvatarURL({ dynamic: true }))
  .setDescription(`<@${kullanıcı.id}> üyesi kanaldan atıldı.`))
    
  };
exports.conf = {
  aliases: ["kes"]
};
exports.help = {
  name: 'kes'
};
