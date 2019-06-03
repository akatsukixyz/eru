import { EruClient } from './Structures/Eru/Eru';

import { DefaultClientOptions } from './client';
import { EruColors } from './Colors';
import Commands from './Commands/Registry';
import Events from './Events/Registry';

import { callbackRouter } from './Structures/Server/Routes/Callback';
import { userRouter } from './Structures/Server/Routes/User';
import { configRouter } from './Structures/Server/Routes/Config';

export const client = new EruClient(
	{
		db: process.env.MONGOURL!,
		token: process.env.TOKEN!,
		owners: ['517016133694521374'],
		colors: EruColors,
		commands: Commands,
		events: Events
	},
	DefaultClientOptions,
	{
		port: 5005,
		routes: [callbackRouter, userRouter, configRouter]
	}
).start();

client.reference.server.app.get('/verify', async (req, res) => {
	const { id } = req.query;
	const part = client.guilds.filter(g => g.members.has(id));
	res.send(JSON.stringify(part.array()));
});
