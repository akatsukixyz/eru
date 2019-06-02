import { PermissionResolvable, Message } from 'discord.js';
import { EruClient } from '../Eru';

export class Event {
	constructor(
		public name: string,
		public usage: string,
		public sender: PermissionResolvable[],
		public client: PermissionResolvable[]
	) {
		Object.assign(this, { name, usage, sender, client });
	}
	execute(client: EruClient, message: Message, args: string[]) {
        if(!client.ready) return client.log.botError(`Command was triggered when bot wasn't ready.`)
        if(!message.guild!.me!.hasPermission(this.sender)) return message.channel.send()
    }
}
