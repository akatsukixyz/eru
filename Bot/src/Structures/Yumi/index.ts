import { Queue } from './Queue';
import { Song } from './Song';
import { Yumi } from './QueueStore';

export { Queue, Song, Yumi };

export const nc = 'Not currently playing.',
	nnc = 'Not currently connected.',
	qc = 'Queue is empty',
	uc = 'Song has not been searched for yet';

export const isUrl = (str: string): boolean => {
	if (/(https?:\/\/)?(www.)?(youtu.be|youtube.com)\/watch\?v=.+/.test(str))
		return true;
	if (parseID(str)) return false;
	return false;
};
export const parseID = (url: string) => {
	if (!/(https?:\/\/)?(www.)?(youtu.be|youtube.com)\/watch\?v=.+/.test(url))
		return null;
	const id = url.split('?v=');
	return id.length > 1 ? id[1] : url.split('.be/')[1] || url;
};
