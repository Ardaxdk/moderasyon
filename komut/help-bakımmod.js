const Discord = require('discord.js')
const db = require('croxydb')
const config = require('../config.json')


exports.run = (client, message, args) => {
  
  if(message.author.id != config.owner) return
  
  if(!args[0]) return message.channel.send('Bakım modunu açmak için .bakım aç')
  
  if(args[0] === 'aç') {
    if(db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten açık')
    message.channel.send('Bakım modu açıldı.')
    db.set(`bakim`, 'acik')
  }
  if(args[0] === 'kapat'){
    if(!db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten kapalı.')
    message.channel.send('Bakım modu kapatıldı.')
    db.delete(`bakim`)
  }
  
}


exports.conf = { enabled: true, guildOnly: true, aliases: ["bakım"], permLevel: 0}
exports.help = { name: 'bakım'}