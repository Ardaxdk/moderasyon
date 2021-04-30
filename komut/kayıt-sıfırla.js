const Discord = require("discord.js");
const db = require('croxydb')
const config = require('../config.json');
module.exports.run = async (client, message, args) => {

  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  
  let kişi = message.mentions.users.first();
  if(!kişi) return message.channel.send('Bir kişiyi etiketlemen gerekli.')
  if(kişi) {  
  message.channel.send(`<@!${kişi.id}> Kişisinin teyit bilgileri başarıyla sıfırlandı.`)
db.delete(`kayıte_${kişi.id}`)
db.delete(`kayıtk_${kişi.id}`)  
db.delete(`kayıttoplam_${kişi.id}`)
  }
}
exports.conf = { enabled: true, guildOnly: true, aliases: [], permLevel: 3 };
exports.help = { name: 'sıfırla' }