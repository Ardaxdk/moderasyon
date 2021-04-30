const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const ability = require('../ability.json');
const roller = require('../roller.json');
const kanallar = require('../kanallar.json');

module.exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.has(roller.botcommander) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;

 if(!args[0]) {
    message.react(config.carpi);
    return;
};

let user = message.mentions.users.first() || (args[0])
let member = message.guild.member(user)
if(!user) return
if(!member) return

member.roles.add(ability.vip)
message.react(config.onay)
client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.vip\``);
}

module.exports.conf = { enable: true, guildOnly: true, aliases: ['viksksp'] }

module.exports.help = { name: 'vip' }