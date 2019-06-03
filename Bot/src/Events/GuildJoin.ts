import { Event } from '../Structures/Eru/Bot/Event';
import { EruClient } from '../Structures/Eru/Eru';
import { Guild } from 'discord.js';

export class GuildJoin extends Event {
	constructor() {
		super('guildCreate');
	}
	public async execute(client: EruClient, guild: Guild) {
		client.storage.NewGuild(guild.id);
		client.log.botInfo(`New guild joined: ${guild}`);
	}
}
