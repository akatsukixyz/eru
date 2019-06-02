import { EruClient } from './Structures/Eru/Eru';

import { DefaultClientOptions } from './client';

import { callbackRouter } from './Structures/Server/Routes/Callback';
import { userRouter } from './Structures/Server/Routes/User';

export const client = new EruClient(
	{
		db: process.env.MONGOURL!,
		token: process.env.TOKEN!,
		owners: ['517016133694521374']
	},
	DefaultClientOptions,
	{
		port: 5005,
		routes: [callbackRouter, userRouter]
	}
).start();
client.on('shardReady', id => client.log.botInfo(`Shard ${id} is ready.`));

client.on('ready', async () => {
	client.log.botInfo(`Logged in as ${client.user!.tag}`);
	await client.reference.server.start();
});

client.reference.server.app.get('/verify', async (req, res) => {
	// if (!client.ready)
	// 	return client.log.serverError(
	// 		`Request made to /verify route, but the client wasn't ready yet!`
	// 	);
	const { id } = req.query;
	const part = client.guilds.filter(g => g.members.has(id));
	res.send(JSON.stringify(part.array()));
});
