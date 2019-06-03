import { EruClient } from '../Eru';

export abstract class Event {
	constructor(public name: string) {
		this.name = name;
	}
	public async execute(client: EruClient, ...any) {}
}
