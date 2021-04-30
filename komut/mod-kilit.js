const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
const config = require('../config.json');
const kanallar = require('../kanallar.json');
const roller = require('../roller.json');
const moment = require('moment');
const db = require('croxydb');
const ms = require("ms");

module.exports.run = async(client, message, args) => {
  let başarısız = new MessageEmbed().setColor("RED").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();

  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(roller.EKO)) {
    message.react(config.onay);
    message.channel.send(başarısız.setDescription(`Hiçbir yetkin bulunmamakta.`));
    return;
  };

  let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
  let permObjesi = {};
  let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
  everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
  });
  everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
  });
  if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send(`Kanal Başarılı Bir Şekilde Kilitlendi! <:onay:${config.onay}>`);
  } else {
    permObjesi["SEND_MESSAGES"] = true;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send(`Kanalın Kilidi Başarılı Bir Şekilde Açıldı.! <:onay:${config.onay}>`);
  };
  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.kilit\``);
};
exports.conf = { enabled: true, guildOnly: true, aliases: ["kilit"], permLevel: 0 };

exports.help = { name: "kilit" };