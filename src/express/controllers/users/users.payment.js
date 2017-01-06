// Load the module dependencies
import express from 'express'

import _ from 'lodash'

import UserModel from '../../models/user'
import PaymentModel from '../../models/payment'

import isLoggedIn from '../../lib/login-check'
import  * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
	console.log('users.payment : /users/payment');
	try {
		let payments = await PaymentModel.findByUser(req.session.user)
		return res.json({
			user: renderUser.authorizedUser(req.session.user),
			data: {
				payments: await Promise.all(payments.map(x => x.toJSON()))
			}
		})
	} catch (e) {
		return res.status(400).json({
			user: renderUser.authorizedUser(req.session.user),
			error: e
		})
	}
})

router.post('/', isLoggedIn, async (req, res) => {
	const {
		user
	} = req.session
	const body = _.pick(req.body, ['card_number', 'expiry', 'birth', 'pwd_2digit'])

	try {
		body.user = user
		let payment = await PaymentModel.create(body)

		console.log(`[User ${user.id}] add new payment ${payment._id}`);
		res.json({
			response: { payment }
		})
	} catch (e) {
		console.error(e);
		res.status(400).json({
			error: e
		})
	}
})

export default router
