// Load the module dependencies
import express from 'express'

import _ from 'lodash'

import UserModel from '../../models/user'
import AddressModel from '../../models/address'

import isLoggedIn from '../../lib/login-check'
import  * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
	console.log('users.address : /users/address');
	try {
		let addresses = await AddressModel.findByUser(req.session.user)
		return res.json({
			user: renderUser.authorizedUser(req.session.user),
			data: {
				addresses: await Promise.all(addresses.map(x => x.toJSON()))
			}
		})
	} catch (e) {
		return res.status(400).json({
			user: renderUser.authorizedUser(req.session.user),
			error: e.message
		})
	}
})

router.post('/', isLoggedIn, async (req, res) => {
	const {
		user
	} = req.session
	const body = _.pick(req.body, ['addressee_name', 'zipcode', 'address1', 'address2'])

	try {
		body.user = user
		let address = await AddressModel.create(body)

		console.log(`[User ${user.id}] add new address ${address._id}`);
		res.json({
			response: { address }
		})
	} catch (e) {
		console.error(e);
		res.status(400).json({
			error: e.message
		})
	}
})

export default router
