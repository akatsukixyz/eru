import { Event } from '../Structures/Eru/Bot/Event';
import { EruClient } from '../Structures/Eru/Eru';

export class ShardReady extends Event {
	constructor() {
		super('shardReady');
	}
	public async execute(client: EruClient, id: number) {
		client.log.botInfo(`Shard ${id} is ready.`);
	}
}
