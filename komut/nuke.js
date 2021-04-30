const Discord = require('discord.js');

exports.execute = async (client, message, args) => {
     
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
    new Discord.MessageEmbed()
    .setDescription(`yetkin yok`))
 message.channel.clone().then(chnl => {
  let position = message.channel.position;
  chnl.setPosition(position).then(x => x.send('https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831'));
  message.channel.delete();
});
  
}
exports.conf = {
    aliases: ["nuke"]
  };
  exports.help = {
    name: 'nuke'
  };
  