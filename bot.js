const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const kanallar = require('./kanallar.json');
const roller = require('./roller.json')
const moment = require('moment');
const momentdf = require("moment-duration-format")
const fs = require('fs');
const db = require('croxydb');
const ms = require('ms');
const { monthsShort } = require('moment');
require('./events/loader.js')(client);

client.on("ready", async() => {
client.user.setActivity(`İnfinity ♥ Süpervizor`, { type: "STREAMING",url: "https://www.twitch.tv/infinityhighguard"})
let botvoicechannel = client.channels.cache.get(kanallar.BotVoiceChannel);
if(botvoicechannel) botvoicechannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı"));})
//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komut/', (err, files) => {
if (err) console.log(`Bir Komut Yüklemelisin!`);
console.log(`-> ${files.length} Komut Yükeniyor...`);
files.forEach(f => {
let props = require(`./komut/${f}`);
console.log(`-> ${props.help.name}`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);});});});

client.reload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komut/${command}`)];
let cmd = require(`./komut/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);});
resolve(); } catch (e) { reject(e);}});};

client.load = command => {
return new Promise((resolve, reject) => { try {
let cmd = require(`./komut/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);});
resolve(); } catch (e) { reject(e); }});};

client.unload = command => {
return new Promise((resolve, reject) => { try {
delete require.cache[require.resolve(`./komut/${command}`)];
let cmd = require(`./komut/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
resolve(); } catch (e) {reject(e); }});};
client.elevation = message => {
if (!message.guild) { return; }

let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
if (message.author.id === config.owner) permlvl = 3;
return permlvl;};
//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\





client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() === ""+config.prefix+"link") {
      [message.channel.send(""+ config.Link +"")]
  }
})

client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() === ""+config.prefix+"tag") {
      [message.channel.send("\`"+ config.tag +"\`")]
  }
})

client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() === ""+config.prefix+"tag") {
    [message.channel.send("\`"+ config.etikettag +"\`")]
  }
})

 
    //////////////////////AFK

////////voice log///////
    
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        { 
          let giriş = client.channels.cache.get(kanallar.voicegiriş);
          let çıkış = client.channels.cache.get(kanallar.voiceçıkış);
          let odadeğişme = client.channels.cache.get(kanallar.voicetransfer);
          let logKanali = client.channels.cache.get(kanallar.voicelog);
          let susturma = client.channels.cache.get(kanallar.voiceselfmute);
          let sağırlaştırma = client.channels.cache.get(kanallar.voiceselfdeaf);

          if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!**`).catch();
          if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
          if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
          if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
          if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
          if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
          if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
          if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
        };
      });   

client.on('messageDelete', message => {
        const lore = require("quick.db")
        lore.set(`snipe.mesaj.${message.guild.id}`, message.content)
        lore.set(`snipe.id.${message.guild.id}`, message.author.id)
        lore.set(`snipe.kanal.${message.guild.id}`, message.channel.id)
      
      })



//MESAJ LOG
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  if (newMessage.content.startsWith(config.prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${newMessage.guild.id}`);
  let scbul = newMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", "```" + oldMessage.content + "```")
    .addField("Yeni Mesaj", "```" + newMessage.content + "```")
    .addField("Kanal Adı", newMessage.channel.name)
    .addField("Mesaj ID", newMessage.id)
    .addField("Kullanıcı ID", newMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(config.prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${deletedMessage.guild.id}`);
  let scbul = deletedMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL())
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", "```" + deletedMessage.content + "```")
    .addField("Kanal Adı", deletedMessage.channel.name)
    .addField("Mesaj ID", deletedMessage.id)
    .addField("Kullanıcı ID", deletedMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours() +
        3}:${deletedMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});
///////--------------Modlog Son----------////////////

////  Etiket Tag Rol

client.on("userUpdate", async function(oldUser, newUser) {
  const guildID = "820322898400116766"//sunucu
  const roleID = "820337215530860625"//taglırolü
  const tag = "1571"//tag
  const chat = '820329412997545984'// chat
  const log2 = '820379080905588776' // log kanalı

  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp();
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          member.roles.remove(roleID)
          client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`${tag}\` çıakrtarak ailemizden ayrıldı!`))
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
          client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`${tag}\` alarak ailemize katıldı`))
      }
  }
 if (newUser.discriminator !== oldUser.discriminator) {
      if (oldUser.discriminator == "1571" && newUser.discriminator !== "1571") {
          member.roles.remove(roleID)
          client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketinden \`1571\` çıakrtarak ailemizden ayrıldı!`))
      } else if (oldUser.discriminator !== "1571" && newUser.discriminator == "1571") {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketine \`1571\` alarak ailemize katıldı`))
          client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#1945)`)
      }
  }

})



//////   

const kiltifat = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Zara seni çok sevdi...',
    'Mucizelerden bahsediyordum.',
];
client.on("message", async message => {
  if(message.channel.id !== (config.chatkanalı)) return;
  let Knavedev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Knavedev >= 60) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
    message.reply(`${(kiltifat)[random]}`);
  };
});

/////// Sunucu İçinde Tag Alma Kısmı

        client.on("userUpdate", async (oldUser, newUser) => {
        if (oldUser.username !== newUser.username) {
        const tag = 'Long'
        const sunucu = "820322898400116766"
        const kanal = '820379080905588776'
        const rol = '820398774622879785'
      
        try {
      
        if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
        await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} , \`${tag}\` Tagımızı Aldığı İçin <@&${rol}> Rolü Verildi`));
        await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
        }
        if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
        await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} , \`${tag}\` Tagımızı Çıkardığı İçin <@&${rol}> Rolü Alındı`));
        await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
        }
      } catch (e) {
      console.log(`Bir hata oluştu! ${e}`)
       }
      }
      });
      
      
        
//---------------------------------------------------spotify engel-----------------------------------------------------\\
////   Sunucuya Katıldıhındaki Tag Rol Kısmı
client.on("guildMemberAdd", member => {
  let sunucuid = "820322898400116766"; 
  var tag = 'Long';
  let rol = "820398774622879785";
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`).setTimestamp()
     client.channels.cache.get('820379080905588776').send(tagalma)
}
})

///////// Embedsiz Webhooklu Hg Mesajı Slaşları Kaldırıp Aktif Hala Getirebilirsiniz

 client.on("guildMemberAdd", member => {  
   const lorewebhook = new Discord.WebhookClient('836921334972940310', '4F7Pw6ctfXGQ0acgbf_u2hJlv0zlGSM6IwuV8F5uASPCd1LUW8NZ9hvDR8yWEC7K_VI2')
      
    let user = client.users.cache.get(member.id);
     require("moment-duration-format");
        const kurulus = new Date().getTime() - user.createdAt.getTime();  
    const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
     
  
    moment.locale("tr");
  lorewebhook.send(":tada: **İnfinity'e hoş geldin** <@" + member + "> \n\n<@&820323637743583253> rolüne sahip yetkililer senin ile ilgilenecektir. \n\n **Hesabın \`"+ gecen +"\` Önce Oluşturulmuş** \n\nSunucu kurallarımız <#820327229195026482> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek. \n\nsunucumuzun \`" + member.guild.memberCount + "\` üyesi olmanı sağladı! İyi eğlenceler. ");
    member.setNickname(` İsim | Yaş`);
    });


 



//////Snipe

client.on("messageDelete", async message => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});




///random gif pp  (Serendiadan Alıntı)

client.on(`userUpdate`, (oldUser, newUser) => {
  let renk = "4b0101"
  let avatar = newUser.avatarURL({ dynamic: true, format: "png", size: 1024 }).split('?')[0]
  let png = client.channels.cache.get('820377295403221044')/// PP Avatar Kanal İd
  let gif = client.channels.cache.find(ch => ch.id === '820377295403221044')/// Gif Avatar Kanal İd
if(avatar.endsWith('.png') || avatar.endsWith('.jpg') || avatar.endsWith('.webp')) {
  const savagepng= new Discord.MessageEmbed()
  .setImage(avatar)
  .setColor(renk)
  .setFooter(`zara was here`)
  .setDescription(`**Resimi görüntülemek için** [**Buraya Tıkla**](${newUser.avatarURL({ dynamic: true, format: "png", size: 1024 })})`)
  png.send(savagepng)
}
if(avatar.endsWith('.gif')) {
  const savagegif= new Discord.MessageEmbed()
  .setImage(avatar)
  .setColor(renk)
  .setFooter(`zara was here`)
  .setDescription(`**Resimi görüntülemek için** [**Buraya Tıkla**](${newUser.avatarURL({ dynamic: true, format: "png", size: 1024 })})`)
  gif.send(savagegif)
}
}) 

//client.on('message', async message => { if(message.guild.id === "786477463940497449") {///Sunucu id 
//if(message.channel.id === "816588740888625214"){//// kanal id 
//if(message.content.includes("mavi")){ message.delete() 
//message.member.roles.add(`816589391996387358`)///rolid 
//}else {message.delete()} }else return; }else return; })
//Events Kısmına Atılması Gerekmektedir

client.login(process.env.token).then(() => {
console.log(`
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
Bot İsmi: ${client.user.username}
Prefix: ${config.prefix}
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞`);});