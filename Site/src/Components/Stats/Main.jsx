import React, { Component } from 'react';

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
			`http://localhost:5005/usage`
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
				<div
					className='container'
					style={{
						paddingTop: '20px',
						display: 'flex',
						float: 'none',
						verticalAlign: 'top',
						justifyContent: 'spacing-between'
					}}>
					<div
						className='card border-primary mb-3'
						style={{ maxWidth: '20rem', margin: '1%' }}>
						<div className='card-body'>
							<h4 className='card-title'>CPU</h4>
							<p className='card-text'>
								Model: {this.state.usage.CPU}
								<br />
								Usage: {this.state.usage.PERCENT}
							</p>
						</div>
					</div>
					<div
						className='card border-primary mb-3'
						style={{ maxWidth: '20rem', margin: '1%' }}>
						<div className='card-body'>
							<h4 className='card-title'>Memory</h4>
							<p className='card-text'>
								Used: {this.state.usage.USED}
								<br />
								Total: {this.state.usage.TOTAL}
								<br />
								Usage: {this.state.usage.MEM}
							</p>
						</div>
					</div>
					<div
						className='card border-primary mb-3'
						style={{ maxWidth: '20rem', margin: '1%' }}>
						<div className='card-body'>
							<h4 className='card-title'>Shards</h4>
							<p className='card-text'>
								{this.state.shards.length}
							</p>
						</div>
					</div>
					<div
						className='card border-primary mb-3'
						style={{ maxWidth: '20rem', margin: '1%' }}>
						<div className='card-body'>
							<h4 className='card-title'>Guilds</h4>
							<p className='card-text'>{this.state.guilds}</p>
						</div>
					</div>
					<div
						className='card border-primary mb-3'
						style={{ maxWidth: '20rem', margin: '1%' }}>
						<div className='card-body'>
							<h4 className='card-title'>Users</h4>
							<p className='card-text'>{this.state.users}</p>
						</div>
					</div>
				</div>
			</>
		);
	}
}
