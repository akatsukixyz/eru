import React from 'react';
import { render } from 'react-dom';

import { App } from './Components/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

render(
	<Router>
		<Route path='/' component={App} />
	</Router>,
	document.getElementById('root')
);
