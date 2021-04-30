const Discord = require("discord.js"); 

exports.run = async (client, message, args) => {
  var rol = "825373291467505725"
  let kullanıcı = message.guild.members.cache.filter(s => s.roles.cache.has(rol)).filter(s => !s.voice.channel).size
  for(var i = 0;i < kullanıcı;i++){
    let a = message.guild.members.cache.filter(s => s.roles.cache.has(rol)).filter(s => !s.voice.channel).map(a => a)[i]
    const userDM = await a.createDM()
try {
    await userDM.send("Lütfen Toplantıya !! https://discord.gg/V3NT6gQA")
} catch {
    await message.channel.send(`<@${a.user.id}> adlı kullanıcının dm kutusu kapalı. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin`)
}
  }
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ["yetkilidm", "staffdm"], 
  permLevel: 0 
};

exports.help = {
  name: "jjjjjb", 
  description: "",
  usage: "" 
};
