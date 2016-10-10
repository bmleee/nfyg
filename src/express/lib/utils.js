import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router';

import serialize from 'serialize-javascript'

// https://github.com/pro-react/sample-code/blob/master/chapter%208/universal-react/server.js
export function getPropsFromRoute({ routes }, componentProps) {
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

export function renderRoute({ response, routes, renderProps, store, history }) {
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
