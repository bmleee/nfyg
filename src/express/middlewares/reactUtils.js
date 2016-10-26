import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from '../../react/store';
import reactRoutes from '../../react/routes';

import serialize from 'serialize-javascript'

/**
 * Helper functions used in this module
 */
// https://github.com/pro-react/sample-code/blob/master/chapter%208/universal-react/server.js
function getPropsFromRoute ({ routes }, componentProps) {
	let props = {};
	let lastRoute = routes[routes.length - 1];

	routes.reduceRight( (pre, cur) => {
		componentProps.forEach(componentProp => {
			if (!props[componentProp] && cur.component[componentProp]) {
				props[componentProp] = cur.component[componentProp];
			}
		});
	}, lastRoute);
	return props;
}

function renderRoute ({ response, routes, renderProps, store, history }) {
	const content = renderToString(
		<Provider store={store} history={history}>
			<RouterContext {...renderProps} />
		</Provider>
	);

	response.render('index', {
		content: content,
		initialState: serialize(store.getState()),
	});
}

/**
 * function to be exported
 */
export default function renderReact (request, response, next) {
	const memoryHistory = createMemoryHistory(request.url);
	const store = configureStore(memoryHistory);
	const history = syncHistoryWithStore(memoryHistory, store);

	match({ history, routes: reactRoutes, location: request.url}, (error, redirectLocation, renderProps) => {
		if (error) response.status(500).send(error.message);
		else if (redirectLocation) response.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
		else if (renderProps) {
			renderRoute({ response, routes: reactRoutes, renderProps, store, history });
		} else response.status(404).render('404');
	})

	next()
}
