import React, { Component } from 'react';

export class Main extends Component {
	state = {
		prefix: 'Prefix'
	};
	async componentDidMount() {
		const prefix = await fetch(
			`http://localhost:5005/prefix?id=${this.props.id}`
		).then(x => x.text());
		this.setState({ prefix });
	}
	submit = async e => {
		const res = await fetch(
			`http://localhost:5005/update/prefix
			?id=${this.props.id}
			&prefix=${this.state.prefix}`
		).then(x => x.text());
		console.log(res);
	};
	changing = e => {
		console.log(e.target.value);
		this.setState({ prefix: e.target.value });
	};
	render() {
		return (
			<>
				<div className='jumbotron' style={{ margin: '2px 22.35%' }}>
					<form>
						<div className='form-group'>
							<label>Prefix</label>
							<input
								type='name'
								className='form-control'
								value={this.state.prefix}
								id='prefix-entry'
								onChange={this.changing}
							/>
						</div>
						<button
							type='submit'
							className='btn btn-primary'
							onClick={this.submit}>
							Submit
						</button>
					</form>
				</div>
			</>
		);
	}
}
