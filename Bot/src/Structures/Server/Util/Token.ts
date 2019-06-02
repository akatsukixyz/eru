const random = () => {
	const res: string[] = [];
	const chars =
		'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 0; i < 20; i++) {
		res.push(chars[Math.floor(Math.random() * chars.length)]);
	}
	return res.join('');
};
export const newToken = (docs: any[]) => {
	var token = random();
	while (docs.some(x => x.token === token)) token = random();
	return token;
};
