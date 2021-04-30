const Discord = require("discord.js");
const config = require('../config.json');
const db = require('croxydb');

module.exports.run = async (client, message, args) => {

  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  
  try {
    const commands = new Discord.MessageEmbed()
    await message.channel.send(
      `Bottaki Toplam Komut Sayısı:` +
        `\`${client.commands.size}\`` +

        `\n\nKomutlar: \n${client.commands
          .map(props => `\`${props.help.name}\``)
          .join(" | ")}`

    );
  } catch (e) {
    throw e;
  }
  client.channels.cache.get(config.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.komutlar\``);
};

module.exports.conf = { enabled: true, guildOnly: false, aliases: ["yardım", "komutlar"], permLevel: 0 };

module.exports.help = { name: "yardım", description: "Bota eklenmiş tüm komutları listeler.", usage: "all-commands" };