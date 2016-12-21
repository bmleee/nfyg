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

// import cache from '../lib/cache'

import UserModel from '../models/user'
import ProjectModel, {restrictedNames} from '../models/project'
import ProductModel from '../models/product'
import ExhibitionModel from '../models/exhibition'
import MagazineModel from '../models/magazine'
import SponsorModel from '../models/sponsor'

const router = express.Router();

// TODO: add res.json to user auth info
// TODO: exhibition paginaiton
// TODO: magazine genre select
router.get('/', async (req, res) => {
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

router.get('/:exhibitionName/:option', async (req, res, next) => {
	console.log('/exhibitions/' + req.params.exhibitionName);
	if (['edit'].includes(req.params.option)) {
		return next()
	}

	try {
		let exhibition = await ExhibitionModel.findOne({"abstract.exhibitionName": req.params.exhibitionName})
			.populate('qnas')
		exhibition = await exhibition.toFormat('exhibition_detail')

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				exhibition
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

router.get('/:exhibitionName/edit', async (req, res) => {
	console.log('/exhibitions/:exhibitionName/edit');
	res.json({})
})


router.get('/*', async (req, res) => {
	console.log('auth.fetch.url /*', req.url)
	res.json({})
})

export default router;
