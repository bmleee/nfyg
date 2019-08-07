// Load the module dependencies
import express from 'express'

import _ from 'lodash'

import UserModel from '../../models/user'
import AddressModel from '../../models/address'

import isLoggedIn from '../../lib/login-check'
import * as renderUser from '../../lib/renderUser'
import * as ac from '../../lib/auth-check'

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
	console.log('users.address : /users/address');
	try {
		let addresses = await AddressModel.findByUser(req.user)
		return res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				addresses: await Promise.all(addresses.map(x => x.toJSON()))
			}
		})
	} catch (e) {
		return res.status(500).json({
			user: renderUser.authorizedUser(req.user),
			error: e.message
		})
	}
})

router.post('/', isLoggedIn, async (req, res) => {
	const {
		user
	} = req
	const body = _.pick(req.body, ['addressee_name', 'addressee_number', 'real_email', 'zipcode', 'address1', 'address2'])

	try {
		body.user = user
		let address = await AddressModel.create(body)

		console.log(`[User ${user.id}] add new address ${address._id}`);
		res.json({
			response: { address }
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
		let address = await AddressModel.findById(req.params.id)

		if(!ac.canEdit(user, address)) throw new Error(`User ${user.id} can't remove address ${address._id}`)

		let r = await address.remove()

		res.json({ response: !!r })

	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e })
	}

})

export default router
