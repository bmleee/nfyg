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
 * fetch product detail info
 * @type {[type]}
 */
router.get('/:productName/:option?/:tab?', async (req, res, next) => {
	const {
		productName,
		option,
	} = req.params;

	if (restrictedNames.includes(productName)) {
		return res.redirect('/404')
	};

	if(['null', 'undefined'].includes(req.params.tab)) {
		return res.status(500).json({ error: 'unknown' })
	}

	if(['edit', 'rewards', 'addresses', 'payments', 'summary', 'purchase'].includes(option)) {
		return next() // go to /:productName/edit
	}

	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		const product = await ProductModel.findOne({"abstract.productName": productName})
			.populate({ path: 'posts', options: { sort: {  'abstract.created_at': -1 } } })
			.populate({ path: 'qnas', options: { sort: {  'abstract.created_at': -1 } } })

		if (!product) throw new Error(`no such product in name of ${productName}`)

		const canEdit = ac.canEdit(user, product)
		const productToRender = await product.toFormat('product_detail', req.user, canEdit)

		res.status(200).json({
			user: renderUser.authorizedUser(req.user),
			data: {
				product: productToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/:productName/edit/:tab?', isLoggedIn, async (req, res) => {

	try {
		const { productName } = req.params
		const { user } = req
		const product = await ProductModel.findOneByName(productName)
		console.log('/product/:productName/edit.product', product);

		if (!ac.canEdit(user, product)) throw Error(`can't edit unauthorized product`)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				product: await product.toFormat('edit')
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

router.get('/:productName/rewards', async (req, res) => {
	try {
		let user = renderUser.authorizedUser(req.user)

		let doc = await ProductModel.findOneByName(req.params.productName)
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

router.get('/:productName/summary', isLoggedIn, async (req, res) => {
	try {
		let [
			user,
			product
		] = await Promise.all([
			UserModel.findById(req.user._id),
			ProductModel.findOne({ 'abstract.productName': req.params.productName })
				.populate('authorizedUsers qnas')
		])

		if (!ac.canEdit(user, product)) throw Error(`can't access`)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				product_summary: await product.toFormat('summary')
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e })
	}
})

router.get('/:productName/purchase', isLoggedIn, async (req, res) => {
	try {
		let product = await ProductModel.findOneByName(req.params.productName)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				abstract: product.abstract
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({error: e.message})
	}
})

router.post('/:productName/purchase', isLoggedIn, async (req, res) => {
	let user = req.user
	let productName = req.params.productName
	let {
		addressIndex,
		rewardIndex,
		paymentIndex,
		purchaseAmount,
		shippingFee,
	}  = req.body

	try {
		let product = await ProductModel.findOne({'abstract.productName': productName})
		let address = (await AddressModel.findByUser(user))[addressIndex]
		let payment = (await PaymentModel.findByUser(user))[paymentIndex]
		let reward = product.funding.rewards[rewardIndex]

		let purchase = await PurchaseModel.create({
			user,
			user_info: user,
			product,
			address: address.toJSON(),
			payment: payment.toJSON(),
			reward,
			purchaseAmount,
			shippingFee
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

router.post('/', isLoggedIn,  async (req, res) => {
	console.log('POST /auth/fetch/products');

	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user) && !ac.isArtist(user) ) throw Error(`unauthorized`)

		const body = req.body

		const product = await ProductModel.create(body)
		res.json({ response: true })
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:productName', isLoggedIn,  async (req, res) => {
	console.log('POST /auth/fetch/products');

	try {
		let user = req.user

		if (!ac.isAdmin(user) && !ac.isEditor(user) && !ac.isArtist(user) ) throw Error(`unauthorized`)

		const body = req.body

		const productName = req.params.productName
		const product = await ProductModel.findOneByName(productName)
		if (!ac.canEdit(req.user, product)) throw Error(`can't edit unauthorized product`)

		const r = await ProductModel.update(
			{ 'abstract.productName': productName },
			body,
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.post('/:productName/qnas', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let productName = req.params.productName

		let {
			title = 'empty-title',
			text,
		} = req.body

		let product = await ProductModel.findOne({'abstract.productName': productName})
		let qna = await mh.createQnA({title, text, product, user})

		res.json({ response: qna.toFormat('project_detail')})
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: e.message
		})
	}
})


router.post('/:productName/processPurchase', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let product = await ProductModel.findOneByName(req.params.productName)

		if (!ac.canEdit(user, product)) throw Error(`can't process unauthorized process`)

		let purchases = await PurchaseModel.findByProduct(product)
			.where('purchase_info.purchase_state').equals('preparing')
			.populate('user product')

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

router.get('/*', (req, res) => {
	res.json({
		user: renderUser.authorizedUser(req.user),
	})
})


export default router;
