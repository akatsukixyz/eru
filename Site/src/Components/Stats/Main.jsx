import React, { Component } from 'react';

import fetch from 'node-fetch';

export class MainStats extends Component {
	state = {
		usage: {
			CPU: '',
			PERCENT: '',
			USED: '',
			TOTAL: '',
			MEM: ''
		},
		shards: [],
		guilds: 0,
		users: 0
	};
	async componentDidMount() {
		const { usage, shards, guilds, users } = await fetch(
			'http://localhost:5005/usage'
		).then(x => x.json());
		this.setState({
			usage,
			shards,
			guilds,
			users
		});
	}
	render() {
		return (
			<>
				<div class='jumbotron'>
					<h1 class='display-3'>Hello, world!</h1>
					<p class='lead'>
						CPU Model: {this.state.usage.CPU}
						<br />
						CPU Usage: {this.state.usage.PERCENT}
						<br />
						Used RAM: {this.state.usage.USED}
						<br />
						Total RAM: {this.state.usage.TOTAL}
						<br />
						RAM Usage: {this.state.usage.MEM}
						<br />
						Shard Count: {this.state.shards.length}
						<br />
						Guild Count: {this.state.guilds}
						<br />
						User Count: {this.state.users}
					</p>
					<hr class='my-4' />
					<p>
						It uses utility classes for typography and spacing to
						space content out within the larger container.
					</p>
					{/* <p class='lead'>
						<a
							class='btn btn-primary btn-lg'
							href='#'
							role='button'>
							Learn more
						</a>
					</p> */}
				</div>
			</>
		);
	}
}
