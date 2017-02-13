import express from 'express';

import nodemailer from 'nodemailer';
import { EmailTemplate } from 'email-templates';
import path from 'path';

const transporter = nodemailer.createTransport('smtps://dkdkajej%40gmail.com:Iw2hGF,wcum&slm.@smtp.gmail.com')
// const transporter = nodemailer.createTransport('smtp://bmlee%407pictures.co.kr:Thflatk4601#@smtp.worksmobile.com')
const getOptions = ({
	from = '"7Pictures" <bmlee@7pictures.co.kr>',
	to = 'bmlee@7pictures.co.kr',
	subject = 'Test email',
	text,
	html,
	...others
}) => ({
	from,
	to,
	subject,
	text,
	html,
	...others,
})

const testTemplate = path.join(__dirname, '../src/express/templates/email/test')
const testEmail = new EmailTemplate(testTemplate)

const suggestTemplate = path.join(__dirname, '../src/express/templates/email/suggest')
const suggestEmail = new EmailTemplate(suggestTemplate)

const router = express.Router();

// FOR TEST
// TODO: add res.json to user auth info
// TODO: exhibition paginaiton
// TODO: magazine genre select
router.get('/', async (req, res) => {
	let user = {name: 'PJH', content: 'Hello Mail! - nodemailer, email-templates'}
	testEmail.render(user, 'ejs', function (e, result) {
		if (e) {
			console.error('error while rendering template');
			console.error(e);
			return res.json({
				error: e.message
			})
		}

		console.log('result', result);

		let { html, text } = result

		console.log('result.html', html);
		console.log('result.text', text);

		transporter.sendMail(getOptions(result), function (err, info) {
			if (err) {
				console.error(err);
				return res.json({
					error: e.message
				})
			}

			console.log('Message sent: ' + info.response);
			res.json({
				info
			})
		})
	})
})

// 제안하기 -> Admin에게 메일 보내기
router.post('/suggest', async (req, res) => {
	let {
		user,
		body
	} = req

	suggestEmail.render({ user, body }, 'ejs', function (err, result) {
		if (err) {
			console.error(err);
			return res.json({
				error: err.message
			})
		}

		console.log('sugget mail rendering keys : ', Object.keys(result));

		transporter.sendMail(getOptions({
			...result,
			subject: '제안 하기',
		}), function (err, info) {
			if (err) {
				console.error(err);
				return res.json({
					error: err.message
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
