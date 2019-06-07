import { Command } from '../../Structures/Eru/Bot/Command';
import { EruClient } from '../../Structures/Eru/Eru';
import { Message, MessageAttachment, TextChannel } from 'discord.js';
import { Song } from '../../Structures/Yumi';

export class Play extends Command {
	constructor() {
		super({
			name: 'play',
			description: 'Play command',
			usage: '"prefix"play [song]',
			sender: ['CONNECT', 'SEND_MESSAGES'],
			client: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			category: 'Music',
			ownerOnly: false
		});
	}
	public async execute(client: EruClient, message: Message, args: string[]) {
		const channel = message.member!.voice.channel;
		if (!channel)
			return message.channel.send(
				'You must be conncted to a voice channel.'
			);
		client.music.init(
			message.guild!.id,
			channel,
			message.channel as TextChannel
		);
		const queue = client.music.queues.get(message.guild!.id)!;
		try {
			await queue.join();
		} catch (e) {
			console.log(e);
			return message.channel.send(
				'You are not in a valid voice channel.'
			);
		}
		const song = queue.play(args[0], message.author!, queue!);
		await song.search();
		const stream = await song.play();
		message.channel.send(
			`Now playing: ${song.name}`,
			new MessageAttachment(song.thumbnail!)
		);
	}
}
