import fetch from 'node-fetch';

// export const origin = async code =>
// 	await fetch('http://localhost:5005/origin', {
// 		body: {
// 			code
// 		}
// 	}).then(x => x.json());

export const user = async token => {
	const p = await fetch(`http://localhost:5005/user?token=${token}`).then(x =>
		x.json()
	);
	return p;
};
