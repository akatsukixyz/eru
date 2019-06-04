import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import '../../Styles/Guild.css';
import { Paginator } from './GuildPaginator';
import { Main } from './Config/Main';

export class Guild extends Component {
	routes = ['music', 'moderation'];
	content() {
		if (!this.props.route) return <Main id={this.props.id} />;
		// if (this.props.route === 'music') return <Music />
		// if (this.props.route === 'moderation') return <Moderation />
	}
	render() {
		if (this.props.route && !this.routes.includes(this.props.route))
			return <Redirect to={`/dashboard/guild/${this.props.id}`} />;
		return (
			<>
				<div className='container'>
					<Paginator id={this.props.id} route={this.props.route} />
					{this.content()}
				</div>
			</>
		);
	}
}
