const { MessageEmbed, Message } = require("discord.js");
const ms = require("ms");
const db = require("croxydb");
const moment = require('moment')
const momentt = require("moment-duration-format")
const config = require('../config.json')
const kanallar = require('../kanallar.json')
const roller = require('../roller.json')

exports.run = async (client, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
    let başarısız = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
    let Başarılı = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))


if(!message.member.roles.cache.has(roller.MuteYetkilisi) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;

let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!kişi) return 

if(kişi.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");

if(!message.member.hasPermission('ADMINISTRATOR')) {
    message.react(config.carpi);
    message.channel.send(başarısız.setDescription(`Yönetici yetkisine sahip birini susturamam. `))
    return;
};

db.add('case', 1)
const mutepuan = db.fetch('case')

let cezatipi = `[CHAT-MUTE]`
    moment.locale("tr")
    if (!args[1]) return message.reply('Bir süre belirt. (\`1s, 1m, 1h, 1d, 1y\`)')
    let timereplace = args[1];
    let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
    let reason;
    if(!args[2]) reason = 'Belirtilmedi'
    if(args[2]) reason = args.slice(2).join(' ')
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


    let muted = message.mentions.members.first() || message.guild.members.cache.find(c => c.id === args[0]);
    if (!muted) {
        message.reply("lütfen susturulacak üyeyi etiketleyiniz.");
    } else {
        if (muted.roles.highest.position >= message.member.roles.highest.position) {
            message.reply("bu kullanıcı senden daha üst pozisyonda.");
        } else {
            let mutezaman = args[1].replace("sn", "s").replace("dk", "m").replace("sa", "h").replace("gün", "d");
            if (!mutezaman) {
                message.reply("bir zaman girmediniz!");
            } else {
                let sebep = args.slice(2).join(" ") || "Belirtilmedi"
                

                let vakit = mutezaman.replace("m", " dakika").replace("s", " saniye").replace("h", " saat").replace("d", " d");


                try {
                message.channel.send(`<@${member.id}> - (\`${member.id}\`) Kullanıcısı başarılı bir şekilde <@${message.author.id}> - (\`${message.author.id}\`) yetkilisi tarafından yazılı kanallarda susturuldu! \`#${mutepuan}\``).then(msg => msg.delete({ timeout: 15000 }));
                client.channels.cache.get(kanallar.MuteLog).send(Başarılı.setDescription(`<@${member.id}> - (\`${member.id}\`) **Kullanıcısı yazılı kanallarda susturuldu**\n• **Susturan Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n• **Susturulma Nedeni**: \`${reason}\`\n• **Susturma Atılma Tarihi**: \`${muteatılma}\`\n• **Ceza Bilet Kodu**: \`#${mutepuan}\``).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
                client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullandığı zaman: \`${muteatılma}\`\n Kullanılan komut: \`.mute\``);
                member.send(`\`>\` \`${config.sunucuadı}\` Sunucusundan \`Chat Mute\` Yedin. Susturulma Nedenin: \`${reason}\` Eğer haksız susturulduğunu düşünüyorsan, üst yetkililerle iletişime geçebilirsin.`)
                 message.react(config.onay)  

                muted.roles.add(roller.Muted);
                } catch (e) {
                    console.log(e);
                }

db.push(`ceza.${member.id}`, {
    reason: sebep,
    time: muteatılma,
    user: kişi.id,
    executer: message.author.id,
    type: cezatipi
  })

                setTimeout(async function () {
                    member.send(`\`>\` \`${config.sunucuadı}\` Sunucusundaki olan \`Chat Mute\` kaldırıldı. Bir daha yapmaman dileğiyle, iyi eğlenceler.`)
                    muted.roles.remove(
                        roller.Muted,
                        client.channels.cache.get(kanallar.MuteLog).send(Başarılı.setDescription(`<@${member.id}> - (\`${member.id}\`) **Kullanıcısı yazılı kanallarda susturulması Kaldırıldı**`).setFooter(`.sicil @kullanıcı yaparak kullanıcının sicil kayıdını görüntülüyebilrisiniz.`))
                    );
                }, ms(mutezaman));
            }
        }
    }


}

exports.conf = { enabled: true, guildOnly: true, aliases: ["eski-mute"], permLevel: 0 }

exports.help = { name: "mute"}