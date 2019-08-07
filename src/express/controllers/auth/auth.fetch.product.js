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
import LikeModel from '../../models/like'

import Mailer from '../../lib/Mailer'

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
		const productToRender = await product.toFormat('product_detail', user, canEdit)

		res.status(200).json({
			user: renderUser.authorizedUser(req.user),
			data: {
				product: productToRender,
				product_summary: await product.toFormat('product_detail')
			}
		})
	} catch (e) {
		// console.error(e);
		res.json({error: e.message})
	}
})

router.get('/:productName/edit/:tab?', isLoggedIn, async (req, res) => {

	try {
		const { productName } = req.params
		const { user } = req
		const product = await ProductModel.findOneByName(productName)

		if (!ac.canEdit(user, product)) throw Error(`접근 권한이 없습니다.`)
		//if (!ac.isAdmin(user)) throw Error(`unauthorized`)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				product: await product.toFormat('edit'),
				userType: user.getUserType()
			}
		})
	} catch (e) {
		// console.error(e);
		res.status(500).json({
			user: renderUser.authorizedUser(req.user),
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
		// console.error(e);
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
				.populate('authorizedUsers posts qnas')
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
		// console.error(e);
		res.status(500).json({ error: e })
	}
})

router.get('/:productName/purchase', isLoggedIn, async (req, res) => {
	try {
		let product = await ProductModel.findOneByName(req.params.productName)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				abstract: product.abstract,
				funding: product.funding
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
		comment,
		shippingFee,
		shippingDay,
		reward,
		result_price,
		result_description,
	}  = req.body

	try {
		let product = await ProductModel.findOne({'abstract.productName': productName})
		let address = (await AddressModel.findByUser(user))[addressIndex]
		let payment = (await PaymentModel.findByUser(user))[paymentIndex]
		
		let now = new Date();
	    let now_hours = now.getHours()+9;
	    let now_date = now_hours > 24 ? (now.getDate() + 1) : now.getDate();

		let purchase = await PurchaseModel.create({
			user,
			user_info: user,
			product,
			address: address.toJSON(),
			payment: payment.toJSON(),
			reward,
			new_reward: reward,
			purchaseAmount,
			comment,
			shippingFee,
			shippingDay,
			result_price,
			result_description,
			created_at: (now.getMonth()+1) + "월 " + now_date + "일 - " + now_hours + "시:" + now.getMinutes() + "분"
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

router.get('/:productName/like', async (req, res) => {
	let productName = req.params.productName
	
	try {
		let product_sub = await ProductModel.findOne({'abstract.productName': productName})
		let product = await LikeModel.find({ product: product_sub })
		
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				product
			}
		})
	} catch (e) {
		res.status(500).json({error: e.message})
	}	
})

router.post('/:productName/like', isLoggedIn, async (req, res) => {
	let user = req.user
	let productName = req.params.productName
	let {
		like_state
	}  = req.body
	
	try {
		let product = await ProductModel.findOne({'abstract.productName': productName})
		let like = await LikeModel.create({
			user,
			user_info: user,
			product,
			like_state
		})
		res.json({
			response: like
		})
	}
	catch (error) {
		res.state(400).json({
			error
		})
	}
})

router.delete('/:productName/like/:id', isLoggedIn, async (req, res) => {
	try {
	let user = req.user
	let like = await LikeModel.findById(req.params.id)

	if(!ac.canEdit(user, like)) throw new Error(`User ${user.id} can't remove address ${like._id}`)

	let r = await like.remove()

	res.json({ response: !!r })

	} catch (e) {
		console.error('like deleto error!!', e);
		res.status(500).json({ error: e })
	}
})

router.post('/', isLoggedIn,  async (req, res) => {
	// console.log('POST /auth/fetch/products');
	try {
		let user = req.user
		const body = req.body

		const product = await ProductModel.create(body)
		res.json({ response: true })
	} catch (e) {
		// console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:productName', isLoggedIn,  async (req, res) => {
	// console.log('POST /auth/fetch/products');
	try {
		let user = req.user
		const productName = req.params.productName
		const product = await ProductModel.findOneByName(productName)
		if (!ac.canEdit(req.user, product)) throw Error(`can't edit unauthorized product`)
		
		const body = req.body

		const r = await ProductModel.update(
			{ 'abstract.productName': productName },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:productName/purchase/validcount', isLoggedIn,  async (req, res) => {
	console.log('POST /auth/fetch/products');
	try {

		const body = req.body
		const productName = req.params.productName
		const product = await ProductModel.findOneByName(productName)

		const r = await ProductModel.update(
			{ 'abstract.productName': productName },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.post('/:productName/posts', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let productName = req.params.productName
		let shortTitle = req.params.shortTitle

		let {
			title,
			content,
			thresholdMoney = 0,
			isDirectSupport = false,
		} = req.body

		let product = await ProductModel.findOne({'abstract.productName': productName})
		let post = await mh.createPost({product, user, title, content, thresholdMoney, isDirectSupport})
		
		try {
			let purchases = await PurchaseModel.findByProduct(product).populate('user').where('purchase_info.purchase_state').in(['preparing', 'scheduled'])
			
			let post_target_email = purchases.map(p => p.address.real_email || p.user_info.local_email)
			post_target_email = Array.from(new Set(post_target_email))
			
			await Mailer.sendPostMail('products', req.params.productName, product.abstract.shortTitle, title, post_target_email)
		} catch (e) {
			console.error('Error while sending email')
			console.error(e)
		}
		res.json({ response: await post.toFormat('product_detail', true, 0) })
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e.message })
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
		
		try {
			// console.log('QNAS---product', product)
			
			await Mailer.sendQnAMail(product.abstract.shortTitle, text, product.creator.creatorEmail)
			
		} catch (e) {
			console.error('Error while sending email')
			console.error(e)
		}

		res.json({ response: qna.toFormat('product_detail')})
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: e.message
		})
	}
})

router.post('/:productName/directqnas', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let productName = req.params.productName
		let product = await ProductModel.findOne({'abstract.productName': productName})
		let {
			title,
			text
		} = req.body
    
	    let body = {
	      author: {
	        name: user.display_name,
	        iconSrc: user.image,
	        user: user._id
	      },
	      abstract: {
	        title : product.abstract.shortTitle + ' 문의(' + title + ')',
	        likes: [],
	        created_at: Date.now()
	      },
	      text,
	      comments: [],
	      user,
	      user_info: user,
	      product_admin : product.authorizedUser
	    }
	    
	    
		let qna = await QnAModel.create(body)
		// await Mailer.sendQnAMail(product.abstract.shortTitle, text, product.creator.creatorName)
		res.json({ })
		
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
		
		let r;
		for(var i = 0; i < purchases.length; i++) { //purchases.length  
		  r = await purchases[i].processPurchase()
		}
		
		/*
		let r = await Promise.resolve(purchases.map(
			async (p) => {
				try {
					return await p.processPurchase()
				} catch (e) {
					console.error(e);
					return { error: e.message }
				}
			}
		)) */
		
		res.json({ response: r })
		
	} catch (e) {
		console.error(e);
		res.status(500).json({error: e.message})
	}
})

router.post('/:productName/processPurchasefailed', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let product = await ProductModel.findOneByName(req.params.productName)

		if (!ac.canEdit(user, product)) throw Error(`can't process unauthorized process`)

		let purchases = await PurchaseModel.findByProduct(product)
			.where('purchase_info.purchase_state').equals('failed')
			.populate('user product')
		
		let r;
		for(var i = 0; i < purchases.length; i++) {
		  r = await purchases[i].processPurchase()
		}
		
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
