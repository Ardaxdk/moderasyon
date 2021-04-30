const { MessageEmbed } = require('discord.js');
const config = require("../config.json");
const roller = require("../roller.json");
const kanallar = require("../kanallar.json");

exports.run = async (client, message, args) => {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}

    let embed = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({dynamic: true})).setColor("RANDOM")
    
    let BoosterRol = roller.booster
    let KayıtYetkilisi = roller.RegisterYetki
    let ErkekRol = roller.erkekrolleri
    let KızRol = roller.kızrolleri

    if (!message.member.roles.cache.has(KayıtYetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Komutu kullanabilmek için **Kayıt Yetkilisi** olman lazım.")
   
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1]
    let yaş = Number(args[2]);

    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`Lütfen tüm argümanları düzgün yerleştiriniz ve tekrar deneyiniz.\nÖrnek: \`${config.prefix || '.'}e @Lore/ID İsim Yaş\``)).then(x => x.delete({timeout: 10000}));

        const msg = await message.channel.send(new MessageEmbed().setDescription("Kullanıcının cinsiyetini emojiye basarak belirtiniz!").setColor('RANDOM').setTimestamp().setFooter(`Lore ❤️ Cyber`))
        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        await msg.react(':erkek:810654591426756679') //erkek emojisi
        await msg.react(':kiz:810654590822645830') //kız emojisi

        collector.on("collect", async(reaction, user) => {
            await msg.reactions.removeAll()
            if (reaction.emoji.id == '810654591426756679') { //erkek
                member.setNickname(`${isim} | ${yaş}`).catch();
                
                let erkekRol = message.guild.roles.cache.get(ErkekRol);
                if (erkekRol) {
                    member.roles.cache.has(BoosterRol) ? member.roles.set([BoosterRol, ErkekRol]) : member.roles.set([ErkekRol]);
                }
                msg.edit(new MessageEmbed().setDescription(`${member} adlı üye sunucumuza **erkek** olarak kaydedilmiştir.`).setColor('00b1ff'))
            }

            if (reaction.emoji.id == '810654590822645830') { //kız
                member.setNickname(`${isim} | ${yaş}`).catch();

                let kadinRol = message.guild.roles.cache.get(KızRol);
            if (kadinRol) {
                member.roles.cache.has(BoosterRol) ? member.roles.set([BoosterRol, KızRol]) : member.roles.set([KızRol]);
            }
                return msg.edit(new MessageEmbed().setDescription(`${member} adlı üye sunucumuza **kadın** olarak kaydedilmiştir.`).setColor('e100ff'))
            }
        })
    }

exports.conf = { enable: true, guildOnly: true, aliases: ["bakımda"] }

exports.help = { name: "bakımda" }
