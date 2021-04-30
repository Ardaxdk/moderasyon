const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let replies = ["https://cdn.discordapp.com/attachments/733640065200160768/737280791993779206/tenor_3.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280895995740210/tenor_7.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280900022140938/tenor_2.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280920800722984/tenor_9.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280921689915411/tenor_10.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280924563275776/tenor.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280929311096842/tenor_5.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280944016457748/tenor_1.gif","https://cdn.discordapp.com/attachments/733640065200160768/737280945195057193/tenor_6.gif","https://cdn.discordapp.com/attachments/733640065200160768/737281583412805712/tenor_8.gif","https://cdn.discordapp.com/attachments/733640065200160768/737281572826382336/tenor_4.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282276320084118/tenor_2.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282249422143488/tenor_3.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282243113910292/tenor_4.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282207579635722/tenor.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282195185467473/tenor_5.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282604176506910/tenor.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282625747681410/tenor_1.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282660250157122/tenor_4.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282929633525851/tenor_11.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282757188911174/tenor_7.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282947119579216/tenor_9.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282750385487932/tenor_5.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282940760883210/tenor_10.gif","https://cdn.discordapp.com/attachments/733640065200160768/737282991348252683/tenor_13.gif"];

let result = Math.floor((Math.random() * replies.length));

let gifembed = new Discord.MessageEmbed()

.setTitle("Animal Gif ;")

.setColor("BLACK")

.setFooter(`${message.author.tag} `, message.author.avatarURL)

.setImage(replies[result]);

message.channel.send(gifembed);

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ['gif-animal','animal-gif','gifanimal','animalgif'],

  permLevel: 0

};

exports.help = {

  name: 'animal',

  description: 'lrowsxrd',

  usage: 'animal'

};