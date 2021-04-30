const Discord = require('discord.js');
const db = require('croxydb');

exports.run = async (client, message, args) => {

    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }

if(!message.member.hasPermission('MANAGE_ROLES')) return;
let chimped = message.guild.roles.cache.filter(a => a.name !== 'everyone' && !a.managed).sort((a, b) => a.position - b.position).map(c => c.name).reverse()
message.channel.send('```'+`Roller [${message.guild.roles.cache.size}]:\n`+chimped.join('\n\n')+'```')
};
exports.conf = { enabled: true, guildOnly: true, aliases: [], permLevel: 0 }

exports.help = { name: 'roles' };