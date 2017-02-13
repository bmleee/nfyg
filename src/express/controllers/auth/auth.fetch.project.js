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

import Mailer from '../../lib/Mailer'
import FacebookTracker from '../../../lib/FacebookTracker'
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

	if (restrictedNames.includes(projectName)) {
		return res.redirect('/404')
	};

	if(['null', 'undefined'].includes(req.params.tab)) {
		return res.status(500).json({ error: 'unknown' })
	}

	if(['edit', 'rewards', 'addresses', 'payments', 'summary', 'purchase',].includes(option)) {
		return next() // go to /:projectName/edit
	}

	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

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

// TODO: check user authority
router.get('/:projectName/edit/:tab?', isLoggedIn, async (req, res) => {
	try {
		const { projectName } = req.params
		const { user } = req
		const project = await ProjectModel.findOneByName(projectName)
			.populate('sponsor')
		console.log('/projects/:projectName/edit.project', project);

		if (!ac.canEdit(user, project)) throw Error(`can't edit unauthorized project`)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				project: await project.toFormat('edit')
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

router.get('/:projectName/rewards', async (req, res) => {
	try {
		let user = renderUser.authorizedUser(req.user)

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
		res.status(500).json({
			user,
			error: e.message
		})
	}
})

router.get('/:projectName/summary', isLoggedIn, async (req, res) => {
	try {
		let [
			user,
			project
		] = await Promise.all([
			UserModel.findById(req.user._id),
			ProjectModel.findOne({ 'abstract.projectName': req.params.projectName })
				.populate('authorizedUsers sponsor posts qnas')
		])

		if (!ac.canEdit(user, project)) throw Error(`can't access`)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				project_summary: await project.toFormat('summary')
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e })
	}
})

router.get('/:projectName/purchase', isLoggedIn, async (req, res) => {
	try {
		let project = await ProjectModel.findOneByName(req.params.projectName)
		if (!project) throw Error(`Unknown project to purchase`)
		console.log('res', {
			user: renderUser.authorizedUser(req.user),
			data: {
				abstract: project.abstract
			}
		});
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				abstract: project.abstract
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({error: e.message})
	}
})

router.post('/:projectName/purchase', isLoggedIn, async (req, res) => {
	let user = req.user
	let projectName = req.params.projectName

	console.log('body', req.body);
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

		let purchase = await PurchaseModel.create({
			user,
			user_info: user,
			project,
			address: address.toJSON(),
			payment: payment.toJSON(),
			reward,
			purchaseAmount,
			shippingFee
		})

		res.json({
			response: !!purchase
		})

	} catch (error) {
		console.error(error);
		res.state(400).json({
			error
		})
	}
})

router.post('/', async (req, res) => {
	console.log('POST /auth/fetch/projects');

	console.log('body', req.body.funding.rewards);

	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user) && !ac.isArtist(user) ) throw Error(`unauthorized`)

		const body = req.body
		const isNew = body.isNew

		const sponsor = await SponsorModel.findOne({sponsorName: body.sponsor.sponsorName})
		body.sponsor = sponsor

		const project = await ProjectModel.create(body)
		res.json({ response: true })

	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:projectName', async (req, res) => {
	console.log('POST /auth/fetch/projects');

	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user) && !ac.isArtist(user) ) throw Error(`unauthorized`)

		const body = req.body
		const isNew = body.isNew

		const sponsor = await SponsorModel.findOne({sponsorName: body.sponsor.sponsorName})
		body.sponsor = sponsor

		const projectName = req.params.projectName
		const project = await ProjectModel.findOneByName(projectName)
		if (!ac.canEdit(req.user, project)) throw Error(`can't edit unauthorized product`)

		const r = await ProjectModel.update(
			{ 'abstract.projectName': projectName },
			body,
			{ upsert: false, }
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.post('/:projectName/posts', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let projectName = req.params.projectName

		let {
			title,
			content,
			thresholdMoney = 0,
			isDirectSupport = false,
		} = req.body

		let project = await ProjectModel.findOne({'abstract.projectName': projectName})
		let post = await mh.createPost({project, user, title, content, thresholdMoney, isDirectSupport})
		
		try {
			let { post_messages } = await FacebookTracker.getProjectSummary(project.abstract.projectName)
			let user_ids1 = post_messages.map(p => p.user_app_scope_id)
			let users1 = await UserModel.findByAppIds(Array.from(new Set(user_ids1)))
			
			// console.log('user1', users1)
			
			let purchases = await PurchaseModel.findByProject(project).populate('user')
			let users2 = purchases.map(p => p.user)
			
			
			// console.log('user2', users2)
			// console.log('purchases', purchases)
			
			let users = users1.concat(users2)
			let mails = users.map(u => u.local_email)
			mails = Array.from(new Set(mails))
			
			await Mailer.sendPostMail(req.params.projectName, mails)
		} catch (e) {
			console.error('Error while sending email')
			console.error(e)
		}
		

		res.json({ response: await post.toFormat('project_detail', true, 0) })

	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e.message })
	}
})

router.post('/:projectName/qnas', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
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
		res.status(500).json({
			error: e.message
		})
	}
})

router.post('/:projectName/processPurchase', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let project = await ProjectModel.findOneByName(req.params.projectName)

		if (!ac.canEdit(user, project)) throw Error(`can't process unauthorized process`)

		let purchases = await PurchaseModel.findByProject(project)
			.where('purchase_info.purchase_state').equals('preparing')
			.populate('user project')

		let r = await Promise.all(purchases.map(
			async (p) => {
				try {
					return await p.processPurchase()
				} catch (e) {
					console.error(e);
					return { error: e.message }
				}
			}
		))

		console.log(r);
		res.json({ response: r })
	} catch (e) {
		console.error(e);
		res.status(500).json({error: e.message})
	}
})

router.post('/:projectName/share', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let link = req.body.url || req.body.link
		let project = await ProjectModel.findOneByName(req.params.projectName)

		if (!project) throw Error(`Unknown project name ${req.params.projectName}`)

		const r = await FacebookTracker.userSharedProject(user, req.params.projectName, link)

		console.log('FacebookTracker.userSharedProject.r', r);
		res.json({ response: r })
	} catch (e) {
		console.error(e);
		res.status(500).json({error: e.message})
	}
})

router.get('/*', (req, res) => {
	res.json({
		user: renderUser.authorizedUser(req.user),
	})
})

export default router;
