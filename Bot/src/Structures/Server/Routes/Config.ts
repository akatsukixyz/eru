import { Router } from 'express';
import { Config as ConfigModel } from '../../../Models/Config';
import { Config } from '../../../Types/Config';
import { client } from '../../../Main';

export const configRouter = Router();
configRouter.get('/prefix', async (req, res) => {
	const { id } = req.query;
	try {
		const { prefix } = await getPrefix(id);
		res.send(prefix);
	} catch (e) {
		res.send(e);
	}
});
configRouter.get('/update/:route', async (req, res) => {
	const { route } = req.params;
	const { id, prefix } = req.query;
	if (route === 'prefix')
		try {
			await updatePrefix(id, prefix);
			res.send('Success');
		} catch (e) {
			res.send(e);
		}
});

const getPrefix = (id: string): Promise<Config> =>
	ConfigModel.findOne({ id }) as any;

const updatePrefix = async (id: string, prefix: string) => {
	client.storage.change.emit('prefix', id, prefix);
	try {
		await ConfigModel.findOneAndUpdate({ id }, { prefix });
	} catch (e) {
		return e;
	}
};
