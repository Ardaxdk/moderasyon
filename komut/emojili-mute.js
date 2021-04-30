const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, params) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("Bu komutu Kullanamazsın");
  const user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(params[0]) ||
    message.guild.members.cache.find((user) => user.name === params[0]);
  if (!params[0])
    return message.channel.send(
      "Bir kullanıcı belirt ister etiketleyerek ister id ile ister kullanıc adı ile."
    );
  const time = params[1] ? params[1] : "x";
  var _time;
  message.react("💬").then(() => message.react("🔈"));
  const filter = (reaction, user) => {
    return (
      ["💬", "🔈"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  message
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "💬") {
        textMute();
      } else if (reaction.emoji.name === "🔈") {
        voiceMute();
      }
    })
    .catch((collected) => {
      message.reply("Kararı alamadım!.");
    });
  const textMute = async () => {
    /**
     * Yazılı kanallardaki susturma kodları (yani bu fonksiyonun içindeki kodlar) Arox#0928'dan aldım.
     */
    var muterol;
    try {
      muterol = await message.guild.roles.create({
        data: {
          name: "Muted",
          color: "RANDOM",
          permissions: [],
        },
        reason: "Mute için!",
      });
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.createOverwrite(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
    await user.roles.add(muterol.id);
    _time =
      time !== "x"
        ? time + " kadar sürelik susturması başladı."
        : "susturması başladı.";
    message.channel.send(
      user.user.username + " adlı kullanıcının yazılı kanallardaki " + _time
    );
    if (time !== "x") {
      setTimeout(() => {
        user.roles.remove(muterol.id);
        message.channel.send(
          user.user.username +
            " adlı kullanıcının yazılı kanallardaki " +
            time +
            " kadar sürelik susturması kaldırıldı."
        );
      }, ms(time));
    }
  };
  const voiceMute = () => {
    user.voice.setMute(true);
    _time =
      time !== "x"
        ? time + " kadar sürelik susturması başladı."
        : "susturması başladı.";
    message.channel.send(
      user.user.username + " adlı kullanıcının sesli kanallardaki " + _time
    );
    if (time) {
      setTimeout(() => {
        user.voice.setMute(false);
        message.channel.send(
          user.user.username +
            " adlı kullanıcının sesli kanallardaki " +
            time +
            " kadar sürelik susturması kaldırıldı."
        );
      }, ms(time));
    }
  };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
};

exports.help = {
  name: "muhhhte",
  description: "mute",
  usage: "mute",
};


