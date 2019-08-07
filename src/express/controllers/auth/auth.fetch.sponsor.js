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
	console.log('api/auth/fetch/sponsors/' );

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

router.get('/:sponsorName/:tab?', async (req, res, next) => {
	console.log('api/auth/fetch/sponsors/:sponsorName');
	if (['edit'].includes(req.params.tab)) {
		return next()
	}

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

router.get('/:sponsorName/edit', async (req, res) => {
	let user = req.user

	try {
		if (!ac.isAdmin(user) && !ac.isEditor(user)) throw Error(`unauthorized`)

		const sponsor = await SponsorModel.findByName(req.params.sponsorName)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				sponsor: sponsor.toJSON()
			}
		})

	} catch (e) {

	}
})

router.post('/', async (req, res) => {
	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user)) throw Error(`unauthorized`)

		const body = req.body

		const sponsor = await SponsorModel.create(body)
		res.json({ response: true })

	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:sponsorName', async (req, res) => {
	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user)) throw Error(`unauthorized`)

		const body = req.body

		const sponsorName = req.params.sponsorName
		const sponsor = await SponsorModel.findByName(sponsorName)

		if (sponsor.sponsorName !== body.sponsorName) throw Error(`Sponsor.sponsorName can't be changed!`)

		const r = await SponsorModel.update(
			{ 'sponsorName': sponsorName },
			body,
			{ upsert: false, }
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})



export default router;
