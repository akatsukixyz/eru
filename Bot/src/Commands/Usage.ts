import { Command } from '../Structures/Eru/Bot/Command';
import { EruClient } from '../Structures/Eru/Eru';
import { Message } from 'discord.js';

export class Usage extends Command {
	public constructor() {
		super({
			name: 'usage',
			description: 'A usage command',
			usage: '"prefix"usage',
			sender: ['SEND_MESSAGES'],
			client: ['SEND_MESSAGES'],
			category: 'Utility',
			ownerOnly: false
		});
	}
	public async execute(client: EruClient, message: Message, args: string[]) {
		const isOwner = client.reference.owners.includes(message.author!.id);
		message.channel.send(
			client.embed.creator.usage(isOwner, client.user!.displayAvatarURL())
		);
	}
}
