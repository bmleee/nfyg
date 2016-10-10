import React from 'react';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { routerReducer, routerMiddleware } from 'react-router-redux';

// middlewares
import thunk from 'react-thunk';

import { todos } from './reducers';

export const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" preserveScrollTop={false} />
	</DockMonitor>
);

/**
 * TODO: add reducers
 */
export function configureStore(history, initialState) {
	const reducer = combineReducers({
		routing: routerReducer,
		todos,
	});

	const logger = (store) => (next) => (action) => {
	  if(typeof action !== "function"){
	    console.log('dispatching:', action);
	  }
	  return next(action);
	}

	let devTools = [];

	if (typeof document !== 'undefined') {
		devTools = [ DevTools.instrument() ];
	}

	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(
				logger,
				routerMiddleware(history),
			)
		),
		applyMiddleware(thunk),
		...devTools
	);

	return store;
}
