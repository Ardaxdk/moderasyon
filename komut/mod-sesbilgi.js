const { MessageEmbed } = require("discord.js")
const db = require("croxydb")
const config = require("../config.json")
const kanallar = require('../kanallar.json')

module.exports.run = async(client, message, args) => {

    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }

    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bu Komutu Kullanmak İçin Hiçbir Yetkin Bulunmamakta.`));
        return;
    };
    let member = message.mentions.members.first()
    if(!args[0]) return;
    if(!member) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bir kullanıcı etiketlemelisin`));
        return;
    };
    if(!member.guild.members) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Sunucuda Bulunan Bir Kullanıcıyı Etiketlemelisin.`));
        return;
    };
    if(!member.voice.channel) return message.channel.send(Başarılı.setDescription(`${member} adlı kullanıcı herhangi bir ses kanalında bulunmuyor.`))


    else {

    if(member.voice.channel) 
    message.channel.send(Başarılı.setDescription(`${member} adlı kullanıcı \`${member.voice.channel.name}\` adlı kanalda bulunuyor.`));

    client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.seskontrol\``);
    }

}

exports.conf = { enabled: true, guildOnly: true, aliases: ["sesbilgi", "n", "seskontrol", "ses-kontrol"] }

exports.help = { name: "sesbilgi"}