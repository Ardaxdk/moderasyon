const { MessageEmbed } = require("discord.js");
const db = require("croxydb");
const ayarlar = require('../config.json');
const roller = require('../roller.json');
const kanallar = require('../kanallar.json')
const config = require("../config.js");
exports.run = async (client, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }

if(!message.member.hasPermission("ADMINISTRATOR")) return;

let tag = args[0];
if (!tag) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Tarıycağım tagı belirlemelisin !`));
let tag1 = message.guild.members.cache.filter(tagdakiler => { return tagdakiler.user.username.includes(tag);});



tag1.forEach(async member => {
await member.roles.add(roller.taglırol);
})

message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor("RED").setDescription(`❯ **${tag}** Tag'ına sahip herkese [<@&`+ ayarlar.taglırol +`>] rolü dağtılımaya başlandı.`).setColor("RED"))
client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.tagtara\``);

}
exports.conf = { enabled: true, guildOnly: false, aliases: ["tagtara", "tagrolver"], permLevel: 0 };

exports.help = { name: "tagtara" };