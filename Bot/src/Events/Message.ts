import { Event } from '../Structures/Eru/Bot/Event';
import { EruClient } from '../Structures/Eru/Eru';
import { Message as Msg } from 'discord.js';

export class Message extends Event {
	constructor() {
		super('message');
	}
	public async execute(client: EruClient, message: Msg) {
		client.handlers.message(message);
	}
}
