import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export class Paginator extends Component {
	render() {
		return (
			<>
				<div className='container' style={{ paddingTop: '20px' }}>
					<ul className='nav nav-tabs'>
						<li className='nav-item'>
							<NavLink
								exact
								to={`/dashboard/guild/${this.props.id}`}
								className='nav-link'
								activeClassName='active'>
								Main
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={`/dashboard/guild/${this.props.id}/music`}
								className='nav-link'
								activeClassName='active'>
								Music
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={`/dashboard/guild/${
									this.props.id
								}/moderation`}
								className='nav-link'
								activeClassName='active'>
								Moderation
							</NavLink>
						</li>
					</ul>
				</div>
			</>
		);
	}
}
