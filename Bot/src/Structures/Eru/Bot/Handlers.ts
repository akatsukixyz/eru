import { EruClient } from '../Eru';
import { Command } from './Command';
import { Event } from './Event';
import { Collection, Message } from 'discord.js';

export class Handlers {
	private commands: Collection<string, Command>;
	private events: Collection<string, Event>;
	public constructor(private client: EruClient) {
		this.client = client;
		this.commands = new Collection();
		this.events = new Collection();
	}
	public load(commands: Command[] | any, events: Event[] | any) {
		for (const cmd of commands) {
			const command: Command = new cmd();
			this.commands.set(command.name, command);
		}

		this.client.log.botInfo(
			`${this.commands.size}/${commands.length} commands were loaded.`
		);
		for (const ev of events) {
			const event: Event = new ev();
			this.client.on(event.name, (...params: any) =>
				event.execute(this.client, ...params)
			);
			this.events.set(ev.name, event);
		}
		this.client.log.botInfo(
			`${this.events.size}/${events.length} events were loaded.`
		);
	}
	public async message(message: Message) {
		if (!message.guild) return;
		if (message.author!.bot) return;
		const prefix = await this.client.storage.GetPrefix(message.guild.id);
		if (!message.content.startsWith(prefix)) return;
		const args = message.content
			.trim()
			.slice(prefix.length)
			.split(/\s+/g);
		const command = args.shift()!.toLowerCase();
		if (!this.commands.has(command)) return;
		this.commands
			.get(command)!
			.run(message.client as EruClient, message, args);
	}
}
