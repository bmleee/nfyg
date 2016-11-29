import express from 'express'
import session from 'express-session';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import flash from 'connect-flash'
import passport from "passport"

import logger from 'morgan'
import serialize from 'serialize-javascript'
import Q from 'q'
import path from 'path'

// db connect
import connection from './lib/db'

// middlewares
import renderReact from './middlewares/reactUtils'

import router from './controllers'; // express router

import { EXPRESS_PORT } from '../../env';

const app = express();
const publicPath = path.join(__dirname, './../public');

app.set('views', path.join(publicPath, '../src/express/'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'sessionSecret'
}));

// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var passport_1 = require("./middlewares/passport");
var passport_1 = passport_1();

app.use(express.static(publicPath));

app.use('/api', router);

app.use(renderReact);

const server = app.listen(EXPRESS_PORT, () => {
	console.log(`Express listening on port ${EXPRESS_PORT}`);
});

// for gulp-hot-reload to catch
module.exports = app
