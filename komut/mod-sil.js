const { MessageEmbed } = require("discord.js");
const config = require('../config.json');
const db = require('croxydb');
const kanallar = require('../kanallar.json');
const roller = require('../roller.json')
exports.run = async(client, message, args, ayar, emoji) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp();
  if (!message.member.roles.cache.has(roller.botcommander) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!")).then(x => x.delete({timeout: 5000}));
  if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(embed.setDescription("1-100 arasında silinecek mesaj miktarı belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  await message.delete().catch();
  message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(`Başarılı bir şekilde \`${msjlar.size}\` tane mesaj silindi. <:onay:${config.onay}>`).then(x => x.delete({timeout: 1000}))).catch()
  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.sil\``);
};
exports.conf = { aliases: ["sil", 'clear'], usage: "temizle 1-100", description: "Belirtilen mesaj sayısı kadar mesaj temizler." }

exports.help = { name: "temizle" };