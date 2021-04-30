const { MessageEmbed } = require("discord.js")
const config = require("../config.json");
const db = require('croxydb');
const kanallar = require('../kanallar.json');

module.exports.run = async(client, message, args) => {

    let başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('GREEN').setFooter(`Başarılı Bir Şekilde Bağlantısı Kesildi.`)
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('RED').setFooter(`İşlem Başarısız ❌`)
  
    if(!message.member.hasPermission("ADMINISTRATOR")) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`Bu komudu kullanmak için hiçbir yetkin bulunmamakta.`));
    return;
    };

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;

    let pub = message.guild.channels.cache.filter(x => x.parentID === "807927155907362840v");
    let public = 0;
    for (const [id, voiceChannel] of pub)
    public += voiceChannel.members.size;

    let priv = message.guild.channels.cache.filter(x => x.parentID === "807927156646477865");
    let privkanalları = 0;
    for (const [id, voiceChannel] of priv)
    privkanalları += voiceChannel.members.size;

    const embed = new MessageEmbed().setColor("BLACK").setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))

    message.channel.send(embed.setDescription(`• Sesli kanallarda \`${count}\` kişi var.\n\n• Public Ses Kanallarında Toplam \`${public}\` Üye Bulunmakta.\n• Priv Kanallarında Toplam \`${privkanalları}\` Üye Bulunmakta.`))

    client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.ses\``);
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["ses"]}

exports.help = { name: "ses" }