import { Router } from 'express';

export interface EruOptions {
	token: string | null;
	owners: string[];
	db: string;
	colors?: string[];
}
export interface ServerOptions {
	port: number;
	routes: Router[];
}
