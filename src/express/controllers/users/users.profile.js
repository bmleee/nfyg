/**
 * should res.json
 * {
		 user: {
			 isLoggedIn: false,
			 isAuthorized: true, // can see this page?
		 },
		 data: {...}
   }
 */
import express from 'express';

// import cache from '../../lib/cache'

import UserModel from '../../models/user'
import ProjectModel, {restrictedNames} from '../../models/project'
import ProductModel from '../../models/product'
import ExhibitionModel from '../../models/exhibition'
import MagazineModel from '../../models/magazine'
import SponsorModel from '../../models/sponsor'

import * as ac from '../../lib/auth-check'
import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

import { isNumber } from '~/src/lib/utils'

const router = express.Router()

// should return {
//   user,
//   data:{
//   	userType,
//   	profile
//   }
// }
router.get('/', async (req, res) => { // return user-type, appropreate data (proj, prod, user, ...)

	let user = req.session.user

	try {
		if (!user) {
			return res.json({ user: renderUser.authorizedUser(user) }) // let use show only other profile
		}

		user = await UserModel.findById(user._id)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				userType: user.getUserType(),
				profile: await user.toFormat('profile'),
			}
		})
	} catch (error) {
		console.error(error);
		res.status(400).json({ error })
	}
})

router.get(':user_id', async (req, res) => {
	try {
		let user = await UserModel.findOne({ id: req.params.user_id })
		res.json({
			user: renderUser.authorizedUser(req.session.user),
			data: {
				profile: await user.toFormat("other_profile")
			}
		})
	} catch (error) {
		console.error(error);
		res.json({ error })
	}
})

export default router
