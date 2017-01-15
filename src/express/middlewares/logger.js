import path from 'path'

import winston from 'winston'
import expressWinston from 'express-winston'
import 'winston-daily-rotate-file'
import 'date-utils'

const timestampHelper = () => new Date().toFormat('YYYY-MM-DD HH24:MI:SS')

const logger = expressWinston.logger({
	transports: [
		new winston.transports.Console({
			// level: process.env.NODE_ENV === 'development' ? 'error'
			// 	: process.env.NODE_ENV === 'test' ? 'debug'
			// 		: 'info',
			timestamp: timestampHelper,
			json: false,
			colorize: true
		}),

		new winston.transports.File({
			level: 'info',
			name: 'info.log',
			filename: path.join(__dirname, '../log/info'),
			maxsize: 52428800, // 50MB
			maxFiles: 5,
			timestamp: timestampHelper,
			json: true,
			colorize: false
		}),

		new winston.transports.DailyRotateFile({
			level: 'info',
			name: 'daily.info.log',
			filename: path.join(__dirname, '../log/info '),
			datePattern: 'yyyy-MM-dd HH:mm:ss',
			maxsize: 524288000, // 500MB
			maxFiles: 5,
			timestamp: timestampHelper,
			json: true,
			colorize: false
		}),

		new winston.transports.File({
			level: 'error',
			name: 'error.log',
			filename: path.join(__dirname, '../log/error'),
			maxsize: 52428800, // 50MB
			maxFiles: 5,
			timestamp: timestampHelper,
			json: true,
			colorize: false
		}),

		new winston.transports.DailyRotateFile({
			level: 'error',
			name: 'daily.error.log',
			filename: path.join(__dirname, '../log/error '),
			datePattern: 'yyyy-MM-dd HH:mm:ss',
			maxsize: 524288000, // 500MB
			maxFiles: 5,
			timestamp: timestampHelper,
			json: true,
			colorize: false
		}),

	],
	meta: false, // optional: control whether you want to log the meta data about the request (default to true)
	msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
	colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
	ignoreRoute: function (req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response
	exiotOnError: false,
})

export default logger
