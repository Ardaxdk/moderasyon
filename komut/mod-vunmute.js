const { MessageEmbed } = require("discord.js")
const db = require("croxydb")
const config = require("../config.json")
const kanallar = require('../kanallar.json')
const roller = require('../roller.json')

module.exports.run = async(client, message, args) => {
  let başarısız = new MessageEmbed().setColor("RED").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();
  let Başarılı = new MessageEmbed().setColor("GREEN").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();

  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }

    if(!message.member.roles.cache.has(roller.VMuteYetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return;


   
    let mention = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(user => user.user.username.toLowerCase().includes(args[0].toLowerCase()))
    if(!mention) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`${args[0]}, kullanıcısını bu sunucuda bulamıyorum. <:carpi:${config.carpi}>`));
        return;
      };
    if(mention.roles.highest.position >= message.member.roles.highest.position) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda. <:carpi:${config.carpi}>`));
        return;
      };
    if(!mention.voice.channel) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Etiketlediğiniz kullanıcı herhangi bir sesli kanalda bulunmamaktadır. <:carpi:${config.carpi}>`));
        return;
      };
    
    if(!mention.voice.setMute(true)) return message.channel.send(new MessageEmbed().setDescription(`${mention} (\`${mention.id}\`) adlı kullanıcı susturulmuş değil.`))
    if(mention.voice.channel) { 
     db.delete(`seslide2.${mention.user.id}.${message.guild.id}`)
     mention.voice.setMute(false);

  mention.send(`\`>\` \`${config.sunucuadı}\` Sunucusundaki \`Ses Mute\` kaldırıldı. Bir daha yapmaman dileğiyle, iyi eğlenceler.`)
  message.channel.send(`<@${mention.id}> - (\`${mention.id}\`) adlı kullanıcının mutesi başarılı bir şekilde <@${message.author.id}> - (\`${message.author.id}\`) Yetkilisi tarafından kaldırıldı.`).then(msg => msg.delete({timeout: 15000}))

  client.channels.cache.get(kanallar.VMuteLog).send(Başarılı.setDescription(`<@${mention.id}> - (\`${mention.id}\`) **Kullanıcısı sesli kanallarda susturulması Kaldırıldı**`).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.vunmute\``);

  message.react(config.onay)
    }
   
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["vyhhmute"] }

exports.help = { name: "vunmggye" }