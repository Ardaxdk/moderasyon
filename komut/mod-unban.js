const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const roller = require('../roller.json');
const kanallar = require('../kanallar.json');
const db = require('croxydb');
const prefix = config.prefix;

module.exports.run = async(client, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))

    if(!message.member.roles.cache.has(roller.BanYetki) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;
    const tagged = message.mentions.members.first() || args[0]
    let member = tagged || args[0]

    const bans = await message.guild.fetchBans(true)

    const bannedmember = bans.find(m => `${m.user.username}#${m.user.discriminator}` == member || m.user.id === member)

    if(bannedmember === undefined) {

        return message.channel.send(new MessageEmbed().setDescription("Belirtilen üye yasaklı değil.").setColor("RED").setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true }))).then(message => message.delete({ timeout: 15000})) 
    }
   
    try{
        message.guild.members.unban(bannedmember.user)
        let embed = new MessageEmbed().setColor("GREEN").setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true })).setDescription("<@"+member+"> Üyesinin Yasağı Başarılı Bir Şekilde Kaldırıldı.")
       message.channel.send(embed).then(message => message.delete({ timeout: 15000}))
       client.channels.cache.get(kanallar.BanLog).send(Başarılı.setDescription("<@"+member+"> Kullanıcısının Yasağı Başarılı bir Şekilde Kaldırıldı\n **Kaldıran Yetkili**: <@"+message.author.id+"> - (\`"+message.author.id+"\`)").setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`));
       client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.unban\``);
    }
    catch(err){
        console.log(err.message)
    }
}
    
    exports.conf = { enabled: true, guildOnly: true, aliases: ["unban"], PermLvl: 0, };
    
    exports.help = { name: 'uban' };