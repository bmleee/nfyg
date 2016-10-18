import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import serialize from 'serialize-javascript'
import Q from 'q'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from '../react/store'; // why ../../src ?
import reactRoutes from '../../src/react/routes';

import { renderRoute } from './lib/utils';

import path from 'path';

import { EXPRESS_PORT, MONGODB_URL } from '../../env';

import mongoose from 'mongoose';
mongoose.Promise = Q.Promise;
mongoose.connect(MONGODB_URL);
const db = mongoose.connection;
db.once('open', () => {
	console.log('mongoose is connected');
})
.on('error', (error) => {
	console.log(error);
})

const app = express();
const publicPath = path.join(__dirname, './../public');

app.set('views', path.join(publicPath, '../src/express/'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(publicPath));

import router from './routes';
app.use('/api', router);

app.use((request, response) => {
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
});


const server = app.listen(EXPRESS_PORT, () => {
	console.log(`Express listening on port ${EXPRESS_PORT}`);
});

function test_func() {
	return new Promise(function(resolve, reject) {
		setInterval( function() {
			resolve('return from test_func after 1sec');
		}, 1000)
	});
}

async function test_func2() {
	let ret = await test_func();

	return ret;
}
