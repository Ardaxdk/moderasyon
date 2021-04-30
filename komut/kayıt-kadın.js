const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");
const kanallar = require('../kanallar.json');
const roller = require('../roller.json');
const ability = require('../ability.json');

exports.run = async (client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  if (
    !message.member.roles.cache.has(roller.RegisterYetki) &&
    !message.member.hasPermission("ADMINISTRATOR")
  ) //cache
return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`Komutu kullanmaya yetkin yeterli değil!`)
      .setColor("BLACK")
      );
 let lore1 =
    message.mentions.users.first() ||
    client.users.cache.get(args.join(" ")) ||
    message.guild.members.cache.find(c => c.id === args[0]);
 if (!lore1)
  return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .kız @zara/id İsim Yaş`)
  .setColor("BLACK")
  );
  const nick = args[1];
  const yas = args[2];
  if (!nick)
  return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .kız @zara/id İsim Yaş`)
    .setColor("BLACK")
  );
  if (!yas)
  return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .kız @zara/ID İsim Yaş`)
    .setColor("BLACK")
  );

  if(db.fetch(`taglıAlım.${message.guild.id}`)) {
    if(!member.user.username.includes(config.tag) && !member.roles.cache.has(roller.vip) && !member.roles.cache.has(roller.etikettagrol) && !member.roles.cache.has(roller.booster)) return message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`Üzgünüm , Ama Henüz Taglı Alımdayız . Vip Veya Booster Rolü Olmadığı Koşulda İçeri Alamam ... `))
     
     }
 let user = message.mentions.users.first();
  let lore = message.guild.member(lore1);
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${lore.user}`);
  let kayıtlılar = new Discord.MessageEmbed();

  let eskiismi = await db.fetch(`kayıtlıisim_${lore.user}`);
  if (!lore.user) return message.channel.send
  new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor("BLACK")
    .setDescription(`**Lütfen tüm argümanları doğru yerleştirip tekrar deneyin!** \`Örnek\`: .kız @üye/ID İsim Yaş`);

    let tag = config.tag

const Tagisim = `${tag} ${nick} | ${yas}`;




  setTimeout(function() {}, 1000);
  setTimeout(function() {
    lore.setNickname(Tagisim);
    lore.roles.add(roller.kadın);
    lore.roles.add(roller.kızrolleri);
  }, 2000);
  setTimeout(function() {
    lore.setNickname(Tagisim);
    lore.roles.remove(roller.Unregister);
  }, 3000);

  db.push(`users.${lore.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${nick} ${yas}`,
      rol: `<@&${roller.kadın}>`
    }
  ]);

  db.add(`${message.guild.id}.${message.author.id}.kayıtSorgu_`, 1);

  if (db.get(`users.${lore.user.id}.registerLog`) ? true : false) {
    let embed = new Discord.MessageEmbed()
      .setColor("052833")
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`
${lore.user} adlı üye başarıyla __Kadın__ olarak kayıt edildi.

**Kullanıcının Toplam ${db.get(`users.${lore.user.id}.registerLog`) ? db.get(`users.${lore.user.id}.registerLog`).length : 0} Geçmiş İsim Verisi Bulunmakta**\n **Geçmiş İsimler**;\n
`);
    
      if(db.get(`users.${lore.user.id}.registerLog`) ? true : false){
  
    Object.keys(db.get(`users.${member.id}.registerLog`)).forEach(x => {
      embed.description += "`• "+db.get(`users.${lore.user.id}.registerLog`)[x][0].isim+"` "+`(${db.get(`users.${lore.user.id}.registerLog`)[x][0].rol})\n`;
 });
      
 embed.description += `
  Geçmiş İsimleri Kontrol Etmek İçin .isimler @zara/id Yazıp Kontrol Edebilirsiniz. \n\n zara was here `
      message.channel.send(embed).then(x => x.delete({timeout: 15000}));
      message.react(config.onay);
    }
    if (db.get(`users.${lore.user.id}.registerLog`) ? false : true) {
      let embed = new Discord.MessageEmbed().setColor("052833").setDescription(`

  ${lore.user} adlı üye başarıyla __Kadın__ olarak kayıt edildi.
  
  :dnd: Kişinin veri tabanında kayıtlı ismi bulunamadı. \n\n zara was here
`);

      message.channel.send(embed).then(x => x.delete({timeout: 15000}));
      message.react(config.onay);
    }
  }
  client.channels.cache.get(kanallar.genelchat).send(`${lore} \`Sunucumuza hoş geldin seninle beraber ${member.guild.memberCount} kişiye ulaştık! sağdaki rol seçme bölümlerinden rolünü seçebilirsin. ✨\``).then(msg => msg.delete({timeout:5000}));
};
exports.conf = { enabled: true, guildOnly: true, aliases: ["kadın", "kız", "k"], permLevel: 0 };

exports.help = { name: "kız", description: "Kadın kullanıcıları kayıt etme komutu.", usage: "kadın @kişi isim yaş" };