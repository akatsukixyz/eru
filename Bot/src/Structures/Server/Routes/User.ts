import { Router } from 'express';
import { User } from '../../../Models/User';

export const userRouter = Router();

userRouter.get('/user', async (req, res) => {
	if (req.query.token === 'null' || req.query.token === 'undefined')
		return res.json({ errors: 'No token' });
	const user = await User.findOne({ token: req.query.token });
	res.send(user || {});
});

userRouter.get('/user/logout', async (req, res) => {
	const { id } = req.query;
	User.deleteMany({ id });
});
