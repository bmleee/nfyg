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

router.get('/', async (req, res) => {
	console.log('/exhibitions/', );

	try {
		const sponsors = await SponsorModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				sponsors: await Promise.all(sponsors.map(async (e) => await e.toFormat('sponsors')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e })
	}
})

router.get('/:sponsorName/:option', async (req, res, next) => {
	console.log('/sponsors/' + req.params.sponsorName);
	if (['edit'].includes(req.params.option)) {
		return next()
	}

	try {
		let sponsor = await SponsorModel.findOne({"sponsorName": req.params.sponsorName})
		sponsor = await sponsor.toFormat('exhibition_detail')

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

router.get('/:sponsorName/edit', async (req, res) => {
	console.log('/sponsors/:sponsorName/edit');
	res.json({})
})


router.get('/')

export default router;
