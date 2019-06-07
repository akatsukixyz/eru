import { Queue } from './Queue';
import ytdl from 'ytdl-core';
import { StreamDispatcher, User } from 'discord.js';
import { parseID, isUrl, uc } from '.';
import { nnc, nc } from '.';
import ytsearch, { YouTubeSearchResults } from 'youtube-search';

const search = (str: string): Promise<YouTubeSearchResults[]> => {
	return new Promise((resolve, reject) => {
		const opts: ytsearch.YouTubeSearchOptions = {
			maxResults: 1,
			key: process.env.YOUTUBE
		};
		ytsearch(str, opts, (err, results) => {
			if (err) reject(err);
			resolve((results as any) as Promise<YouTubeSearchResults[]>);
		});
	});
};

interface SongOptions {
	name: string;
	url: string;
	id: string;
	queue: Queue;
	state: SongState;
	quality?: string;
	totalTime?: number;
	currentTime?: number;
}

enum SongState {
	INIT = 'INIT',
	PLAYING = 'PLAYING',
	PAUSED = 'PAUSED',
	STOPPED = 'STOPPED',
	SKIPPED = 'SKIPPED'
}

export class Song {
	public name?: string;
	public url?: string;
	public id?: string;
	public queue: Queue;
	public state: SongState;
	private stream: StreamDispatcher | null;
	public thumbnail?: string;
	public quality?: string;
	public totalTime?: number;
	public currentTime?: number;
	constructor(public input: string, private user: User, queue: Queue) {
		this.state = SongState.INIT;
		this.queue = queue;
		this.stream = null;
		this.user = user;
	}

	public async play() {
		if (!this.url) await this.search();
		if (!this.queue.connection) throw nnc;
		if (!this.queue) throw 'No queue is running for that server.';
		if (this.queue.nowPlaying()) this.queue.add(this);
		if (!ytdl.validateURL(this.url!)) throw 'Invalid URL';
		const stream = this.queue.connection.play(
			await ytdl(this.url!, {
				quality: this.quality || 'highestaudio'
			})
		);

		this.stream = stream;
		this.queue.stream = this.stream;
		this.stream.on('end', () => this.skip());
		this.queue.send(
			this.queue.embedUtil.nowPlaying(
				this.name,
				this.thumbnail,
				this.user.displayAvatarURL(),
				this.user.tag
			)
		);
		return this.stream;
	}
	public async search() {
		if (isUrl(this.input)) return;
		const searched: any = await search(this.input);
		const {
			link,
			title,
			thumbnails: {
				high: { url }
			}
		} = searched[0];
		this.url = link;
		this.name = title;
		this.thumbnail = url;
	}

	public async resume() {
		this.state = SongState.PLAYING;
	}
	public pause() {
		this.stream!.pause();
		this.state = SongState.PAUSED;
	}
	public async stop() {
		this.stream!.pause();
		this.stream = null;
		this.state = SongState.STOPPED;
	}
	public async skip() {
		this.stop();
		this.queue.next();
		this.state = SongState.SKIPPED;
	}
	public get tag() {
		return this.user.tag;
	}
	public get avatar() {
		return this.user.displayAvatarURL();
	}
	public async setVolume(vol: number) {
		if (!this.stream) throw nc;
		this.stream.setVolume(vol);
	}
}
