const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
const dogruluk = ['Bir zaman makinen olsa hangi zaman dönemine giderdin?',
'Hiç hipnotize edildin mi?',
'Zeka ve güzellik arasında bir seçim yapmak zorunda kalsan neyi seçerdin?',
'Daha önce sana verilmiş en kötü hediye nedir?',
'Hayatın film olsa seni kim oynardı?',
'Kaç kere evden gizlice sývýþtýn?',
'Dilini burnuna değdirebilir misin?',
'Dünyada herhangi bir yerde yaþayabilsen nerede yaþardýn?',
'Hayatýnýn en iyi günü hangisiydi?',
'Herhangi bir sporla uðraşıyor musun?',
'Çekici olduğunu düşündüğün bir öğretmenin oldu mu hiç? Kim? Neden?',
'Günlük tutuyor musun?',
'Bir çöpçatanlık sitesine üye olur muydun?',
'Birine şimdiye kadar yaptığınız en fena eşek şakası nedir?',
'Küçükken en sevdiğin çizgi film hangisiydi?',
'En kötü öpüþmen hangisiydi?',
'Hiç birinin arabasına kustun mu?',
'Zeki mi olmayı tercih edersin yoksa mutlu olmayı mı ve neden?',
'Hiç cinsel yolla bulaşan bir hastalığın oldu mu?',
'Bisiklete binmeyi ne zaman öğrendin?',
'Para diye bir şey olmasa ne yapmak isterdin?',
'Hiç uykunda yürüdün mü?',
'Çıplak uyur musun?',
'Hiç bir þeyi kýrýp da baþka birini suçladýðýn oldu mu?',
'Hiç eve birilerini gizlice soktun mu?',
'Seninle ilgili en garip þey ne? Bununla gurur duyuyor musun?',
'Favori Disney karakterin kim?',
'Bir günlüðüne görünmez olsan ne yapardýn?',
'Telefonunda arattýðýn en kötü þey nedir?',
'Bir sabah karþý cins olarak uyansan ilk yapacaðýn ne olurdu?',
'Hiç ilişkiye girdinmi?',
'Hiç ilişki teklif eden oldumu?',
'Hiç sana çıkma teklif eden birileri oldumu?',
'Hiç öpüştünmü?',
'Eski sevgilinin fotoğrafını at.']

const cesaret = ['Bir tur boyunca maymun gibi davran.',
'Bebek sesiyle þarký söyle.',
'Odandaki en garip eþyanýn fotoðrafýný at.',
'Rastgele birine senden nefret ediyorum mesajý at.',
'2 tur boyunca ana dilin haricinde bir dille konuþ.',
'Karþý cinste en çekici bulduðun þey nedir?',
'Alfabeyi tersten söyle.',
'Eski sevgiline onu özlediðini söyleyen bir mesaj gönder. (Ekran görüntüsü atman lazým.)',
'Söyleceðin her þeyden sonra "31" de.',
'Sevgiline atabileceðin en acýmasýz mesajý at. (Ekran görüntüsü atman lazým)',
'3 kiþiye senden hoþlanýyorum diye mesaj at. (Ekran görüntüsü atman lazým.)',
'Son Whatsapp konuþmaný ss at.',
'Çok yüksek bir sesle baðýr.',
'Selfie çekip at.',
'Gidip bir bardak su iç.',
'Sınıf arkadaşına ondan nefret ettiğini yaz.',
'En nefret ettiğin kişiye onu sevdiğini söyle.',
'Sevgiline ayrılmak istediğini söyle.',
'Sıra arkadaşına Whatsapp dan random at.',
'Sınıftaki herhangi bir kıza çıkma teklif et.',
'(Zorunda değilsiniz)Bir kızı yanağından öp.',
'(Zorunda değilsiniz)Balkondan yoldan geçen birine bağır.' ,
'Odanın fotoğrafını at.']
if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`Ses kanalında değilsin!`))
if(message.member.voice.channel.members.size < 3) return message.channel.send(new Discord.MessageEmbed().setDescription(`Ses kanalında en az 3 kişi olmalı!`))
var dogrulukcevap = dogruluk[Math.floor(Math.random() * dogruluk.length)];
var cesaretcevap = cesaret[Math.floor(Math.random() * cesaret.length)];
let dogrulukembed = new Discord.MessageEmbed()
.setDescription(`${message.author} kurbanın ${message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()}
⤷ ${dogrulukcevap}`)
let cesaretembed = new Discord.MessageEmbed()
.setDescription(`${message.author} kurbanın ${message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()}
⤷ ${cesaretcevap}`)
let secilenid = message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()
let secim = new Discord.MessageEmbed()
.setDescription(`${message.author} kurbanın ${message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()} Doğruluk mu ? Cesaretlik mi?`)
.setFooter(`zara pasladı, Phentos vurdu gol!`)
.setColor("RANDOM")  
message.channel.send(secim).then(async phentosarox => {
phentosarox.react("❕").then(gereksiz => phentosarox.react("❔"))
const filtre = (reaction, user) => {
    return ["❕", "❔"].includes(reaction.emoji.name) && user.id === secilenid.id;
}
phentosarox.awaitReactions(filtre, { max: 1, time: 30000}).then(collected => {
    const tepki = collected.first();  
  if(tepki.emoji.name == "❕") {
    phentosarox.edit(cesaretembed)
}
    if(tepki.emoji.name == "❔") {
    phentosarox.edit(dogrulukembed)
}
})
})
    };



    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["dc-çevir"],
        permLevel: 0,
      }
      
      exports.help = {
        name: 'dc-çevir'
        
      }
      