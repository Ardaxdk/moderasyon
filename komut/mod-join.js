const Discord = require('discord.js');
const config = require('../config.json');
const db = require('croxydb');
const kanallar = require('../kanallar.json');

module.exports.run = (client, message, args) => {    
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }

if (isNaN(args[0])) return message.reply('Bir sayı belirtmelisin.')

const members = message.guild.members.cache.filter(a => !a.user.bot).array().sort((b, a) => b.joinedTimestamp - a.joinedTimestamp) 


const qwxds = Number(args[0])
if (qwxds > members.length) {
return message.reply(`Sunucuda ${members.length} üye var!`)}
if(qwxds < members.length)
//const plural = members.length !== 1
//return message.reply(`Sunucuda ${plural ? '' : ''} sadece ${members.length} üye ${plural ? 'var' : ''}!`)

message.channel.send(new Discord.MessageEmbed().setDescription("<@"+members[qwxds - 1].user.id+"> üyesi sunucunun "+args[0]+". üyesi.").setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setThumbnail(message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp())
client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.join\``);
}


exports.conf = { enabled: true, guildOnly: false, aliases: ["join"], permLevel: 0};

exports.help = { name: 'join', };