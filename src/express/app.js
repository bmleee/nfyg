import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import serialize from 'serialize-javascript'
import Q from 'q'
import path from 'path'

// middlewares
import renderReact from './middlewares/reactUtils'

import router from './controllers'; // express router

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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(publicPath));

app.use('/api', router);

app.use(renderReact);

const server = app.listen(EXPRESS_PORT, () => {
	console.log(`Express listening on port ${EXPRESS_PORT}`);
});

// for gulp-hot-reload to catch
module.exports = app
