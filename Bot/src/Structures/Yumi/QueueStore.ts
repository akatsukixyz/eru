import {
	Collection,
	VoiceConnection,
	StreamDispatcher,
	VoiceChannel,
	TextChannel
} from 'discord.js';
import { Queue } from './Queue';
import { EruClient } from '../Eru/Eru';
export class Yumi {
	public queues: Collection<string, Queue>;
	public connections: Collection<string, VoiceConnection>;
	public streams: Collection<string, StreamDispatcher>;
	constructor(private client: EruClient) {
		this.client = client;
		this.queues = new Collection();
		this.connections = new Collection();
		this.streams = new Collection();
		for (const [id] of this.client.guilds)
			this.queues.set(id, new Queue(id, null, null, this.client));
	}
	public stopAll() {
		for (const [, queue] of this.queues) {
			queue.stop();
		}
	}
	public init(id: string, channel: VoiceChannel, messages: TextChannel) {
		this.queues.set(id, new Queue(id, channel, messages, this.client));
	}
}
