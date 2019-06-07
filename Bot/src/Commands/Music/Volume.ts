import { Command } from '../../Structures/Eru/Bot/Command';
import { EruClient } from '../../Structures/Eru/Eru';
import { Message } from 'discord.js';

export class Pause extends Command {
	public constructor() {
		super({
			name: 'volume',
			description: 'Volume command',
			usage: '"prefix"volume',
			sender: ['CONNECT', 'SEND_MESSAGES'],
			client: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			category: 'Music',
			ownerOnly: false
		});
	}
	public async execute(client: EruClient, message: Message, args: string[]) {}
}
