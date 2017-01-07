import express from 'express';

import nodemailer from 'nodemailer';
import { EmailTemplate } from 'email-templates';
import path from 'path';

// const transporter = nodemailer.createTransport('smtps://dkdkajej%40gmail.com:Iw2hGF,wcum&slm.@smtp.gmail.com')
const transporter = nodemailer.createTransport('smtp://bmlee%407pictures.co.kr:Thflatk4601#@smtp.worksmobile.com')
const getOptions = ({text, html}) => ({
	from: '"7Pictures" <bmlee@7pictures.co.kr>', // sender address
	to: 'dkdkajej@gmail.com, pjh@7pictures.co.kr', // list of receivers
	subject: 'Test Email', // Subject line
	text,
	html,
	// text: 'Hello world 🐴', // plaintext body
	// html: '<b>Hello world 🐴</b>' // html body
})

const testTemplate = path.join(__dirname, '../src/express/templates/email/test')
const testEmail = new EmailTemplate(testTemplate)

const router = express.Router();

// TODO: add res.json to user auth info
// TODO: exhibition paginaiton
// TODO: magazine genre select
router.get('/', async (req, res) => {
	let user = {name: 'PJH', content: 'Hello Mail! - nodemailer, email-templates'}
	testEmail.render(user, 'ejs', function (err, result) {
		if (err) {
			console.error('error while rendering template');
			console.error(err);
			return res.json({
				error: err
			})
		}

		console.log('result', result);

		let { html, text } = result

		console.log('result.html', html);
		console.log('result.text', text);

		transporter.sendMail(getOptions({html, text}), function (err, info) {
			if (err) {
				console.error(err);
				return res.json({
					error: err
				})
			}

			console.log('Message sent: ' + info.response);
			res.json({
				info
			})
		})
	})
})


export default router;
