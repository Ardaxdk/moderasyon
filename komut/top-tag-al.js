const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");
const kanallar = require('../kanallar.json');
const ability = require('../ability.json');
const roller = require('../roller.json');

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
  )
    
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
      .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .tagaldı @zara/id `)
      .setColor("BLACK")
      );
  let role = message.guild.roles.cache.get(roller.erkek);


 

 let user = message.mentions.users.first();
  let lore = message.guild.member(lore1);
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${lore.user}`);
  let kayıtlılar = new Discord.MessageEmbed();

  let eskiismi = await db.fetch(`kayıtlıisim_${lore.user}`);
  if (!lore.user) return message.channel.sendEmbed
  new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .tagaldı @zara/ID `)
      .setColor("BLACK")
 
let tag = config.tag






  setTimeout(function() {}, 1000);
  setTimeout(function() {

 
  }, 2000);
  setTimeout(function() {

  }, 3000);

  db.push(`users.${lore.user.id}.registerLog`, [
    {
      tarih: Date.now(),
    
      rol: `<@&${roller.erkek}>`
    }
  ]);

  db.add(`${message.guild.id}.${message.author.id}.tagSorgu_`, 1);

  if (db.get(`users.${lore.user.id}.registerLog`) ? true : false) {
    let embed = new Discord.MessageEmbed().setColor("052833").setDescription(`
${lore.user}  adlı kişiye sunucumuzda tag aldırdıhın için sonsuz teşekürler :tada: 

`);
    if (db.get(`users.${lore.user.id}.registerLog`) ? true : false) {
      Object.keys(db.get(`users.${lore.user.id}.registerLog`)).forEach(x => {
     //   embed.description += "`• " + db.get(`users.${lore.user.id}.registerLog`)[x][0].isim +"` " + `(${db.get(`users.${lore.user.id}.registerLog`)[x][0].rol})\n`;
      });
      
 //embed.description += `Geçmiş İsimleri Kontrol Etmek İçin .isimler @zara/id Yazıp Kontrol Edebilirsin \n\n zara was here. `
  message.channel.send(embed).then(x => x.delete({timeout: 15000}));
  message.react(config.onay);
    }
    if (db.get(`users.${lore.user.id}.registerLog`) ? false : true) {
      let embed = new Discord.MessageEmbed().setColor("052833").setDescription(`


    
`);

      message.channel.send(embed).then(x => x.delete({timeout: 15000}));
      message.react(config.onay);
    }
  }
 // client.channels.cache.get(kanallar.genelchat).send(`${lore} \`Sunucumuza hoş geldin seninle beraber ${member.guild.memberCount} kişiye ulaştık! sağdaki rol seçme bölümlerinden rolünü seçebilirsin. ✨\``).then(msg => msg.delete({timeout:7000}));
};
exports.conf = { enabled: true, guildOnly: true, aliases: ["tagaldı", "tag-aldı"], permLevel: 0 };

exports.help = { name: "tagaldı", description: "Erkek kullanıcıları kayıt etme komutu.", usage: "erkek @kişi isim yaş" };