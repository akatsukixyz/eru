import { Router } from 'express';
import { User } from '../../../Models/User';
import { newToken } from '../Util/Token';

import fetch from 'node-fetch';
import btoa from 'btoa';

export const callbackRouter = Router();

const CLIENTID = process.env.CLIENTID,
	CLIENTSECRET = process.env.CLIENTSECRET;

const origin = async (code: string) => {
	const p = await fetch(
		`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURI(
			'http://localhost:5005/callback'
		)}&scope=identify%20guilds`,
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${btoa(`${CLIENTID}:${CLIENTSECRET}`)}`
			}
		}
	).then(x => x.json());
	return p;
};

callbackRouter.get('/callback', async (req, res) => {
	const { code } = req.query;
	const p = await origin(code);
	const { access_token, token_type, expires_in, refresh_token } = p;
	try {
		var { id, username, discriminator, avatar } = await fetch(
			'https://discordapp.com/api/v6/users/@me',
			{
				method: 'GET',
				headers: {
					Authorization: `${token_type} ${encodeURIComponent(
						access_token
					)}`
				}
			}
		).then(x => x.json());
	} catch (e) {
		console.log(e);
	}
	await User.deleteMany({ id });
	// const guilds = await fetch(
	// 	'https://discordapp.com/api/v6/users/@me/guilds',
	// 	{
	// 		method: 'GET',
	// 		headers: { Authorization: `${token_type} ${access_token}` }
	// 	}
	// ).then(x => x.json());
	const verify = await fetch(`http://localhost:5005/verify?id=${id}`).then(
		x => x.json()
	);
	const token = newToken(await User.find());
	await new User({
		id,
		token,
		tag: `${username}#${discriminator}`,
		avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
		guilds: verify,
		expiration: expires_in + Date.now(),
		refresh: refresh_token,
		current: access_token
	}).save();
	res.redirect(`http://localhost:3000?token=${token}`);
});
