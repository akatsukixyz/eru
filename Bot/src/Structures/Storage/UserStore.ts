import { Collection } from 'discord.js';

import { User } from '../../Types/User';

export class UserStore extends Collection<string, User> {
	constructor() {
		super();
	}
}
