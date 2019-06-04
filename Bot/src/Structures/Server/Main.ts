import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import { Express as ExpressApp } from 'express-serve-static-core';
import { EruClient } from '../Eru/Eru';

export class Server {
	public app: ExpressApp;
	public constructor(
		public port: number,
		public client: EruClient,
		private dev: boolean
	) {
		this.app = express();
		this.port = port;
		this.app.use(cors());
		this.client = client;
		if (this.dev) this.app.use(morgan('dev'));
	}
	public route(path: string, router: Router) {
		this.app.use(path, router);
		return this;
	}
	public async start() {
		await mongoose.connect(process.env.MONGOURL!, {
			useFindAndModify: false,
			useNewUrlParser: true
		});
		this.app.listen(this.port, () =>
			this.client.log.serverInfo(`Listening on port ${this.port}...`)
		);
	}
}
