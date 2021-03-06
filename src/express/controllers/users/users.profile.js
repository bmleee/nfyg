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

import { pick } from 'lodash'

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
	console.log('/users/profile/');
	try {
		if (!req.user) {
			console.log('req,user is not defined');
			console.log(req.user);
			return res.json({ user: renderUser.authorizedUser(req.user) }) // let use show only other profile
		}

		let user = await UserModel.findById(req.user._id)

		console.log('fetched user', user);

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				profile: await user.toFormat('profile'),
			}
		})
	} catch (error) {
		console.error(error);
		res.status(500).json({ error })
	}
})

router.get('/userlist', async (req, res) => { // return user-type, appropreate data (proj, prod, user, ...)
	console.log('/users/profile/userlist');
	try {
		if (!req.user) {
			console.log('req,user is not defined');
			console.log(req.user);
			return res.json({ user: renderUser.authorizedUser(req.user) }) // let use show only other profile
		}

		let user = await UserModel.findById(req.user._id)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				profile: await user.toFormat('userlist'),
			}
		})
	} catch (error) {
		console.error(error);
		res.status(500).json({ error })
	}
})

router.get('/likelist', async (req, res) => { // return user-type, appropreate data (proj, prod, user, ...)
	console.log('/users/profile/likelist');
	try {
		if (!req.user) {
			console.log('req,user is not defined');
			console.log(req.user);
			return res.json({ user: renderUser.authorizedUser(req.user) }) // let use show only other profile
		}

		let user = await UserModel.findById(req.user._id)

		console.log('fetched user', user);

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				profile: await user.toFormat('likelist'),
			}
		})
	} catch (error) {
		console.error(error);
		res.status(500).json({ error })
	}
})

router.get('/contactqna', async (req, res) => { // return user-type, appropreate data (proj, prod, user, ...)
	console.log('/users/profile/');
	try {
		if (!req.user) {
			console.log('req,user is not defined');
			return res.json({ user: renderUser.authorizedUser(req.user) }) // let use show only other profile
		}

		let user = await UserModel.findById(req.user._id)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				qnas: await user.toFormat('qnas'),
				likes: await user.toFormat('likelist'),
			}
		})
	} catch (error) {
		console.error('프로필 QNA 페쳐 에러', error);
		res.status(500).json({ error })
	}
})

router.get('/summary', isLoggedIn, async (req, res) => {
	try {
		let user = await UserModel.findById(req.user._id)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				summary: await user.toFormat('summary')
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e })
	}
})

router.get('/info', isLoggedIn, async (req, res) => {
	let user = req.user

	res.json({
		user: renderUser.authorizedUser(user),
		data: {
			profile: pick(user.toJSON(), ['fb_id', 'local_email', 'display_name', 'name', 'image', 'intro', 'contact', 'sub_email'])
		}
	})
})

router.put('/info', isLoggedIn, async (req, res) => {
	try {
		const r = await UserModel.update(
			{ _id: req.user._id },
			req.body
		)

		res.json({ response: r.n === 1 })
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e.message })
	}
})

router.get('/:user_id', async (req, res) => {
	try {
		console.log('req.params.user_id', req.params.user_id)
		let user = await UserModel.findOne({ id: req.params.user_id })
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: 'other',
				profile: await user.toFormat("profile", true)
			}
		})
	} catch (error) {
		console.error(error);
		res.json({ error })
	}
})


export default router
