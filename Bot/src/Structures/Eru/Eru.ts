import { Client, ClientOptions } from 'discord.js';

import mongoose from 'mongoose';

import { EruStorage } from './Storage';
import { EruOptions, ServerOptions } from './Misc/Options';
import { EruStates } from './Misc/States';
import { Server } from '../Server/Main';
import { LoggingManager } from '../Logging/Main';
import { EmbedCreator } from './Embed/EmbedCreator';
import { UsageManager } from '../Usage/UsageManager';

export class EruClient extends Client {
	public storage: EruStorage;
	public state: EruStates;
	public reference: { owners: string[]; db: string; server: Server };
	public embed: { creator: EmbedCreator };
	public log: LoggingManager;
	public usage: UsageManager;

	constructor(
		options: EruOptions,
		cOptions: ClientOptions,
		sOptions: ServerOptions
	) {
		super(cOptions);

		this.state = EruStates.NONE;

		this.storage = new EruStorage();

		this.token = options.token;

		this.log = new LoggingManager(this);

		this.reference = {
			owners: options.owners,
			db: options.db,
			server: new Server(sOptions.port, this, false)
		};

		this.embed = {
			creator: new EmbedCreator(this)
		};

		this.usage = new UsageManager(this);

		for (const route of sOptions.routes)
			this.reference.server.route('/', route);

		this.init();

		this.on('ready', () => {
			this.state = EruStates.READY;
			this.usage.cycle();
			this.reference.server.app.get('/verify', async (req, res) => {
				// if (!client.ready)
				// 	return client.log.serverError(
				// 		`Request made to /verify route, but the client wasn't ready yet!`
				// 	);
				const { id } = req.query;
				const part = this.guilds.filter(g => g.members.has(id));
				res.send(JSON.stringify(part.array()));
			});
			this.reference.server.app.get('/usage', (req, res) =>
				res.send({
					usage: this.usage.usage,
					shards: this.shard!.ids,
					guilds: this.guilds.size,
					users: this.users.size
				})
			);
		});
	}
	private async init() {
		try {
			await mongoose.connect(this.reference.db, {
				useFindAndModify: false,
				useNewUrlParser: true
			});
		} catch (e) {
			throw new Error(
				`Error connecting to the specified MongoDB: \n${e}`
			);
		}
		this.state = EruStates.INIT;
	}
	public start() {
		this.login(this.token as string);
		this.state = EruStates.START;
		return this;
	}
	public get ready() {
		return this.state === EruStates.READY;
	}
}
