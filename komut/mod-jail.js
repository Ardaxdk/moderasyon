const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("croxydb");
const config = require("../config.json");
const kanallar = require('../kanallar.json');
const roller = require('../roller.json');
const moment = require('moment')

module.exports.run = async (client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))


  if(!message.member.roles.cache.has(roller.JailHammer) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`Bu Komudu Kullanabilmek İçin Hiçbir Yetkin Bulunmamakta. `));
    return;
  };
    let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kişi) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Jail'e Kimi Atmam Gerekiyor?`));
      return;
    };
    if(!kişi.roles.highest.position >= message.member.roles.highest.position) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Bu Kullanıcı Senden Daha Üst Pozisyonda. `));
      return;
    };
    
    let zaman1 = args[1];
    if(!zaman1) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Bir süre belirtmelisin.\n1s, 1m, 1h, 1d, 1y`));
      return;
    };
    
    if(!message.member.hasPermission('ADMINISTRATOR')) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Yönetici yetkisine sahip birini banlayamam. `))
      return;
  };

    zaman1 = zaman1.replace("sn","s").replace("dk","m").replace("sa","h").replace("g","d");
    zaman1 = zaman1.replace("saniye","s").replace("dakika","m").replace("saat","h").replace("gün","d");

    let timereplace = args[1];
    let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')

    db.add('case', 1)
    const jailpuan = db.fetch('case')


    let reason;
    var tarih = new Date(Date.now())
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now() + tarih2


    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let bitişay = moment(tarih3).format("MM")
    let bitişgün = moment(tarih3).format("DD")
    let bitişsaat = moment(tarih3).format("HH:mm:ss")
    let jailatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let jailbitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
    moment.locale('tr');
    var vakit = zaman1.replace("y", "yıl").replace("m", " dakika").replace("s", " saniye").replace("h", " saat").replace("d", " d");



    let cezatipi = `[JAIL]`
    let zaman = args[1]
    if(!args[1]) return message.channel.send(`Ne kadar süre jailde duracağını belirtmelisin.\nÖrnek: ${prefix}jail kişi süre sebep`)
    let sebep = args.join(``).slice(args[1].length+args[0].length)
    if(!sebep) {
      message.react(config.carpi);
      message.channel.send(başarısız.setDescription(`Sebep Belirtmelisin !`));
      return;
    };
    kişi.send(`\`>\` \`${config.sunucuadı}\` Sunucusundaki \`Jail\` kaldırıldı. Bir daha yapmaman dileğiyle, iyi eğlenceler.`)
    message.channel.send(`<@${kişi.id}> - \`${kişi.id}\` Kullanıcısı başarılı bir şekilde <@${message.author.id}> - (\`${message.author.id}\`) yetkilisi tarafından jaile atıldı. \`#${jailpuan}\``).then(msg => msg.delete({ timeout: 15000 }));
    client.channels.cache.get(kanallar.JailLog).send(Başarılı.setDescription(`<@${kişi.id}> - (\`${kişi.id}\`) **Kullanıcısı sunucudan jail'e atıldı**\n• **Atan Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n• **Atılma Nedeni**: \`${sebep}\`\n• **Jail Atılma Tarihi**: \`${jailatılma}\`\n• **Jail Bitiş**: \`${jailbitiş}\`\n• **Ceza Bilet Kodu**: \`#${jailpuan}\``).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
    kişi.send(`\`${config.sunucuadı}\` Sunucusunda jail'e atıldın. Jaile atılma nedenin: \`${reason}\`. Eğer haksız bir durum düşünüyorsan, üst yetkililer ile iletişime geçebilirsin.`)
    client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullandığı zaman: \`${jailatılma}\`\n Kullanılan komut: \`.jail\``);
  
    kişi.roles.add(roller.karantina);
    kişi.roles.cache.forEach(r => { kişi.roles.remove(r.id)
    db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    setTimeout(async () =>{
    kişi.roles.remove(roller.karantina)
    }, ms(zaman));
    setTimeout(async () =>{
    message.guild.roles.cache.forEach(async r => {
    const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
    if(i != r.id)  return ;
    if(i){kişi.roles.add(i)}//kendi rollerini veriyor
    db.delete(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`)
    })
    }, ms(zaman));



    db.push(`ceza.${kişi.id}`, {
        reason: sebep,
        time: jailatılma,
        user: kişi.id,
        executer: message.author.id,
        type: cezatipi
      })
}

exports.conf = { enabled: true, guildOnly: false, aliases: ["eskojail"] }

exports.help = { name: "eskijail" }