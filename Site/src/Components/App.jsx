import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { Navbar } from './Layout/Navbar';
import { Dashboard } from './Dashboard/Main';
import { Welcome } from './Home/Welcome';

import { user } from '../Util/Fetching';
import { query } from '../Util/Callback';
import { Guild } from './Dashboard/Guild';
import { MainStats } from './Stats/Main';
import { Logout } from '../Util/Logout';

export class App extends Component {
	constructor() {
		super();
		const token = localStorage.getItem('token');
		this.state = {
			account: localStorage.getItem('account') || 'Login',
			loggedIn: false,
			id: '',
			token
		};
	}
	async componentDidMount() {
		const x = await user(
			this.state.token || query(this.props.location.search).token
		);
		if ((x && !Object.keys(x).length) || !x)
			return Logout(this.state.token);
		const { tag, expiration, token, id } = x;
		if (!tag || !expiration) return Logout(token, id);
		if (expiration <= Date.now()) return Logout(token, id);
		this.setState({
			account: tag,
			loggedIn: true,
			id,
			token
		});
		localStorage.setItem('token', token);
		localStorage.setItem('account', tag);
	}
	render() {
		return (
			<>
				<Navbar account={this.state.account} />
				<Route exact path='/' component={Welcome} />
				<Route exact path='/stats' component={MainStats} />
				<Route
					exact
					path='/login'
					render={() =>
						this.state.loggedIn ? (
							<Redirect to='/dashboard' />
						) : (
							(window.location.href =
								'https://discordapp.com/api/oauth2/authorize?client_id=579355737755484182&redirect_uri=http%3A%2F%2Flocalhost%3A5005%2Fcallback&response_type=code&scope=identify%20guilds')
						)
					}
				/>
				<Route
					exact
					path='/dashboard'
					component={() => {
						if (!this.state.token)
							return Logout(
								this.state.token,
								this.state.id,
								true
							);
						return <Dashboard token={this.state.token} />;
					}}
				/>

				<Route
					exact
					path='/logout'
					render={() => {
						if (this.state.token) {
							this.setState({
								account: 'Login',
								loggedIn: false,
								id: undefined,
								token: undefined
							});
							return Logout(
								this.state.token,
								this.state.id,
								false,
								true
							);
						}
						return <Redirect to='/login' />;
					}}
				/>
				<Route
					path='/dashboard/guild/:id/:route?'
					component={({ match }) => {
						if (!this.state.token)
							return Logout(
								this.state.token,
								this.state.id,
								true
							);
						return (
							<Guild
								id={match.params.id}
								route={match.params.route}
							/>
						);
					}}
				/>
			</>
		);
	}
}
