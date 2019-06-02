import { Schema, model } from 'mongoose';

const configSchema = new Schema({
	id: String,
	enabledPlugins: Array
});

export const Config = model('Configs', configSchema);
