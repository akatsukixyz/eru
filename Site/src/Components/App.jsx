import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
// import { save, load, remove } from 'react-cookies';

import { Navbar } from './Layout/Navbar';
import { Dashboard } from './Dashboard/Main';
import { Welcome } from './Home/Welcome';

import { user } from '../Util/Fetching';
import { query } from '../Util/Callback';
import { Guild } from './Dashboard/Guild';
import { MainStats } from './Stats/Main';

export class App extends Component {
	constructor() {
		super();
		const token = localStorage.getItem('token');
		this.state = {
			account: 'Login',
			loggedIn: false,
			token
		};
	}
	async componentDidMount() {
		const x = await user(
			this.state.token || query(this.props.location.search).token
		);
		if ((x && !Object.keys(x).length) || !x)
			return localStorage.removeItem('token');
		const { tag, expiration, token } = x;
		if (!tag || !expiration) return localStorage.removeItem('token');
		if (expiration <= Date.now()) return localStorage.removeItem('token');
		this.setState({
			account: tag,
			loggedIn: true,
			token
		});
		localStorage.setItem('token', token);
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
						if (!this.state.token) {
							localStorage.removeItem('token');
							return <Redirect to='/login' />;
						}
						return <Dashboard token={this.state.token} />;
					}}
				/>
				<Route
					path='/dashboard/guild/:id'
					component={({ match }) => {
						if (!this.state.token) {
							localStorage.removeItem('token');
							return <Redirect to='/login' />;
						}
						return <Guild id={match.params.id} />;
					}}
				/>
				<Route
					exact
					path='/logout'
					render={() => {
						if (this.state.token) {
							localStorage.removeItem('token');
							this.setState({
								account: 'Login',
								loggedIn: false,
								token: undefined
							});
							return <Redirect to='/' />;
						}
						return <Redirect to='/login' />;
					}}
				/>
			</>
		);
	}
}
