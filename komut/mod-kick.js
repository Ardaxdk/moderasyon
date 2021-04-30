const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const talkedRecently = new Set();
const config = require("../config.json");
const kanallar = require('../kanallar.json');
const roller = require('../roller.json');
const db = require("croxydb");
const ms = require("ms");
const { parseZone } = require("moment");

module.exports.run = (client, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))


    if(!message.member.roles.cache.has(roller.BanYetki) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;


    if(!args[0]) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Bir kullanıcı belirt. <:carpi:${config.carpi}>`)).then(msg => msg.delete({ timeout: 2000 }));
        return;
    };

    let timereplace = args[0];
    let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
    
    db.add('case', 1)
    const kickpuan = db.fetch('case')
   
    
    var tarih = new Date(Date.now())
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now() + tarih2
   
    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let bitişay = moment(tarih3).format("MM")
    let bitişgün = moment(tarih3).format("DD")
    let bitişsaat = moment(tarih3).format("HH:mm:ss")
    let kickatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    
    let cezatipi = `[KİCK]`
    let reason = args.slice(1).join(' ') || "Bir sebep belirtilmedi"
    let user = message.mentions.users.first() || (args[0]) || message.guild.members.find(k => k.user.username.toLowerCase().includes(args[0].toLowerCase())).user
    let member = message.guild.member(user)
    if(!user) return
    if(!member) return
    if(member.roles.highest.position >= message.member.roles.highest.position) {
        message.react(config.carpi);
        message.channel.send(başarısız.setDescription(`Kullanıcı sizinle aynı/üst pozisyon. <:carpi:${config.carpi}>`)).then(msg => msg.delete({ timeout: 2000 }));
        return;
    };

    member.kick({reason: reason})
    db.set(`tarih_${user}`, kickatılma)

      message.channel.send(`<@${member.id}> - (\`${member.id}\`) Kullanıcısı başarılı bir şekilde <@${message.author.id}> - (\`${message.author.id}\`) yetkilisi tarafından sunucudan atıldı! \`#${kickpuan}\``).then(msg => msg.delete({ timeout: 15000 }));
      client.channels.cache.get(kanallar.KickLog).send(Başarılı.setDescription(`<@${member.id}> - (\`${member.id}\`) **Kullanıcısı sunucudan Atıldı**\n• **Atan Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n• **Atılma Nedeni**: \`${reason}\`\n• **Kick Atılma Tarihi**: \`${kickatılma}\`\n• Ceza Bilet Kodu: \`${kickpuan}\``).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
      client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullandığı zaman: \`${kickatılma}\`\n Kullanılan komut: \`.kick\``);

      message.react(config.onay)

      db.push(`ceza.${member.id}`, {
          reason: reason,
          time: kickatılma,
          user: member.id,
          executer: message.author.id,
          type: cezatipi
      })
     
};

exports.conf = { enabled: true, guildOnly: true, aliases: ["kick", "at", "tekmele"], permLvl: 0}

exports.help = { name: 'kick' }