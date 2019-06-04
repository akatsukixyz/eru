import { Command } from '../Structures/Eru/Bot/Command';
import { EruClient } from '../Structures/Eru/Eru';
import { Message } from 'discord.js';
import { current, CommandsMap } from './Registry';

export class Help extends Command {
	public constructor() {
		super({
			name: 'help',
			description: 'A help command',
			usage: '"prefix"help [command]',
			sender: ['SEND_MESSAGES'],
			client: ['SEND_MESSAGES', 'EMBED_LINKS'],
			category: 'Utility',
			ownerOnly: false
		});
	}
	public async execute(client: EruClient, message: Message, args: string[]) {
		const isOwner = client.reference.owners.includes(message.author!.id);
		if (args[0] && client.handlers.isCommand(args[0].toLowerCase()))
			return message.channel.send(
				client.embed.creator.command(
					this,
					isOwner,
					message.author!.displayAvatarURL(),
					await client.storage.GetPrefix(message.guild!.id)
				)
			);
		return message.channel.send(
			client.embed.creator.commands(
				current,
				isOwner,
				message.author!.displayAvatarURL()
			)
		);
	}
}
