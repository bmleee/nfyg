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

/**
 * auth level
 * 	- overview: anyone
 * 	- post: according to thresholdMoney
 * 	- qna: anyone
 * fetch product detail info
 * @type {[type]}
 */
router.get('/:productName/:option?', async (req, res, next) => {
	const {
		productName,
		option,
	} = req.params;

	if (restrictedNames.includes(productName)) {
		return res.redirect('/404')
	};

	if(['edit'].includes(option)) {
		return next() // go to /:productName/edit
	}

	try {
		const product = await ProductModel.findOne({"abstract.productName": productName})
			.populate('sponsor posts qnas')

		if (!product) throw new Error(`no such product in name of ${productName}`)

		const productToRender = await product.toFormat('product_detail', req.session.user)

		// console.log('productToRender', JSON.stringify(productToRender, undefined, 4));

		res.status(200).json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true // always true
			},
			data: {
				product: productToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}
})

router.get('/:productName/edit', async (req, res) => {
	console.log('/products/:productName/edit');
	res.json({})
})

export default router;
