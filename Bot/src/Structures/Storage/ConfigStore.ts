import { Collection } from 'discord.js';

import { Config } from '../../Types/Config';

export class ConfigStore extends Collection<string, Config> {
	constructor() {
		super();
	}
}
