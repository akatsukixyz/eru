import { Command } from '../Structures/Eru/Bot/Command';
import { EruClient } from '../Structures/Eru/Eru';
import { Message } from 'discord.js';

export class Usage extends Command {
	public constructor() {
		super(
			'usage',
			'"prefix"usage',
			['SEND_MESSAGES'],
			['SEND_MESSAGES'],
			false
		);
	}
	public async execute(client: EruClient, message: Message, args: string[]) {
		const isOwner = client.reference.owners.includes(message.author!.id);
		message.channel.send(
			client.embed.creator.usage(
				this,
				isOwner,
				client.user!.displayAvatarURL()
			)
		);
	}
}
