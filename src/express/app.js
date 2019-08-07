import express from 'express'
import session from 'express-session';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'

import logger from 'morgan'
import serialize from 'serialize-javascript'
import Q from 'q'
import path from 'path'
import passport from 'passport'
// db connect
import connection from './lib/db'

// middlewares
import renderReact from './middlewares/reactUtils'
import winstonLogger from './middlewares/logger'

import router from './controllers'; // express router

import { EXPRESS_PORT, REDIS } from '../../env';

import nocache from 'node-nocache';

const app = express();
const publicPath = path.join(__dirname, './../public');

app.use(express.static(__dirname + './../public'));

app.set('views', path.join(publicPath, '../src/express/'));
app.set('view engine', 'ejs');

app.use(winstonLogger);
// app.use(logger('dev'));
app.use(cookieParser())
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.use(nocache);

const RedisStore = require('connect-redis')(session);
app.use(session({
	store: new RedisStore({
		host: REDIS.HOST,
		port: REDIS.PORT,
		pass: REDIS.PASS,
	}),
	saveUninitialized: true,
	resave: false,
	secret: `2xtReam.py-H@rd-2-R2ad`,
	key: `2xtFeam.py-H@rd-2-5wxvq`,
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 15 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// use passport middlewares
import applyPassport from './middlewares/passport'
applyPassport(passport)

app.use(express.static(publicPath));
app.use('/api', router);
app.use(renderReact); // should below router middleware


const server = app.listen(EXPRESS_PORT, () => {
	console.log(`Express listening on port ${EXPRESS_PORT}`);
});

process.on('exit', (code) => {
	console.log(`process exit on code ${code}`);
	server.close();
})

// for gulp-hot-reload to catch
module.exports = app
