const { MessageEmbed } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");
const kanallar = require('../kanallar.json');
const roller = require('../roller.json');

module.exports.run = async(client, message, args) => {
  let Başarılı = new MessageEmbed().setColor("GREEN").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setTimestamp();

    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
   
    if(!message.member.roles.cache.has(roller.JailHammer) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;

    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) 
    if(!member) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL).setDescription("Eksik argüman girildi, Bir üye belirtip tekrar deneyin.").setColor(message.member.displayHexColor)).then(m => m.delete({timeout:10000}))
    if(member.hasPermission("ADMINISTRATOR")) return
    if(!member.roles.cache.has(roller.Karantina) && !member.roles.cache.has(roller.Cezalı)) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL).setDescription("Etiketlediğin kullanıcı cezalıda değil.").setColor(message.member.displayHexColor)).then(m => m.delete({timeout:10000}))
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");
   
        else {
    if(member.roles.cache.has(roller.karantina)) 
    member.send(`\`>\` \`${config.sunucuadı}\` Sunucusundaki \`Jail\` kaldırıldı. Bir daha yapmaman dileğiyle, iyi eğlenceler.`)
    message.channel.send(`<@${member.id}> - (\`${member.id}\`) Kullanıcısı Başarılı Bir Şekilde Jailden Çıkarıldı`).then(msg => msg.delete({timeout:15000}));

    client.channels.cache.get(kanallar.JailLog).send(Başarılı.setDescription(`<@${member.id}> - (\`${member.id}\`) **Kullanıcısı jail'den çıkartıldı**`).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
    client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.unjail\``);
   
    let roller = db.fetch(`cezarolleri.${member.id}`)
    await member.roles.set(roller)
    await member.roles.add(roller.Unregister)
   
    await db.delete(`cezarolleri.${member.id}`)
    await db.delete(`jail_${member.id}`)



}

   message.react(config.onay)
}


exports.conf = { enabled: true, guildOnly: true, aliases: ["cezakaldır", "gygyyyjail"] }

exports.help = { name: "eskiunjail" }