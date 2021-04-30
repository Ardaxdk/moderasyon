const Discord = require("discord.js");
const config = require('../config.json');
const emoji = require('../config.js');
const kanallar = require('../kanallar.json');
const db = require('croxydb');
const roller = require("../roller.json");

exports.run = function(client, message, args) {
  if(db.fetch(`bakim`)) {
   if(!message.member.roles.cache.has(roller.RegisterYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;

let lorexcyber = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }

    let güzelsözler = [
        "Herkes bir yaşam seçer ve seçtiği yaşamın bedelini öder.",
        "Her insan, yapmadığı tüm iyiliklerden suçludur.",
        "Seni hayallerine ulaştıracak en önemli şey, cesaretindir.",
        "Her insanın yüreğinin bir yerinde ışık vardır. hem de pırıl pırıl.",
        "Kime ok atmayı öğrettimse, bir gün beni nişan aldı.",
        "Yaşadığın yeri cennet yapamadığın sürece kaçtığın her yer cehennemdir.",
        "Her seven isimsiz bir kahramandır ve insan, sevebildiği kadar insandır!",
        "Mutluluğu herkesle paylaşabilirsin ama acıyı paylaştığın insanlar özeldir…",
        "Ömür bir masal gibidir, ne kadar uzun olduğu değil, ne kadar güzel yaşandığı önemlidir.",
        "Uçmayı seviyorsan, düşmeyi de bileceksin. Korkarak yaşıyorsan, yalnızca hayatı seyredersin…",
        "İnsanların, senin hakkında ne düşündüklerini önemsemeyerek, ömrünü uzatabilirsin mesela.",
        "Söz sizin ağzınızda olduğu sürece, sizin esirinizdir. Söz ağzınızdan çıktıktan sonra, siz onun esiri olursunuz.",
        "Pişman değilim. Sadece dön bak arkana... Ne için nelerden vazgeçtin. Neler dururken neyi seçtin.",
        "Bugünün güzel zamanları, yarının üzücü düşünceleridir.",
        "Geldiğin yeri unutmuşsun ama gideceğin yer sana bunu hatırlatacak.",
        "Sevgiyi kalbinde tut. Onsuz bir hayat, çiçekler öldüğünde güneşsiz bir bahçe gibidir.",
        "Hatırlama, Gönül Dağı’ndaki “Gül” kadar güzel ise “Unutulmak” Hüzün Dağı’ndaki diken kadar acıdır.",
        "Manzaraya talipsen, yokuşunda yorulmayı göze alacaksın.",
        "Her şey göründüğü gibi olsaydı, eline aldığın deniz suyu mavi olurdur.",
        "Seni hayallerine ulaştıracak en önemli şey, cesaretindir.",
        "Umudunu yitirme şu hayatta bir şeyin bitişi, her zaman başka bir şeyin başlamasına sebep olmuştur.",
        "Fırtınanın gücü ne olursa olsun, martı sevdiği denizden asla vazgeçmez.",
        "Mutlu olmayı yarına bırakmak, karşıya geçmek için nehrin durmasını beklemeye benzer ve bilirsin o nehir asla durmaz.",
        "Aşk çok kısa ama unutması çok zor.",
        "Önce üzüntüyü kabul etmelisin. Kaybetmeden kazanmanın ne olduğunu o zaman anlayacaksın.",
        "İki şey sonsuzdur. Evren ve insanın aptallığı. Ve bilin ki ben evrenden emin değilim",
        "Unutma, sabır sadece bekleme becerisi değildir, beklerken doğru davranış sergileme yeteneğidir.",
        "Yalnız kalma özgürlüğü sarhoş edicidir.",
        "Değişim ebedi, ölümsüzlük kalıcıdır.",
        "Ölüm hayattaki en büyük kayıp değildir. En büyük kayıp, biz yaşarken içimizde ölen şeydir.",
        "Mükemmel olmadığımı biliyorum ve mükemmel olmak için yaşayamam. Parmaklarınızla beni göstermeye başlamadan önce ellerinizin temiz olduğundan emin olun!",
        "Yarın ölecekmişsin gibi yaşa. Sonsuza dek yaşayacakmış gibi öğren.",
        "Hayat bir nefestir aldığın kadar, hayat bir kafestir kaldığın kadar, hayat bir hevestir daldığın kadar.",
        "Vazgeçtim gözlerinden, vazgeçtim sözlerinden, bir ah de yeter.",
        "Gözüm toprak olacak ama gönlüm daima aşk kokacak.",
        "Senin içinde ben bitmiş olsaydım, benim içimde sen yaşıyor olmazdın.",
        "Hani derler ya “Bir konuşursam derinden, yer oynar yerinden.” Ben onlardan değilim, “Konuşursam derinden, kimse kalkamaz yerinden",
        "Yalan zeka işidir, dürüstlük ise cesaret. Eğer zekan yetmiyorsa yaIan söylemeye, cesaretini kullanıp dürüst olmayı bir dene.",
        "Devler gibi eserler bırakmak için, karıncalar gibi çalışmak lazım.",
        "Yaşam, çok zalim bir öğretmendir. Önce sınav yapar, sonra ders verir.",
        "Sen çare arıyorken o bahane arıyorsa, aranacak bir şey kalmamıştır!",
        "Kağıda dokunan kalem, kibritten daha çok yangın çıkarır.",
        "Olmaz dediğin ne varsa hepsi olur. Düşmem dersin düşersin, şaşmam dersin şaşarsın. Öldüm der durur, yine de yaşarsın.",
        "Yılların, bana öğrettiği şeylerden biri de bu oldu; Mutluluğu yakalamışsan, sorgulama.",
        "Beni öldürmeyen her şey beni güçlendirir.",
        "Hayat avucundaki su gibidir; sen tutmaya çalıştıkça o akıp gider.",
        "Ölümün bizi nerede beklediği belli değil, iyisi mi biz onu her yerde bekleyelim.",
        "Kendini yanlış hikayede bulursan ayrıl.",
        "Gömleğin ilk düğmesi yanlış iliklenince, diğerleri de yanlış gider.",
        "Mutluluğu tatmanın tek çaresi, onu paylaşmaktır.",
        "İyiyi ara, doğruyu ara, güzeli ara fakat kusuru arama.",
        "Asıl yar yaradandır, gerisi yaralayandır.",
        "Bir insanın yaşayıp yaşamadığını anlamak istersen, nabzına değil onuruna bak, duruyorsa yaşıyordur",
        "Dahiliğin mutlak bir sınırı vardır, aptallığın asla.",
        "Ya kırdığın kalpte sen varsan",
        "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
        "Tilkiyi cаnındаn eden pаrlаk postudur. İnsаnı cаnındаn eden kahbe dostudur.",
        "Kral olsan ne yazar senin de gideceğin 2 metre mezar."
      ];
  
  let toplam = message.guild.memberCount;

  let onlinesayi = message.guild.members.cache.filter(
    only => only.presence.status != "offline"
  ).size;

  let tag = message.guild.members.cache.filter(m => m.user.username.includes(config.tag) || m.user.username.includes(config.tag2) || m.user.username.includes(config.tag3) || m.user.username.includes(config.tag4)).size;

  const etikettag = message.guild.members.cache.filter(m => m.user.discriminator == "1571").size;

  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

  let boost = message.guild.premiumSubscriptionCount

  const say = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true }))
  .setColor("2f3136")
  .setDescription(`\`>\` **Sunucumuzda toplam** \`${toplam}\` **Üye Bulunmakta** \n\`>\` **Aktif** \`${onlinesayi}\` **kullanıcı bulunmakta** \n\`>\` **Tagımızı alıp bize destek olan** \`${tag}\` **kişi bulunmakta.** \n\`>\` **Etiket tagımızı alıp bize destek olan** \`${etikettag}\` **kişi bulunmakta.** \n\`>\` **Ses kanallarımızda toplam** \`${count}\` **aktif üye bulunmakta** \n\`>\` **Sunucumuzda toplam** \`${boost}\` **tane boost bulunmakta**`)
  .setFooter(güzelsözler[Math.floor(Math.random() * güzelsözler.length)])
  .setTimestamp()
  message.channel.send(say).then(lore => lore.delete({timeout:7000}))
  message.react(emoji.onayemoji)
  client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.say\``);
};

exports.conf = { enabled: true, guildOnly: false, aliases: ["onlinesayi"], permLevel: 0 };

exports.help = { name: "say", usage: "Sunucudaki Online Kişileri Sayar", desscription: "say"};
