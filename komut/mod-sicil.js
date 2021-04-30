const { MessageEmbed } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");
const roller = require('../roller.json');
const kanallar = require('../kanallar.json');

module.exports.run = async(client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()

  if(!message.member.roles.cache.has(roller.botcommander) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) {
    message.react(config.onay);
    message.channel.send(başarısız.setDescription(`Bu Komudu Kullanabilmek İçin Hiçbir Yetkin Bulunmamakta. <:carpi:${config.carpi}>`));
    return;
  };
 
  let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.author;
  let sayi = 1;
  let cezadata = db.fetch(`ceza.${member.id}`)
  if(!cezadata) return   message.channel.send(new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.author.tag,message.author.avatarURL({dynaic: true})).setDescription(`Üyenin ceza kaydı \`Kalbi\` kadar temiz.`))

  let cezaliste = cezadata.filter(x => x.user === member.id).map(x => `\`${sayi++}.\` **${x.type}** Sebep: \`${x.reason}\` Tarih: ${x.time} Yetkili: <@${x.executer}>`).join("\n")
  let yazi = `Belirtilen üyenin ceza geçmişi.`
 
  message.channel.send(new MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription(`\`>\` ${yazi} \n\n ${cezaliste}`))

  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.sicil\``);
  
}

exports.conf = { enabled: true, guildOnyl: true, aliases: ["sicil"] }

exports.help = { name: "sicil" }