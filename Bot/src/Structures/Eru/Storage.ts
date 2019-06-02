import { ConfigStore } from '../Storage/ConfigStore';
import { UserStore } from '../Storage/UserStore';
// import { CaseStore } from '../Storage/CaseStore';
// import { QueueStore } from '../Storage/QueueStore';
import { User as UserModel } from '../../Models/User';
import { Config } from '../../Types/Config';
import { Config as ConfigModel } from '../../Models/Config';
import { User } from '../../Types/User';

export class EruStorage {
	public configs: ConfigStore;
	public users: UserStore;
	constructor() {
		this.configs = new ConfigStore();
		this.users = new UserStore();
	}
	public async load() {
		const configs = ((await ConfigModel.find()) as unknown) as Config[];
		const users = ((await UserModel.find()) as unknown) as User[];
		for (const config of configs) this.configs.set(config.id, config);

		for (const user of users) this.users.set(user.id, user);
	}
}
