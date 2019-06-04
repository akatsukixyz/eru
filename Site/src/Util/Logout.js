import React from 'react';

import { Redirect } from 'react-router-dom';

export const Logout = (token, id, isComponent, isLogout) => {
	localStorage.removeItem('token');
	localStorage.removeItem('account');
	if (token) {
		fetch(`${process.env.API}/user/logout?id=${id}`);
	}
	if (isComponent) {
		return <Redirect to='/login' />;
	}
	if (isLogout) {
		return <Redirect to='/' />;
	}
};
