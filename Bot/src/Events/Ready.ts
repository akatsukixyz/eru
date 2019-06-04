import { Event } from '../Structures/Eru/Bot/Event';
import { EruClient } from '../Structures/Eru/Eru';

export class Ready extends Event {
	constructor() {
		super('ready');
	}
	public async execute(client: EruClient) {
		client.log.botInfo(`Logged in as ${client.user!.tag}`);
		await client.reference.server.start();
	}
}
