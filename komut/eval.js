const { MessageEmbed } = require("discord.js");
const { config } = require("process");
const ayarlar = require("../config.json");
exports.run = async (bot, message, args, color, prefix) => {
    if (message.author.id !== ayarlar.owner) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send((evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`\n${err}\n\`\`\``);
    }
  }

exports.conf = { enabled: true, guildOnly: false, aliases: [], permLevel: 0};

exports.help = { name: 'eval'};