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

import * as ac from '../../lib/auth-check'
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

	if(['edit', 'purchase'].includes(option)) {
		return next() // go to /:productName/edit
	}

	try {
		const product = await ProductModel.findOne({"abstract.productName": productName})
			.populate('posts qnas')

		if (!product) throw new Error(`no such product in name of ${productName}`)

		const productToRender = await product.toFormat('product_detail', req.session.user)

		// console.log('productToRender', JSON.stringify(productToRender, undefined, 4));

		res.status(200).json({
			user: renderUser.authorizedUser(req.session.user),
			data: {
				product: productToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}
})

router.get('/:productName/edit/:tab?', async (req, res) => {
	console.log('/products/:productName/edit');


	try {
		const { productName } = req.params
		const { user } = req.session
		const product = await ProductModel.findByName(productName)
		console.log('/product/:productName/edit.product', product);

		// TODO: activate this
		// if (!ac.canEdit(user, project)) {
		// 	return res.status(401).json(renderHelper.unauthorizedUser(user))
		// }

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				product: await product.toFormat('edit')
			}
		})
	} catch (e) {
		console.error(e);
		res.status(400).json({
			user: renderUser.authorizedUser(user),
			error: e
		})
	}
})

router.get('/:productName/purchase/:param', async (req, res) => {
	let user = renderUser.authorizedUser(user)

	switch (req.params.param) {
		case 'rewards':
			let doc = await ProductModel.findByName(req.params.productName)
				.select({ 'funding.rewards': 1})
				.exec()
			return res.json({
				user,
				data: {
					rewards: doc.funding.rewards
				}
			})
		case 'addresses':
			return res.redirect('/api/users/address')
		case 'payments' :
			return res.json({
				user,
				data: {
					payments: [{message: 'payment model is not extablished'}]
				}
			})
		default:
			return res.status(400).json({
				user,
				error: `invalid param ${req.params.param}`
			})
	}
})


// create or update product
// TODO: check user authority
router.post('/', async (req, res) => {
	console.log('POST /auth/fetch/products');

	try {
		const body = req.body
		const productName = body.abstract.productName || ''

		// upsert Project
		const r = await ProductModel.update(
			{ 'abstract.productName': productName },
			body,
			{ upsert: true, select: { 'abstract.productName': -1} }
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
