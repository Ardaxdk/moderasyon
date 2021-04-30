const { MessageEmbed } = require("discord.js");
const config = require('../config.json');
const db = require('croxydb');
const kanallar = require('../kanallar.json');

module.exports.run = (client, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))


    if(message.channel.id == kanallar.genelchat) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bu komudu bu kanalda kullanamazsın! <#${kanallar.komutkanalı}>`)).then(msg => msg.delete({timeout: 2000}));
        return;
      };

    let embed = new MessageEmbed().setColor("RANDOM")
	let member = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let avatar = member.avatarURL({ dynamic: true, size: 2048 });
    
    message.channel.send(embed .setAuthor(member.tag, avatar).setDescription(`[Resim Adresi](${avatar})`).setImage(avatar).setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true })))
    
    client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.avatar\``);
 	
}

exports.conf = { enabled: true, guildOnly: true, aliases:["avatar", "av", "pp"] }

exports.help = { name: "avatar"}