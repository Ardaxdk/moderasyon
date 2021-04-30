const Discord = require('discord.js')
const db = require('croxydb')
const config = require("../config.json")
const moment = require("moment");
const ms = require('ms')
module.exports.run = async (client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
let embed = new Discord.MessageEmbed().setFooter("Mutlu olduğunda kıskanırmış hayat.").setTimestamp().setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
let no = client.emojis.cache.get(config.carpi)
let yes = client.emojis.cache.get(config.onay)
if (message.author.id != config.sahip) return;

if(!args[0]) {
message.channel.send(embed.setDescription(`<:carpi:${config.carpi}>  Komutu yanlış kullandınız! ${config.prefix}taglıalım aç/kapat`))
return;    
}
if (args[0] === "aç") {
if(db.fetch(`taglıAlım.${message.guild.id}`)) return message.channel.send(embed.setDescription(`${no} Taglı alım sistemi zaten aktif!`))
db.set(`taglıAlım.${message.guild.id}`, "taglıAlım")
message.channel.send(embed.setDescription(`Taglı alım sistemi aktif edildi!`))
return;    
} else if (args[0] === "kapat") {
if(!db.fetch(`taglıAlım.${message.guild.id}`)) return message.channel.send(embed.setDescription(`${no} Taglı alım sistemi zaten devre dışı!`))
db.delete(`taglıAlım.${message.guild.id}`)
message.channel.send(embed.setDescription(`Taglı alım sistemi devre dışı bırakıldı!`))
return;    
};
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["taglıalım"],
  PermLevel: 0
};

 

exports.help = {
  name: "taglıalım",
  description: "taglıalım",
  usage: "taglıalım"
};