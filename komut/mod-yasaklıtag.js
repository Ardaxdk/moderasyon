const Discord = require('discord.js');
const data = require('croxydb');
const config = require('../config.json')

exports.run = async (client, message, args) => {
let prefix = config.prefix
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)
  
if(!args[0]) return message.channel.send(`Yasaklı tag sistemini kullanabilmek için: ${prefix}**yasaklı-tag ekle tag** yazmalısın.`)
let argümanlar = ['ekle', 'çıkar']
if(!argümanlar.includes(args[0])) return message.channel.send(`Sadece ${prefix}**yasaklı-tag ekle**/**çıkar** kullanabilirsin.`)
  
if(args[0] === 'ekle') {
  
const codare = await data.fetch(`banned-tag.${message.guild.id}`)
if(codare) return message.channel.send(`Sadece bir tag ekleyebilirsin.`)
if(!args[1]) return message.channel.send(`Bir tag yazmalısın.`)
  
await data.set(`banned-tag.${message.guild.id}`, args[1])
  
message.channel.send(new Discord.RichEmbed()
.setDescription(`**${args[1]}** tagı yasaklı olarak listeye eklendi.`)
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL)) }
  
  
if(args[0] === 'çıkar') {
  
const codare = await data.fetch(`banned-tag.${message.guild.id}`)
if(!codare) return message.channel.send(`Hiç tag eklememişsin.`)
if(!args[1]) return message.channel.send(`Bir tag yazmalısın.`)
  
await data.delete(`banned-tag.${message.guild.id}`)
  
message.channel.send(new Discord.RichEmbed()
.setDescription(`**${args[1]}** tagı artık yasaklı değil..`)
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL)) }
  

};
exports.conf = { enabled: true,  guildOnly: 0, aliases: [], permLevel: 0 };

exports.help = { name: 'yasaklı-tag' };