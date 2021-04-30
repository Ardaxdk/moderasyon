const { MessageEmbed } = require('discord.js')
const datab = require('croxydb')
const config = require("../config.js")
const moment = require("moment");
const ms = require('ms')

module.exports.run = async (client, message, args) => {
  const hataembed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setDescription(`${message.author}, Bu Komutu Kullanamazsın!`).setTimestamp()
  if(!message.member.roles.cache.has(config.kayıtcırol) && !message.member.roles.cache.has(config.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(hataembed)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(new MessageEmbed()
        .setColor('2f3136').setDescription(`${message.author}, Bir Kullanıcı Belirt!`).setTimestamp())
    const lore = message.guild.member(member)
    
  let nick = args.slice(1).join(' ');
  if(!nick) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${message.author}, Bir İsim Belirt!`).setColor('2f3136'))
   
  
  if(lore.user.username.includes(config.tag)) {
    lore.setNickname(`${config.tag} ${nick}`)
} else {
  lore.setNickname(`${config.tag2} ${nick}`)
}
const embedd = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setColor('2f3136').setTimestamp()
.setDescription(`${lore}, Kullanıcısının İsmi Başarıyla \`"${nick}"\` Olarak Değiştirildi`)
message.channel.send(embedd).then(m => m.delete({timeout: 70000}))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["i", "isim"],
  PermLevel: 0
};

 

exports.help = {
  name: "i",
  description: "i",
  usage: "i"
};