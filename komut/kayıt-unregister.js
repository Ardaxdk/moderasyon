const { MessageEmbed } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");
const roller = require("../roller.json");

module.exports.run = async(client, message, args) => {

    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }

    let başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('GREEN').setFooter(`Kullanıcı Başarılı Bir Şekilde Kayıtsıza Atıldı.`)
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('RED').setTimestamp()


    if(!message.member.roles.cache.has(roller.RegisterYetki) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bu komudu kullanmak için hiçbir yetkin bulunamamakta`)).then(msg => msg.delete({timeout: 5000}));
        return;
    };
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Geçerli bir kullanıcı etiketlemelisin!`)).then(msg => msg.delete({timeout: 5000}));
        return;
    };

    if(message.member.roles.highest.position <= member.roles.highest.position) return 
    if(member.manageable)  member.setNickname(`${config.tag} İsim | Yaş`).catch();


    let digerroller = [];
    member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
    await member.roles.remove(digerroller)


    await member.roles.add(roller.kayıtsızRolleri)


    message.channel.send(başarılı.setDescription(`${member} Adlı Kullanıcı ${message.author} Tarafından Kayıtsız'a Atıldı !`)).then(msg => msg.delete({timeout: 4000}));

    message.react(config.onay)

}

 exports.conf = { enabled: true, guildOnly: true , aliases: ["kayıtsız", "unregsiter"]}

 exports.help = { name: "kayıtsız"}