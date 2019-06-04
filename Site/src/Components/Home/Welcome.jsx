import React, { Component } from 'react';
import { query } from '../../Util/Callback';

export class Welcome extends Component {
	componentDidUpdate(prev) {
		if (prev.location.pathname === '/login')
			localStorage.setItem(
				'token',
				query(this.props.location.search).token
			);
	}
	render() {
		document.title = 'Eru | Home';

		return (
			<>
				<div className='container'>Hi</div>
			</>
		);
	}
}
