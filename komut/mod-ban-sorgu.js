const discord = require("discord.js");
const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("croxydb");
const ms = require("ms");
const config = require('../config.json');
const roller = require('../roller.json');
const kanallar = require('../kanallar.json');
module.exports.run = async(client, message, args)  => {
  let başarısız = new MessageEmbed().setColor("RED").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();
  let başarılı = new MessageEmbed().setColor("GREEN").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();

  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
   
    if(!message.member.roles.cache.has(roller.BanYetki) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;

  if(!message.member.hasPermission('BAN_MEMBERS')) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Bu komutu kullanabilmek için \`Üyeleri Yasakla\` iznine sahip olmalısın!`));
      return
  };

  if(!args[0] || isNaN(args[0])) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin!`));
      return;
  };
  
  try {
    message.guild.fetchBan(args.slice(0).join(' '))
    .then(({ user, reason }) => message.channel.send(başarılı.setDescription(`${user.tag} - (${user.id}) Kullanıcısının Yasaklanma Sebebi;\n \`${reason}\``)))
  } catch(err) { message.channel.send(başarısız.setDescription(`Belirtilen ID numarasına sahip banlanmış kullanıcı bulamadım.`)) }
  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.bansorgu\``);
  };

exports.conf = { enabled: true, guildOnly: true, aliases: ["bansorgu", "bs", "bansrgu"], PermLvl: 0, }

exports.help = { name: 'ban sorgu' };
