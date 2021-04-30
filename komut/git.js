const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require('../config.json');
const db = require('croxydb');
const kanallar = require('../kanallar.json');
exports.run = async (client, message, args) => {


  if(message.channel.id == kanallar.genelchat) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`Bu komudu bu kanalda kullanamazsın! <#${kanallar.komutkanalı}>`)).then(msg => msg.delete({timeout: 2000}));
    return;
  };

  
if (!message.member.voice.channel) {
return message.reply("Ses kanalında olman lazım!");
}
const filter = (reaction, user) => {
return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.mentions.members.first();
if (!kullanıcı) return message.channel.send('Bir Kullanıcı Belirt.');

let rol = message.mentions.roles.first();
let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send('Etiketlenen Kullanıcı Ses Kanalında Değil.').then(m => m.delete(5000));

  
let log = new Discord.MessageEmbed()
.setColor("#7289D")
.setDescription(`${kullanıcı}, ${message.author} \`${kullanıcı.voice.channel.name}\` Odasına Gelmek İstiyor. Kabul Ediyormusun ?`)
  
let mesaj = await message.channel.send(log)
await mesaj.react("✅")
await mesaj.react("❌")
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === '✅') {
let kabul = new Discord.MessageEmbed()
.setColor("0x348f36")
.setDescription(`${kullanıcı} Odaya Gelmeni Onayladı.`)
message.channel.send(kabul)
message.member.voice.setChannel(kullanıcı.voice.channel.id)
} else {
let cyber = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${kullanıcı} Odaya Gelmeni Onaylamadı.`)
message.channel.send(cyber)
}
})}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["git"],
  permLevel: 0,
}

exports.help = {
  name: "git"
};
