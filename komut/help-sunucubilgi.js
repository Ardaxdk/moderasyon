const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require('../config.json');
const db = require('croxydb');

module.exports.run = (client, message, args) => {

  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  
  let ekipRolu = config.taglırol || undefined;
  const embed = new MessageEmbed().setTimestamp().setColor('RANDOM').setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setDescription(`**Toplam Üye:** \`${message.guild.memberCount}\`\n**Aktif Üye:** \`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}\`\n**Kanallar:** \`${message.guild.channels.cache.size}\` \`(${message.guild.channels.cache.filter(c => c.type === "text").size}\` **yazı**, \`${message.guild.channels.cache.filter(c => c.type === "voice").size}\` **Sesli**)\n**Roller:** \`${message.guild.roles.cache.size}\`\n**Oluşturulma Tarihi:** \`${moment(message.guild.createdAt).format('DD/MM/YYYY HH.mm.ss')}\``);
  message.channel.send(embed);
  client.channels.cache.get(config.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.sunucubilgi\``);
};

exports.conf = { enable: true, guildOnly: true, aliases: ["sunucubilgi", "s-istatistik"] }

exports.help = { name: 'sunucubilgi' }