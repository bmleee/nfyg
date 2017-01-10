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
import PostModel from '../../models/post'
import QnAModel from '../../models/qna'
import SponsorModel from '../../models/sponsor'
import AddressModel from '../../models/address'
import PurchaseModel from '../../models/purchase'
import PaymentModel from '../../models/payment'

import * as ac from '../../lib/auth-check'
import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

/**
 * auth level
 * 	- overview: anyone
 * 	- post: according to thresholdMoney
 * 	- qna: anyone
 * fetch project detail info
 * @type {[type]}
 */
router.get('/:projectName/:option?/:tab?', async (req, res, next) => {
	const {
		projectName,
		option,
	} = req.params;

	if (restrictedNames.includes(projectName)) {
		return res.redirect('/404')
	};

	if(['edit', 'rewards', 'addresses', 'payments'].includes(option)) {
		return next() // go to /:projectName/edit
	}

	try {
		const project = await ProjectModel.findByName(projectName)
			.populate('sponsor posts qnas')

		if (!project) throw new Error(`no such project in name of ${projectName}`)

		const projectToRender = await project.toFormat('project_detail', req.session.user)

		// console.log('projectToRender', JSON.stringify(projectToRender, undefined, 4));

		res.status(200).json({
			user: renderUser.authorizedUser(req.session.user),
			data: {
				project: projectToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}
})

router.get('/:projectName/edit/:tab?', async (req, res) => {
	console.log('/projects/:projectName/edit');

	const { projectName } = req.params
	const { user } = req.session
	const project = await ProjectModel.findByName(projectName)
		.populate('sponsor')
	console.log('/projects/:projectName/edit.project', project);

	// TODO: activate this
	// if (!ac.canEdit(user, project)) {
	// 	return res.status(401).json(renderHelper.unauthorizedUser(user))
	// }

	res.json({
		user: renderUser.authorizedUser(user),
		data: {
			project: await project.toFormat('edit')
		}
	})
})

router.get('/:projectName/rewards', async (req, res) => {
	try {
		let user = renderUser.authorizedUser(req.session.user)

		let doc = await ProjectModel.findByName(req.params.projectName)
			.select({ 'funding.rewards': 1, 'funding.shippingFee': 1})
			.exec()

		return res.json({
			user,
			data: {
				rewards: doc.funding.rewards,
				shippingFee: doc.funding.shippingFee,
			}
		})
	} catch (e) {
		console.error(e);
		res.status(400).json({
			user,
			error: e
		})
	}
})

router.post('/:projectName/purchase', isLoggedIn, async (req, res) => {
	let user = req.session.user
	let projectName = req.params.projectName
	let {
		addressIndex,
		rewardIndex,
		paymentIndex,
		purchaseAmount,
		shippingFee,
	}  = req.body

	try {
		let project = await ProjectModel.findOne({'abstract.projectName': projectName})
		let address = (await AddressModel.findByUser(user))[addressIndex]
		let payment = (await PaymentModel.findByUser(user))[paymentIndex]
		let reward = project.funding.rewards[rewardIndex]

		console.log('project', project);
		console.log('address', address);
		console.log('payment', payment);
		console.log('reward', reward);

		let purchase = await PurchaseModel.create({
			user,
			user_info: user,
			project,
			address: address.toJSON(),
			payment: payment.toJSON(),
			reward
		})

		res.json({
			response: purchase
		})

	} catch (error) {
		console.error(error);
		res.state(400).json({
			error
		})
	}
})

// create or update project
// TODO: check authority
router.post('/', async (req, res) => {
	console.log('POST /auth/fetch/projects');

	try {
		const body = req.body
		const projectName = body.abstract.projectName || ''

		const sponsor = await SponsorModel.findOne({sponsorName: body.sponsor.sponsorName})
		body.sponsor = sponsor

		// upsert Project
		const r = await ProjectModel.update(
			{ 'abstract.projectName': projectName },
			body,
			{ upsert: true, }
		)

		console.log('upsert result', r);

		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(400).json({
			response: e
		})
	}
})

export default router;
