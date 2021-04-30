const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('croxydb')
const moment = require('moment')
const ms = require('ms')
const config = require("../config.json")
const kanallar = require('../kanallar.json')
const roller = require('../roller.json')

module.exports.run = async (client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  let başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('GREEN').setFooter(`Başarılı Bir Şekilde Jail'e Atıldı.`)
  let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('RED').setFooter(`İşlem Başarısız ❌`)


if(!message.member.roles.cache.has(roller.VMuteYetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return;

let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

  if(!args[0]) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`Bir Kullanıcı Belirt.`));
    return;
  };
  let mention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!mention) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`${args[0]}, kullanıcısını bu sunucuda bulamıyorum.`));
    return;
  };
  if(mention.roles.highest.position >= message.member.roles.highest.position) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.`));
    return;
  };

  let cezatipi = `[VOICE-MUTE]`
  if(!args[1]) return message.reply('Bir Süre Belirt.(\`1s, 1m, 1h, 1d, 1y\`) ')
  let timereplace = args[1];
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')

  let reason;
  if(!args[2]) reason = 'Belirtilmedi'
  if(args[2]) reason = args.slice(2).join(' ')
 
  db.add('case', 1)
  const vmutepuan = await db.fetch('case')

 moment.locale("tr")
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2
 let atılmaay = moment(Date.now()).format("MM")
 let atılmagün = moment(Date.now()).format("DD")
 let atılmasaat = moment(Date.now()).format("HH:mm:ss")
 let bitişay = moment(tarih3).format("MM")
 let bitişgün = moment(tarih3).format("DD")
 let bitişsaat = moment(tarih3).format("HH:mm:ss")
 let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
 let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``


if(!mention.voice.channel) {
  message.react(config.carpi);
  message.channel.send(başarısız.setDescription(`Etiketlediğiniz kullanıcı herhangi bir sesli kanalda bulunmamaktadır.`));
  return;
};



if(mention.voice.channel) {
  
  db.set(`seslide2.${mention.user.id}.${message.guild.id}`, timereplace)
  message.channel.send(`<@${mention.id}> - (\`${mention.id}\`) Kullanıcısı başarılı bir şekilde <@${message.author.id}> - (\`${message.author.id}\`) yetkilisi tarafından sesli kanallarda susturuldu! \`#${vmutepuan}\``).then(msg => msg.delete({ timeout: 15000 }));
  client.channels.cache.get(kanallar.MuteLog).send(Başarılı.setDescription(`<@${mention.id}> - (\`${mention.id}\`) **Kullanıcısı sesli kanallarda susturuldu**\n• **Susturan Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n• **Susturulma Nedeni**: \`${reason}\`\n• **Susturma Atılma Tarihi**: \`${muteatılma}\`\n• **Ceza Bilet Kodu**: \`#${vmutepuan}\``).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullandığı zaman: \`${muteatılma}\`\n Kullanılan komut: \`.vmute\``);
  mention.send(`\`>\` \`${config.sunucuadı}\` Sunucusundan Sesli Kanallarda Susturuldun. Susturulma Nedenin: \`${reason}\` Eğer haksız susturulduğunu düşünüyorsan, üst yetkililerle iletişime geçebilirsin.`)

  message.react(config.onay)

  mention.voice.setMute(true)



  setTimeout(async () => {
    if(!await db.fetch(`seslide2.${mention.user.id}.${message.guild.id}`)) return;
    if(mention.voice.channel == undefined) {
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.atılma`, muteatılma)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.bitiş`, tarih3)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan1`, message.author.tag)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan2`, message.author.avatarURL({ dynamic: true }))
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.süre`, time)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.sebep`, reason)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.timereplace`, timereplace)
    client.channels.cache.get(kanallar.VMuteLog).send(Başarılı.setDescription(`(<@${mention.id}> - \`${mention.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.\n• **Susturan**: <@${message.author.id}> - \`(${message.author.id})\`\n• **Susturulma Nedeni**: \`${reason}\`\n• **Susturulma Atılma Tarihi**: \`${muteatılma}\`\n• **Susturulma Bitiş Tarihi**: \`${mutebitiş}\``).setFooter(`Kullanıcının Ceza Bilgilerine Ulaşmak İçin .sicil id/etiket Yazarak Kontrol Edebilirsiniz.`).setColor("RANDOM"))
  } else if(mention.voice.channel) {
  db.delete(`seslide2.${mention.user.id}.${message.guild.id}`)

  mention.voice.setMute(false);
  mention.send(`\`>\` \`${config.sunucuadı}\` Sunucusundaki \`Voice Mute\` kaldırıldı. Bir daha yapmaman dileğiyle, iyi eğlenceler.`)
  client.channels.cache.get(kanallar.VMuteLog).send(Başarılı.setDescription(`<@${mention.id}> - (\`${mention.id}\`) **Kullanıcısı sesli kanallarda susturulması Kaldırıldı**`).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
}
  }, ms(timereplace)) }

  db.push(`ceza.${mention.id}`, {
    reason: reason,
    time: muteatılma,
    user: mention.id,
    executer: message.author.id,
    type: cezatipi
  })

  
};
exports.conf = { enabled: true, guildOnly: true, aliases: ["voicemute"], }

exports.help = { name: "eski-ivmute" }