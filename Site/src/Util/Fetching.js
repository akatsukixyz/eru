export const user = async token => {
	const p = await fetch(`http://localhost:5005/user?token=${token}`).then(x =>
		x.json()
	);
	return p;
};
