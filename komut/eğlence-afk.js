const Discord = require("discord.js");
const db = require("croxydb");
const roller = require('../roller.json');
const config = require("../config.json");

exports.run = async (client, message, args) => {
  const i = roller.kayıtsızRolleri
  if(message.member.roles.cache.has(kayıtsızrolunugir)) return message.channel.send(`**Bu Komutu Kullanmak İçin Kayıt Olman Lazım**`)
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;
  const sebep = args[1];
  if (!args[1]) {
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const fey = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, "Sebep Girilmemiş");
    await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id);
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, fey);
    const afksebeb = await db.fetch(`afkSebep_${message.author.id}_${message.guild.id}`);
    message.channel.send(new Discord.MessageEmbed().setDescription(`Afk Oldunuz.\nSebep: ${afksebeb}`).setColor('2f3136'));
    message.member.setNickname(`[AFK] ` + fey);
  }
  if (args[1]) {
    let sebep = args.join(" ");
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const fey = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id);
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, fey);
    const afksebeb = await db.fetch(`afkSebep_${message.author.id}_${message.guild.id}`);
    message.channel.send(new Discord.MessageEmbed(`Afk Oldunuz\nSebep: ${afksebeb}`).setColor('2f3136'));
    message.member.setNickname(`[AFK] ` + fey);
  }
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: "afk",
  description: "",
  usage: ""
}; 