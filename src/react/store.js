import React from 'react';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { routerReducer, routerMiddleware } from 'react-router-redux';

// middlewares
import thunk from 'redux-thunk';

export const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" preserveScrollTop={false} />
	</DockMonitor>
);


const makeReducer = () => combineReducers({
		routing: routerReducer,
})

/**
 * TODO: add reducers
 */
export function configureStore(history, initialState) {
	const reducer = makeReducer()

	const logger = (store) => (next) => (action) => {
	  if(typeof action !== "function" && !action.type.includes('@@router/LOCATION_CHANGE')){
	    console.log('dispatching:', action);
	  }
	  return next(action);
	}

	let devTools = [];

	if (typeof document !== 'undefined' && process.env.NODE_ENV !== 'production') {
		devTools = [ DevTools.instrument() ];
	}

	const store = createStore(
		reducer,
		initialState,
		applyMiddleware(
			logger,
			thunk,
			routerMiddleware(history),
			// ...devTools,
			// remoteActionMiddleware(socket), // TODO: activate to send action to server
		)
		// compose(
		//
		// ),
	);

	return store;
}

export function makeDefaultStore() {
	return createStore(
		makeReducer()
	)
}
