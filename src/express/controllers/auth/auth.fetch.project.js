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

import * as mh from '../../lib/modelHelper'

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

	if(['edit', 'rewards', 'addresses', 'payments'].includes(option)) {
		return next() // go to /:projectName/edit
	}

	if (restrictedNames.includes(projectName)) {
		return res.redirect('/404')
	}

	let user = req.session.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	console.log('user', user);
	console.log('user instanceof UserModel', user instanceof UserModel);
	console.log('req.user instanceof UserModel', req.user instanceof UserModel);

	try {
		const project = await ProjectModel.findOneByName(projectName)
			.populate('sponsor')
			.populate({ path: 'posts', options: { sort: {  'abstract.created_at': -1 } } })
			.populate({ path: 'qnas', options: { sort: {  'abstract.created_at': -1 } } })

		if (!project) throw new Error(`no such project in name of ${projectName}`)

		const canEdit = ac.canEdit(user, project)
		const projectToRender = await project.toFormat('project_detail', user, canEdit)

		res.status(200).json({
			user: renderUser.authorizedUser(user, canEdit),
			data: {
				project: projectToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/:projectName/edit/:tab?', async (req, res) => {
	console.log('/projects/:projectName/edit');

	const { projectName } = req.params
	const { user } = req.session
	const project = await ProjectModel.findOneByName(projectName)
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

		let doc = await ProjectModel.findOneByName(req.params.projectName)
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
			error: e.message
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
router.post('/:projectName?', async (req, res) => {
	console.log('POST /auth/fetch/projects');

	try {
		const body = req.body
		const isNew = body.isNew

		const sponsor = await SponsorModel.findOne({sponsorName: body.sponsor.sponsorName})
		body.sponsor = sponsor

		if (isNew) {
			const project = await ProjectModel.create(body)
			res.json({ response: project })
		} else {
			const projectName = req.params.projectName
			const r = await ProjectModel.update(
				{ 'abstract.projectName': projectName },
				body,
				{ upsert: false, }
			)
			res.json({response: r.n === 1})
		}
	} catch (e) {
		console.error(e);
		res.status(400).json({ response: e })
	}
})

router.post('/:projectName/posts', isLoggedIn, async (req, res) => {
	try {
		let user = req.session.user
		let projectName = req.params.projectName

		let {
			title,
			content,
			thresholdMoney = 0,
			isDirectSupport = false,
		} = req.body

		let project = await ProjectModel.findOne({'abstract.projectName': projectName})
		let post = await mh.createPost({project, user, title, content, thresholdMoney, isDirectSupport})

		res.json({ response: await post.toFormat('project_detail', true, 0) })

	} catch (e) {
		console.error(e);
		res.status(400).json({ error: e.message })
	}
})

router.post('/:projectName/qnas', isLoggedIn, async (req, res) => {
	console.log('POST /proj/qnas');
	try {
		let user = req.session.user
		let projectName = req.params.projectName

		let {
			title = 'empty-title',
			text,
		} = req.body

		let project = await ProjectModel.findOne({'abstract.projectName': projectName})
		let qna = await mh.createQnA({title, text, project, user})

		res.json({ response: qna.toFormat('project_detail')})
	} catch (e) {
		console.error(e);
		res.status(400).json({
			error: e.message
		})
	}
})

export default router;
