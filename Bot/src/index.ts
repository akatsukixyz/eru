import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
config();

export const manager = new ShardingManager('./Main.js', {
	token: process.env.TOKEN,
	totalShards: 'auto'
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
