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

// not used
// https://coderwall.com/p/56a9ja/uploading-to-s3-returns-signaturedoesnotmatch
import crypto from 'crypto'
export function getSignedRequest(file, AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET) {
	let now = new Date();
	let expires = Math.ceil((now.getTime() + 60000)/1000); // 60 seconds from now
	let amz_headers = "x-amz-acl:public-read";

	let put_request = "PUT\n\n"+file.type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+file.name;

	let signature = crypto.createHmac('AWS4-HMAC-SHA256', AWS_SECRET_KEY).update(put_request).digest('base64');
	signature = signature.replace('+','%2B')
	                                 .replace('/','%2F')
	                                 .replace('=','%3D');
	signature = encodeURIComponent(signature.trim());
	let url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+file.name;
	let credentials = {
	    signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
	    url: url
	};

	return credentials;
}

export function checkMimeType(mimeType) {
	const supportedTypes = ['png', 'jpg', 'jpeg', 'mpeg3']
  return supportedTypes.includes(mimeType) // require polyfill?
}