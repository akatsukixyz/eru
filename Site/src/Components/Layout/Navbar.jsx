import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import '../../Styles/Navbar.css';

export class Navbar extends Component {
	render() {
		return (
			<>
				<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
					<div className='container'>
						<NavLink to='#' className='navbar-brand'>
							Eru
						</NavLink>
						<button
							className='navbar-toggler'
							type='button'
							data-toggle='collapse'
							data-target='#navbarColor01'
							aria-controls='navbarColor01'
							aria-expanded='false'
							aria-label='Toggle navigation'>
							<span className='navbar-toggler-icon' />
						</button>

						<div
							className='collapse navbar-collapse'
							id='navbarColor01'>
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item'>
									<NavLink
										className='nav-link'
										activeClassName='active'
										to='/'>
										Home
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										className='nav-link'
										activeClassName='active'
										to='/stats'>
										Stats
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										className='nav-link'
										to='/dashboard'
										activeClassName='active'>
										Dashboard
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										className='nav-link'
										activeClassName='active'
										to='/about'>
										About
									</NavLink>
								</li>
							</ul>
							<span className='navbar-text'>
								<a
									href='https://discordapp.com/oauth2/authorize?client_id=579355737755484182&scope=bot&permissions=8'
									className='nav-link'>
									Invite
								</a>
							</span>
							<span className='navbar-text'>
								{this.props.account === 'Login' ? (
									<NavLink className='nav-link' to='/login'>
										{this.props.account}
									</NavLink>
								) : (
									<NavLink className='nav-link' to='/logout'>
										{this.props.account}
									</NavLink>
								)}
							</span>
						</div>
					</div>
				</nav>
			</>
		);
	}
}
