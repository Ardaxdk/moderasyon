const Discord = require('discord.js')

exports.run = async(client, message, args ) => {
  
let unbannedmember = args[0]

let guild = message.guild
if (!unbannedmember) return message.channel.send(new Discord.MessageEmbed().setAuthor(`zara was here`, message.author.avatarURL()).setColor("RED").setDescription("**İD Belirtmelisin**"))
 if(isNaN(unbannedmember)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`zara was here`, message.author.avatarURL()).setColor("RED").setDescription("**Kullanıcı İD'si Sadece Sayılardan Oluşabilir**"))
  
  let sebep = args.slice(1).join(' ')
  if (!sebep) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setAuthor(`zara was here `, message.author.avatarURL()).setDescription(`**⚠️ • Sebep Belirtmelisin**`))
  
       message.channel.send(new Discord.MessageEmbed().setColor("RED").setAuthor(`zara was here`, message.author.avatarURL()).setDescription(`**⚠️ • Kullanıcının Banını Açmak İstediğinizden Emin Misiniz ? Lütfen __evet (e)__ veya __hayır (h)__ İle Cevap Verin.\n\n\`30\` Saniye İçerisinde İptal Edilcektir**`))
  let uwu = false; 
  while (!uwu) {
    const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 30000 }); 
    const Hyper = response.first().content
    if (Hyper == 'hayır' || Hyper == 'h') return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("**İşlem İptal Edildi**"))
    if (Hyper !== 'evet' && Hyper !== 'e') { 
      message.channel.send(new Discord.MessageEmbed().setAuthor(`zara was here`, message.author.avatarURL()).setColor("RED").setDescription("**Lütfen Sadece (e) evet Veya (h) hayır İle Cevap Verin**"))
    } 
    if (Hyper == 'evet' || Hyper == 'e') uwu = true 
  } 

   guild.members.unban(unbannedmember)
    const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle('Bir Kullanıcının Banı Açıldı!')
    .setDescription(`**Banı Açılan Kullanıcı : ${unbannedmember} \nBanını Kaldıran : <@${message.author.id}>**`)
    .setTimestamp()
    message.channel.send(embed)
  }
  


exports.conf = {
  aliases: ["xzarunban", "zaraunban"],
  permLevel: 0
};
exports.help = {
  name: 'unban2'
};
