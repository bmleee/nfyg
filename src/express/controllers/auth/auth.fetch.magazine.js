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

const router = express.Router();

// TODO: add res.json to user auth info
// TODO: magazine paginaiton
// TODO: magazine category select
router.get('/magazines', async (req, res) => {
	console.log('/magazines/', );

	try {
		const magazines = await MagazineModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				magazines: await Promise.all(magazines.map(async (m) => await m.toFormat('magazines')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e })
	}


})

router.get('/magazines/:magazineName/:option?', async (req, res, next) => {
	console.log('/magazines/' + req.params.magazineName);
	if(['edit'].includes(req.params.option)) {
		return next()
	}

	try {
		const magazine = await MagazineModel.findOne({"abstract.magazineName": req.params.magazineName})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: await magazine.toFormat('magazine_detail')
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

router.get('/magazines/:magazineName/edit', async (req, res) => {
	console.log('/magazines/:magazineName/edit');
	res.json({})
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
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				exhibitions: await Promise.all(exhibitions.map(async (e) => await e.toFormat('exhibitions')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e })
	}


})

export default router;
