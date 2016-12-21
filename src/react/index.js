import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { configureStore, DevTools } from './store';
import routes from './routes';

const store = configureStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

/**
 * Wrap top-level App component inside a react-reduc Provider
 * 	to connect component tree to React store
 */
render((
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
), document.getElementById('root'));
