const Discord = require('discord.js');
const ayarlar = require('../config.json');
//Yashinu Akame Owner
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Bu komutu kullanabilmek için `Üyeleri Yasakla` iznine sahip olmalısın!');
  //Komutu herkesin kullanabilmesini istiyorsanız üst satırı kaldırabilirsiniz.
  let yashinu = await require('croxydb').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  try {
    message.guild.fetchBans()
    .then(bans => {
      message.channel.send(`# Sunucudan yasaklanmış kişiler; ⛔\n\n${bans.map(c => `${c.id} | ${c.tag}`).join("\n")}\n\n # Toplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true})
    })
    } catch (err) {
     message.channel.send(`Yasaklı kullanıcı bulunmamakta!`)
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ban-list', 'banliste'],
  permLevel: 0
};

exports.help = {
  name: 'ban-liste',
  description: "Sunucudaki tüm banları düzenli bir şekilde listeler.",
  usage: 'ban-liste',
  kategori: 'yetkili'
};
