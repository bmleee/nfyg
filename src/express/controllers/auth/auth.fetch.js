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

import fetchDataByKey, { KEYS } from '../../lib/fetchDataByKey'

import UserModel from '../../models/user'
import ProjectModel, {restrictedNames} from '../../models/project'
import ProductModel from '../../models/product'
import ExhibitionModel from '../../models/exhibition'
import MagazineModel from '../../models/magazine'
import SponsorModel from '../../models/sponsor'
import StoreModel from '../../models/store'

import ProjectRouter from './auth.fetch.project'
import ProductRouter from './auth.fetch.product'
import ExhibitionRouter from './auth.fetch.exhibition'
import MagazineRouter from './auth.fetch.magazine'
import SponsorRouter from './auth.fetch.sponsor'
import StoreRouter from './auth.fetch.store'

import PostRouter from './auth.fetch.post'
import QnARouter from './auth.fetch.qna'

import PurchaseRouter from './auth.fetch.purchase'

import OptionRouter from './auth.fetch.option'
import EditorRouter from './auth.fetch.editor'

import * as renderUser from '../../lib/renderUser'

import flash from 'connect-flash'

const router = express.Router();

router.use('/', (req, res, next) => {
	console.log('auth.fetch.url', req.url);
	req.session.returnTo = req.url;
	next()
})

router.use('/projects', ProjectRouter);
router.use('/products', ProductRouter);
router.use('/exhibitions', ExhibitionRouter);
router.use('/magazines', MagazineRouter);
router.use('/sponsors', SponsorRouter);
router.use('/options', OptionRouter);
router.use('/store', StoreRouter);
router.use('/', EditorRouter);

router.use('/qnas', QnARouter);
router.use('/posts', PostRouter);
router.use('/purchases', PurchaseRouter);

/**
 * auth level : anyone
 */
router.get('/', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		recommend_products: null,
		//popular_products: null,
		//new_products: null
		new_arrivals: null
	}
	req.session.returnTo = req.url;

	let home = {}

	let recommend_products, new_arrivals; //, popular_products, new_products;

	// TODO: refactor 3 select query from Project Collection
	let fetcher = {
		recommend_products: async () => await ProductModel.find({'recommend': true}, {"abstract.imgSrc":1, "abstract.longTitle":1, "abstract.productName":1, "abstract.postIntro":1, "abstract.category":1, "abstract.sub_category":1, "abstract.special_category":1, "funding.targetMoney":1, "funding.currentMoney_sub2":1, "funding.remainingDays_sub":1, "funding.dateTo":1, "subValidPurchases":1}).sort([['orderNum', 'descending']]),
		// popular_products: async () => await ProductModel.find({'abstract.state': 'in-progress'}, {"abstract":1, "funding":1, "subValidPurchases":1}).find({'funding.remainingDays_sub' : 1}).sort([['funding.currentMoney_sub', 'descending']]).sort([['funding.dateTo', 'descending']]).limit(6),
		// new_products: async () => await ProductModel.find({'abstract.state': 'in-progress'}, {"abstract":1, "funding":1, "subValidPurchases":1}).find({'funding.remainingDays_sub' : 1}).sort([['funding.dateFrom', 'descending']]).limit(6),
		new_arrivals: async () => await StoreModel.find({'abstract.state': 'in-progress'}, {"abstract.title":1, "abstract.storeLink":1, "items.name":1, "items.itemLink":1, "items.imgSrc":1, "items.price":1, "items.saleprice":1, "items.accept":1, "items.created_at":1}).sort([['items.created_at', 'descending']]).limit(10)
	}

	try {

		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))

		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		// console.error(e);
		res.json({error: e.message})
	}

})

router.get('/collection/:special_category', async (req, res) => {
	console.log('auth.fetch.special_category /');

	let data = {
		products: null,
		products_end: null
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products, products_end;
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}, {"abstract.imgSrc":1, "abstract.longTitle":1, "abstract.productName":1, "abstract.postIntro":1, "abstract.category":1, "abstract.sub_category":1, "abstract.special_category":1, "funding.targetMoney":1, "funding.currentMoney_sub2":1, "funding.remainingDays_sub":1, "funding.dateTo":1, "subValidPurchases":1}).find({'abstract.special_category': req.params.special_category }).find({'funding.remainingDays_sub' : 1}).sort([['funding.dateFrom', 'descending']]),
		products_end: async () => await ProductModel.find({'abstract.state': 'in-progress'}, {"abstract.imgSrc":1, "abstract.longTitle":1, "abstract.productName":1, "abstract.postIntro":1, "abstract.category":1, "abstract.sub_category":1, "abstract.special_category":1, "funding.targetMoney":1, "funding.currentMoney_sub2":1, "funding.remainingDays_sub":1, "funding.dateTo":1, "subValidPurchases":1}).find({'abstract.special_category': req.params.special_category }).find({'funding.remainingDays_sub' : -1}).sort([['funding.dateFrom', 'descending']])
	}
	
	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home', user)))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/category/:category/:count', async (req, res) => {
	console.log('auth.fetch.category_array /');

	let data = {
		products: null,
		stores: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products, stores;
	let limit_num = req.params.count
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}, {"abstract.imgSrc":1, "abstract.longTitle":1, "abstract.productName":1, "abstract.postIntro":1, "abstract.category":1, "abstract.sub_category":1, "abstract.special_category":1, "funding.targetMoney":1, "funding.currentMoney_sub2":1, "funding.remainingDays_sub":1, "funding.dateTo":1, "subValidPurchases":1}).find({'abstract.category': req.params.category}).find({'funding.remainingDays_sub' : 1}).sort([['funding.dateFrom', 'descending']]),
		stores: async () => await StoreModel.find({'abstract.state': 'in-progress'}, {"abstract.title":1, "abstract.storeLink":1, "items.name":1, "items.itemLink":1, "items.imgSrc":1, "items.price":1, "items.saleprice":1, "items.accept":1, "items.created_at":1, "items.main_category":1, "items.sub_category":1}).find({'items.main_category': req.params.category})
	}
	
	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home', user)))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home,
				category : req.params.category,
				limit_num
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/items-category/:category', async (req, res) => {
	console.log('auth.fetch.items-category /');

	let data = {
		stores: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let stores;
	// let limit_num = req.params.count
	
	let fetcher = {
		stores: async () => await StoreModel.find({'abstract.state': 'in-progress'}).find({'items.category': req.params.category})
	}
	
	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('category_items', user)))
		}))
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				home,
				category : req.params.category
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/whats-on', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}, {"abstract.imgSrc":1, "abstract.longTitle":1, "abstract.productName":1, "abstract.postIntro":1, "abstract.category":1, "abstract.sub_category":1, "abstract.special_category":1, "funding.targetMoney":1, "funding.currentMoney_sub2":1, "funding.remainingDays_sub":1, "funding.dateTo":1, "subValidPurchases":1}).sort([['funding.dateFrom', 'descending']]).limit(24)
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/artkit/:count', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	let limit_num = req.params.count
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}).find({'abstract.category': /artkit/}).sort([['funding.dateFrom', 'descending']]).limit(limit_num)
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/badge/:count', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	let limit_num = req.params.count
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}).find({'abstract.category': /badge/}).sort([['funding.dateFrom', 'descending']]).limit(limit_num)
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/green-design/:count', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	let limit_num = req.params.count
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}).find({'abstract.category': /eco/}).sort([['funding.dateFrom', 'descending']]).limit(limit_num)
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/ecobag/:count', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	let limit_num = req.params.count
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}).find({'abstract.category': /e-bag/}).sort([['funding.dateFrom', 'descending']]).limit(limit_num)
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/storelist', async (req, res) => {
	console.log('auth.fetch / StoreList');

	let data = {
		stores: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let stores;
	
	let fetcher = {
		stores: async () => await StoreModel.find({'abstract.state': 'in-progress'}, {"abstract":1, "storeInfo":1})
	}
	
	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home', user)))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/storemain', async (req, res) => {
	console.log('auth.fetch / StoreMain');

	let data = {
		new_arrivals: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let new_arrivals;
	
	let fetcher = {
		new_arrivals: async () => await StoreModel.find({'abstract.state': 'in-progress'}, {"abstract.title":1, "abstract.storeLink":1, "items.name":1, "items.itemLink":1, "items.imgSrc":1, "items.price":1, "items.saleprice":1, "items.accept":1, "items.created_at":1}).find({'items.accept': true}).sort([['items.created_at', 'descending']]).limit(10),
	}
	
	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home', user)))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/sticker', async (req, res) => {
	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'completed'}).find({'abstract.category': /sticker/})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/sticker2', async (req, res) => {
	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'preparing'}).find({'abstract.category': /sticker/})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/2018stickit', async (req, res) => {
	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.state': 'preparing'}).find({'abstract.category': /2018stickit/})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/blind-poster', async (req, res) => {
	console.log('auth.fetch-poster /');
	let data = {
		products: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let products;
	
	// console.log('blind-poster.req.user : ', req.user)
	
	let fetcher = {
		products: async () => await ProductModel.find({'abstract.category': /poster/})
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/user-qna', async (req, res) => {
	try {
		res.json({
			user: renderUser.authorizedUser(req.user),
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/start', async (req, res) => {
	try {
		res.json({
			user: renderUser.authorizedUser(req.user),
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/funding-start', async (req, res) => {
	try {
		res.json({
			user: renderUser.authorizedUser(req.user),
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/store-apply', async (req, res) => {
	try {
		res.json({
			user: renderUser.authorizedUser(req.user),
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

{/*
router.get('/social-projects', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		projects: null,
	}
	req.session.returnTo = req.url;
	
	let home = {}
	let projects;
	
	let fetcher = {
		projects: async () => await ProjectModel.find({'abstract.state': 'in-progress'})
			.sort([['funding.dateFrom', 'descending']])
	}

	try {
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))
		res.json({
			// user: authorizedUser(req.user),
			user: renderUser.authorizedUser(req.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})
*/}

router.get('/search', async (req, res) => {
	try {
		let q = req.query.q

		let [
			projects,
			products,
			magazines,
			stores,
		] = await fetchDataByKey({q}, KEYS.projectsByQuery, KEYS.productsByQuery, KEYS.magazinesByQuery, KEYS.storesByQuery)

		res.json({
			user: renderUser.authorizedUser(req.user),
			projects,
			products,
			magazines,
			stores
		})
	} catch (e) {
		console.error(e);
		res.send(e.trace);
	}
})



export default router;
