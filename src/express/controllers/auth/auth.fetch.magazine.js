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

import * as mh from '../../lib/modelHelper'

import * as ac from '../../lib/auth-check'
import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'


const router = express.Router();

// TODO: magazine paginaiton
// TODO: magazine category select
router.get('/', async (req, res) => {
	console.log('/magazines/', );

	try {
		const magazines = await MagazineModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				magazines: await Promise.all(magazines.map(async (m) => await m.toFormat('magazines')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e.message })
	}


})

router.get('/:magazineName/:option?', async (req, res, next) => {
	console.log('/magazines/' + req.params.magazineName);
	if(['edit'].includes(req.params.option)) {
		return next()
	}

	try {
		const magazine = await MagazineModel.findOne({"abstract.magazineName": req.params.magazineName})

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: await magazine.toFormat('magazine_detail')
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}

})

router.get('/:magazineName/edit/:tab?', isLoggedIn, async (req, res) => {
	try {
		const { magazineName } = req.params
		const { user } = req
		const magazine = await MagazineModel.findOneByName(magazineName)

		if (!ac.canEdit(user, magazine)) throw Error(`can't edit unauthorized magazine`)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				magazine: await magazine.toFormat('edit')
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({
			user: renderUser.authorizedUser(user),
			error: e.message
		})
	}
})

router.post('/', async (req, res) => {
	console.log('POST /auth/fetch/magazines');

	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user) && !ac.isArtist(user) ) throw Error(`unauthorized`)

		const body = req.body

		const magazine = await MagazineModel.create(body)
		res.json({ response: true })

	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:magazineName', async (req, res) => {
	console.log('POST /auth/fetch/magazines');

	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user) && !ac.isArtist(user) ) throw Error(`unauthorized`)

		const body = req.body

		const magazineName = req.params.magazineName

		const r = await MagazineModel.update(
			{ 'abstract.magazineName': magazineName },
			body,
		)

		console.log(r);

		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

// TODO: add res.json to user auth info
// TODO: exhibition paginaiton
// TODO: magazine genre select
router.get('/exhibitions', async (req, res) => {
	console.log('/exhibitions/', );

	try {
		const exhibitions = await ExhibitionModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: {
				isLoggedIn: !!req.user,
				isAuthorized: true,
			},
			data: {
				exhibitions: await Promise.all(exhibitions.map(async (e) => await e.toFormat('exhibitions')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e.message })
	}


})

export default router;
