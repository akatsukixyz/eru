import { EruClient } from '../Eru/Eru';

export class LoggingManager {
	constructor(public client: EruClient) {
		console.log('[MAIN] -> Logger initialized...');
	}
	botInfo(msg: string) {
		console.log('[BOT] {INFO} -> ' + msg);
	}
	botError(msg: string) {
		console.log('[BOT] {ERR} -> ' + msg);
	}
	serverInfo(msg: string) {
		console.log('[SERVER] {INFO} -> ' + msg);
	}
	serverError(msg: string) {
		console.log('[SERVER] {ERR} -> ' + msg);
	}
}
