const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let replies = ["https://cdn.discordapp.com/attachments/699339066029768796/736983333254332456/1.gif","https://cdn.discordapp.com/attachments/699339066029768796/737156529278550046/10.gif","https://cdn.discordapp.com/attachments/699339066029768796/736983248021749775/6.gif","https://cdn.discordapp.com/attachments/699339066029768796/736983242271359067/5.gif","https://cdn.discordapp.com/attachments/699339066029768796/736983236260921455/8.gif","https://cdn.discordapp.com/attachments/699339066029768796/736983217856315483/3.gif","https://cdn.discordapp.com/attachments/699339066029768796/736983211619516447/2-2.gif","https://cdn.discordapp.com/attachments/699339066029768796/736978634031759400/40.gif","https://cdn.discordapp.com/attachments/699339066029768796/736978111043731476/a_204c3f0f05cbef57c6297ee3f230f22a.gif","https://cdn.discordapp.com/attachments/699339066029768796/736978069038039050/f5a91c2c25a6a082f8ecafc826c13760.gif","https://cdn.discordapp.com/attachments/699339066029768796/736977973688795237/2.gif","https://cdn.discordapp.com/attachments/699339066029768796/736977934375583926/a_bf8ac566a856ad839d310e919ba15791.gif","https://cdn.discordapp.com/attachments/699339066029768796/736977911831330886/image0-7.gif","https://cdn.discordapp.com/attachments/699339066029768796/736977867811979324/a_c21ae57fdd3ad6ac99cd038b6a5aa1e4.gif","https://cdn.discordapp.com/attachments/699339066029768796/736148143678291968/15.gif","https://cdn.discordapp.com/attachments/699339066029768796/735864299024810155/20200723_142037.gif","https://cdn.discordapp.com/attachments/699339066029768796/735910966792945764/image0.gif","https://cdn.discordapp.com/attachments/699339066029768796/735910962762350642/image0.gif","https://cdn.discordapp.com/attachments/699339066029768796/735194170230308904/a_0690a3032ce9908e230d7f71dd9a6988_1.gif","https://cdn.discordapp.com/attachments/699339066029768796/734965436663464076/a_4f5d107e5160642113337218f63a6441.gif","https://cdn.discordapp.com/attachments/699339066029768796/734965350357008384/a_8f2bce5f3a3312e7e95236a39ea70efe.gif","https://cdn.discordapp.com/attachments/699339066029768796/734965015739629599/image0-6.gif","https://cdn.discordapp.com/attachments/699339066029768796/732175141567725639/image0.gif","https://cdn.discordapp.com/attachments/699339066029768796/730498782265081876/bab3.gif","https://cdn.discordapp.com/attachments/699339066029768796/730499512602329198/14.gif"];

let result = Math.floor((Math.random() * replies.length));

let gifembed = new Discord.MessageEmbed()

.setTitle("Baby Gif ;")
    
.setColor("BLACK")

.setFooter(`${message.author.tag} `, message.author.avatarURL)

.setImage(replies[result]);

message.channel.send(gifembed);

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ['gif-baby','baby-gif','gifbaby','babygif'],

  permLevel: 0

};

exports.help = {

  name: 'baby',

  description: 'lrowsxrd',

  usage: 'baby'

};