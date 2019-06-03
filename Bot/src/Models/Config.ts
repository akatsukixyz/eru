import { Schema, model } from 'mongoose';

const configSchema = new Schema({
	id: String,
	enabledPlugins: Array,
	prefix: String
});

export const Config = model('Configs', configSchema);
