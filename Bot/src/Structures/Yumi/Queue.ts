import { Song } from './Song';
import {
	VoiceChannel,
	VoiceConnection,
	StreamDispatcher,
	TextChannel,
	User
} from 'discord.js';
import { nc, qc, nnc } from '.';
import { EruClient } from '../Eru/Eru';

export class Queue {
	public songs: Song[];
	public connection: VoiceConnection | null;
	public stream: StreamDispatcher | null;
	public embedUtil: any;
	private current: Song | null;
	public constructor(
		public id: string,
		public channel: VoiceChannel | null,
		private messages: TextChannel | null,
		client: EruClient
	) {
		this.id = id;
		this.songs = [];
		this.current = null;
		this.stream = null;
		this.connection = null;
		if (channel) this.channel = channel;
		this.messages = messages;
		this.embedUtil = {
			nowPlaying: client.embed.creator.nowPlaying,
			queued: client.embed.creator.queued
		};
	}
	public play(input: string, user: User, queue: this) {
		return (this.current = new Song(input, user, queue));
	}
	public async join() {
		if (!this.channel) throw nnc;
		try {
			this.connection = await this.channel.join();
		} catch (e) {
			throw e;
		}
		return this;
	}
	public leave() {
		if (!this.channel) throw nnc;
		try {
			this.channel.leave();
			return true;
		} catch (e) {
			throw e;
		}
	}

	public add(song: Song) {
		this.songs.push(song);
		this.messages!.send(
			this.embedUtil.queued(
				song.name!,
				song.thumbnail!,
				song.avatar,
				song.tag
			)
		);
	}

	public send(message: any) {
		this.messages!.send(message);
	}
	public next() {
		if (!this.current) throw nc;
		if (!this.size) throw qc;
		this.current.skip();
		if (this.hasNext(this.songs)) this.current = this.songs.shift()!;
		else {
			this.end();
			this.leave();
		}
	}

	public clear() {
		this.songs = [];
	}

	public resume() {
		if (!this.current) throw nc;
		this.current.resume();
	}

	public stop() {
		if (!this.current) throw nc;
		this.current.stop();
	}

	public pause() {
		if (!this.current) throw nc;
		this.current.pause();
		return '';
	}
	public get size() {
		return this.songs.length;
	}
	public nowPlaying() {
		const { name, url, state, currentTime, totalTime } = this.current!;
		return { name, url, state, currentTime, totalTime };
	}
	public end() {
		this.stop();
		this.clear();
	}
	public hasNext(ar: any[]) {
		ar.shift();
		if (ar[0]) return true;
		return false;
	}
}
