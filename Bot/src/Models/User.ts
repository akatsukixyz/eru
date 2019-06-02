import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	id: String,
	token: String,
	tag: String,
	avatar: String,
	guilds: Array,
	expiration: Number,
	refresh: String,
	current: String
});
export const User = model('oauth', UserSchema);
