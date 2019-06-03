import { EruClient } from '../Eru';
import { MessageEmbed } from 'discord.js';
import { Command } from '../Bot/Command';

export class EmbedCreator {
	public constructor(private client: EruClient) {
		this.client = client;
	}
	public permissions(command: Command, client: boolean, avatar: string) {
		const message = client
			? 'I have insufficient permissions to perform this command.'
			: 'You have insufficient permissions to perform this command.';
		return new MessageEmbed()
			.setTitle(`Error ${command.name}`)
			.setAuthor(message, avatar)
			.setColor(this.client.reference.colors.perms);
	}
	public usage(command: Command, owner: boolean, avatar: string) {
		const { CPU, USED, TOTAL, MEM, PERCENT } = this.client.usage.usage;
		const embed = new MessageEmbed()
			.setAuthor(owner ? 'Usage (Owner Access)' : 'Usage', avatar)
			.addField('CPU', `Model: ${CPU}\nUsage: ${PERCENT}`, true)
			.addField('Memory', `Used: ${USED}\nTotal: ${TOTAL}\nUsage: ${MEM}`)
			.setColor(this.client.reference.colors.default);
		return embed;
	}
}
