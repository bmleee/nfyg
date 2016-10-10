import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';


import {
	TodoApp,
 } from './components';

 import { Home } from './components/Home';

const App = ({ children }) => (
	<div>
		Links:
		{' '}
		<Link to="/">Home</Link>
		{' '}
		<Link to="/todos">Todos</Link>
		{ children }
	</div>
);

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Home}></IndexRoute>
		<Route path="todos" component={TodoApp}></Route>
	</Route>
)

export default routes;
