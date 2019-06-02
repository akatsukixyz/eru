import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import { Guilds } from './Guilds';

import { user } from '../../Util/Fetching';

// import { origin } from '../../Util/Fetching';
import '../../Styles/Dashboard.css';
import { Guild } from './Guild';

export class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			guilds: []
		};
	}
	async componentDidMount() {
		const u = await user(this.props.token);
		this.setState({
			guilds: u.guilds
		});
	}
	render() {
		document.title = 'Eru | Dashboard';
		const { guilds } = this.state;
		return (
			<>
				<div className='guilds'>
					<div className='container'>
						<div className='row'>
							<Route exact path='/dashboard'>
								<Guilds guilds={guilds} />
							</Route>
							<Route
								path='/dashboard/guild/:id'
								component={Guild}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}
