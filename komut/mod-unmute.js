const { MessageEmbed } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");
const kanallar = require('../kanallar.json');
const roller = require('../roller.json');


module.exports.run = async(client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))

    if(!message.member.roles.cache.has(roller.MuteYetkilisi) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;

    let embed = new MessageEmbed().setColor("GREEN").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!member) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bir üye belirtmelisin.`));
        return;
      };
    if(!member.guild.members) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Etiketlediğiniz kullanıcı sunucuda bulunmamaktadır.`));
        return;
      };

    if(!member.roles.cache.has(roller.Muted)) return message.channel.send(embed.setDescription(`Etiketlediğiniz kullanıcı muteli değil.`))

    else {
    member.roles.remove(roller.Muted)
    member.send(`\`>\` \`${config.sunucuadı}\` Sunucusundaki \`Chat Mute\` kaldırıldı. Bir daha yapmaman dileğiyle, iyi eğlenceler.`)
    message.channel.send(`<@${member.id}> - (\`${member.id}\`) adlı kullanıcının mutesi başarılı bir şekilde <@${message.author.id}> - (\`${message.author.id}\`) Yetkilisi tarafından kaldırıldı.`).then(msg => msg.delete({timeout: 15000}))

    client.channels.cache.get(kanallar.MuteLog).send(Başarılı.setDescription(`<@${member.id}> - (\`${member.id}\`) **Kullanıcısı yazılı kanallarda susturulması Kaldırıldı**`).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
    client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.unmute\``);
  }
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["ugnmute"] }

exports.help = { name : "unmfute" }