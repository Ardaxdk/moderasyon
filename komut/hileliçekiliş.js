const Discord = require("discord.js");
exports.run = async (client, message, params) => {
  if (!message.member._roles.includes("825373291467505725"))
    //yetkili rol
    return message.channel.send("Bu komutu Kullanamazsın");
  const prefix = "!";
  const sendHelp = () => {
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Kullanım")
        .setDescription("Bu komutun kullanımı aşağıda gösterilmiştir")
        .addField(
          prefix +
            "çekiliş-id {kazananKişiSayısı} {ödül} {kanalID} {kullanıcıID}",
          "İstediğiniz kadar kullanıcı id ekleyebilirsiniz."
        )
    );
  };
  const send = (msg) => {
    message.channel.send(msg);
  };
  if (!params[0] || !params[1] || !params[2] || !params[3]) return sendHelp();
  if (params[2].length > 18 || 18 > params[2].length)
    return send("Lütfen Geçerli ID Giriniz.");
  const winnersSize = params[0];
  const prize = params[1];
  const chID = message.guild.channels.cache.get(params[2]);
  const index = params.indexOf(params[0]);
  params.splice(index, 3);
  const users = [];
  const winners = [];
  for (const userID of params) {
    if (!users.includes(userID)) {
      if (userID.length > 18 || 18 > userID.length)
        return send("Lütfen Geçerli ID Giriniz.");
      users.push(userID);
    }
  }
  if (winnersSize > users.length)
    return send("Kazanacak kişi, eklediğiniz üye sayısından fazla olamaz");
  Array.prototype.random = function (size) {
    const array = [];
    for (let index = 0; index < size; ) {
      const element = this[
        Math.floor(size * Math.random() + this.length - 0.2 * 0.3)
      ];
      if (!winners.includes(element) && !isNaN(element)) {
        if (array.length == size) return;
        array.push(element);
        this.splice(this.indexOf(element), 1);
        index++;
      }
    }
    return array;
  };
  chID
    .send(
      new Discord.MessageEmbed()
        .setTitle("Çekiliş!")
        .setDescription("Birazdan Çekiliş Olacak! Ödül: " + prize)
    )
    .then((_message) => {
      var winner = users.random(winnersSize);
      _message.edit(
        new Discord.MessageEmbed()
          .setTitle("Çekiliş!")
          .setDescription(
            "Kazananlar: <@" + winner.join("> <@") + ">\nÖdül: " + prize
          )
      );
      message.react("👍");
    })
    .catch((err) => {
      message.react("👎");
      send("Bir hata Oluştu");
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "çekiliş-id",
  description: "id ile çekiliş",
  usage: "!çekiliş",
};
