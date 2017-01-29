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

import UserModel from '../../models/user'
import ProjectModel, {restrictedNames} from '../../models/project'
import ProductModel from '../../models/product'
import ExhibitionModel from '../../models/exhibition'
import MagazineModel from '../../models/magazine'
import SponsorModel from '../../models/sponsor'

import * as ac from '../../lib/auth-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.get('/', async (req, res) => {
	console.log('api/auth/fetch/sponsors/', );

	try {
		const sponsors = await SponsorModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: {
				isLoggedIn: !!req.user,
				isAuthorized: true,
			},
			data: {
				sponsors: await Promise.all(sponsors.map(async (e) => await e.toFormat('sponsors')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e.message })
	}
})

router.get('/:sponsorName/:tab?', async (req, res) => {
	console.log('api/auth/fetch/sponsors/:sponsorName');
	// if (['edit'].includes(req.params.tab)) {
	// 	return next()
	// }

	try {
		const sponsor = await SponsorModel.findByName(req.params.sponsorName)
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				sponsor: sponsor.toJSON()
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e.message })
	}
})

// create or update project
// TODO: check authority
router.post('/', async (req, res) => {
	console.log('POST /auth/fetch/sponsors');

	try {
		const body = req.body
		const sponsorName = body.sponsorName || ''

		// upsert Project
		const r = await SponsorModel.update(
			{ 'sponsorName': sponsorName },
			body,
			{ upsert: true }
		)

		console.log('upsert result', r);

		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({
			response: e
		})
	}
})


export default router;
