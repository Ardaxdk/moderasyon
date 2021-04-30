const { ShardingManager } = require(`discord.js`)

const shards = new ShardingManager(`./bot.js`, {
token : process.env.token,
totalShards : 1 });
shards.spawn()
