const discord = require('discord.js');
const config = require('../config.json');
const db = require('croxydb');

exports.run = async (client, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }

    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    const rol1 = message.guild.roles.cache.find(r => r.name === "erkek");
    rol1.setPermissions(0);

    const rol2 = message.guild.roles.cache.find(r => r.name === "karı");
    rol2.setPermissions(0);

    const rol3 = message.guild.roles.cache.find(r => r.name === "oç");
    rol3.setPermissions(0);
    
    message.channel.send(`Rollerin Yetkileri Kapatıldı!!\n**Rolleri Kapatılan Yetkiler!**:\n${rol1}\n${rol2}\n${rol3}`)
}

exports.conf = { enabled: true, guildOnly: true, aliases: ['ytkapa', 'yetkikapat'] }

exports.help = { name: 'yetkikapat' }