const Discord = require("discord.js");
const db = require('croxydb');
const config = require('../config.json');

exports.run = async (bot, message, args) => {
    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
    let sonuç = ["``%10``\nZor ama, imkansız değil.","``%20``\nGelmez be kardeşim uğraşma..","``%40``\nGeledebilir, gelmeyedebilir.","``%60``\nGelicek sanırım ya.","``%80``\nGelmesi lazım artık. ","``%100``\nGelmiş bile, bir dm kutusuna bak derim."];
    let result = Math.floor((Math.random() * sonuç.length));
    let gerigelsin = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Gelir mi acaba?", sonuç[result]);
  
    message.channel.send(gerigelsin);
}
exports.conf = { enabled: true, guildOnly: false, aliases: ["gerigelsin"], permLevel: 0 };

exports.help = { name: 'gerigelsin'};