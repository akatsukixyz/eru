import { PermissionResolvable, Message } from 'discord.js';
import { EruClient } from '../Eru';

export abstract class Command {
	constructor(
		public name: string,
		public usage: string,
		public sender: PermissionResolvable[],
		public client: PermissionResolvable[],
		public ownerOnly: boolean
	) {
		Object.assign(this, { name, usage, sender, client, ownerOnly });
	}
	public run(client: EruClient, message: Message, args: string[]) {
		if (!client.ready)
			return client.log.botError(
				`Command was triggered when bot wasn't ready.`
			);

		if (
			this.ownerOnly &&
			!client.reference.owners.includes(message.author!.id)
		)
			return;

		if (!message.member!.hasPermission(this.sender))
			return client.embed.creator.permissions(
				this,
				false,
				message.author!.displayAvatarURL()
			);

		if (!message.guild!.me!.hasPermission(this.client))
			return client.embed.creator.permissions(
				this,
				true,
				client.user!.displayAvatarURL()
			);

		this.execute(client, message, args);
	}
	public execute(client: EruClient, message: Message, args: string[]) {}
}
