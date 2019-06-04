export const check = ({ tag, time, id, token }) => {
	const now = Date.now();
	if (time <= now) return false;
};
