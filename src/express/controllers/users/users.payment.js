'use strict';
// Load the module dependencies
import express from 'express'

import _ from 'lodash'

import UserModel from '../../models/user'
import PaymentModel from '../../models/payment'
import IMP from '../../lib/iamport'

import isLoggedIn from '../../lib/login-check'
import * as renderUser from '../../lib/renderUser'
import * as ac from '../../lib/auth-check'

const router = express.Router();

// TODO: filter payment keys: card_number, ...
router.get('/', isLoggedIn, async (req, res) => {
	try {
		let payments = await PaymentModel.findByUser(req.user)
		return res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				payments: await Promise.all(payments.map(x => ({
					_id: x._id,
					card_name: x.card_name,
					card_number: x.card_number,
					expiry: x.expiry,
					birth: x.birth,
					pwd_2digit: x.pwd_2digit,
				}))),
				message_error: req.flash('error')
			}
		})
	} catch (e) {
		return res.status(500).json({
			user: renderUser.authorizedUser(req.user),
			data: {
				message_error: req.flash('error')
			}
		})
	}
})

// TODO: should notify error!
router.post('/', isLoggedIn, async (req, res) => {
	try {
		const {
			user
		} = req
		const body = _.pick(req.body, ['card_number', 'expiry', 'birth', 'pwd_2digit'])
		body.user = user
		
		// check card number
		try {
			let {
	      card_name,
	    } = await IMP.subscribe_customer.create({
	      customer_uid: user.id + '-' + body.card_number.substring(15, 19) + '-7Pictures',
	      card_number: body.card_number,
	      expiry: body.expiry,
	      birth: body.birth,
	      pwd_2digit: body.pwd_2digit,
	    })	
			body.card_name = card_name
		} catch (e) {
			// console.error(e);
			req.flash('error', e.message);
			res.status(500).json({ error: e.message })
		}
		
		body.card_number = body.card_number.substring(15, 19)
		body.birth = ''
		body.pwd_2digit = ''

		let payment = await PaymentModel.create(body)

		console.log(`[User ${user.id}] add new payment ${payment._id}`);
		res.json({
			response: { payment }
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: e.message
		})
	}
})

router.delete('/:id', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let payment = await PaymentModel.findById(req.params.id)

		if(!ac.canEdit(user, payment)) throw new Error(`User ${user.id} can't remove payment ${payment._id}`)

		let r = await payment.remove()

		res.json({ response: !!r })

	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e })
	}

})

export default router
