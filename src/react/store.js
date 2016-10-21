import React from 'react';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { routerReducer, routerMiddleware } from 'react-router-redux';

// middlewares
import thunk from 'react-thunk';

import { todos } from './reducers';
import { ProjectEditor } from './reducers'

export const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" preserveScrollTop={false} />
	</DockMonitor>
);


const makeReducer = () => combineReducers({
		routing: routerReducer,
		todos,
		ProjectEditor,
})

/**
 * TODO: add reducers
 */
export function configureStore(history, initialState) {
	//const reducer = combineReducers({
	//	routing: routerReducer,
	//	todos,
	//	ProjectEditor,
	//});

	const reducer = makeReducer()

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
				routerMiddleware(history)
			)
		),
		applyMiddleware(thunk),
		...devTools
	);

	return store;
}

export function makeDefaultStore() {
	return createStore(
		makeReducer()
	)
}