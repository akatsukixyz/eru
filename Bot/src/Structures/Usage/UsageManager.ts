import { EruClient } from '../Eru/Eru';
import * as util from 'node-os-utils';

export interface ClientUsage {
	CPU: string;
	USED: number;
	TOTAL: number;
	MEM: string;
	PERCENT: string;
}

export class UsageManager {
	public current: ClientUsage;
	constructor(public client: EruClient) {
		this.client = client;
		this.current = {
			CPU: '',
			USED: 0,
			TOTAL: 0,
			MEM: '',
			PERCENT: ''
		};
	}
	public async cycle() {
		this.stats();
		setInterval(this.stats, 3e5);
	}
	public async stats() {
		const cpu = await util.cpu.usage();
		const {
			totalMemMb,
			usedMemMb
		}: { totalMemMb: number; usedMemMb: number } = await util.mem.used();
		const model = util.cpu.model();
		this.current = {
			CPU: model,
			USED: usedMemMb,
			TOTAL: totalMemMb,
			MEM: ((usedMemMb / totalMemMb) * 100).toFixed(1),
			PERCENT: `${cpu}%`
		};
		this.client.log.botInfo('Updated stats');
	}
	public get usage() {
		return this.current;
	}
}
