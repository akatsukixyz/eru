import React, { Component } from 'react';

export class Guilds extends Component {
	render() {
		const guilds = [];
		this.props.guilds.map((guild, i) =>
			guilds.push(
				<div className='col-sm-4' key={i}>
					<div
						className='card text-white bg-primary mb-3'
						style={{ maxWidth: '20rem' }}>
						<div className='card-body'>
							{guild.icon ? (
								<img
									src={`https://cdn.discordapp.com/icons/${
										guild.id
									}/${guild.icon}.png`}
									alt='No icon'
									style={{
										borderRadius: '3%',
										display: 'block'
									}}
								/>
							) : null}

							<h4 className='card-title'>
								<a
									href={`/dashboard/guild/${guild.id}`}
									style={{ color: 'white' }}>
									{guild.name}
								</a>
							</h4>
						</div>
					</div>
				</div>
			)
		);
		return (
			<>
				<div className='container'>
					<div className='row'>{guilds}</div>
				</div>
			</>
		);
	}
}
