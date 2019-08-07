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

import * as ac from '../../lib/auth-check'
import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.use('/projects', ProjectRouter);
router.use('/products', ProductRouter);
router.use('/exhibitions', ExhibitionRouter);
router.use('/magazines', MagazineRouter);
router.use('/sponsors', SponsorRouter);
router.use('/store', StoreModel);

router.use('/qnas', QnARouter);
router.use('/posts', PostRouter);
router.use('/purchases', PurchaseRouter);

router.get('/:editor/:tab?', async (req, res, next) => {
	if (!['project-editor', 'magazine-editor', 'sponsor-editor'].includes(req.params.editor)) {
		return next()
	}
	
	let data = {
		products: null
	}
	
	let home = {}
	let products;
	
	let fetcher = {
		products: async () => await ProductModel.find({})
	}

	try {
		if (!ac.isAdmin(req.user) && !ac.isEditor(req.user)) throw Error(`unauthorized`)
		
		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('editor')))
		}))
		
		res.json({
			user: renderUser.authorizedUser(req.user, true),
			data: {
				home
			}
		})
	} catch (e) {
		res.status(500).json({
			user: renderUser.unauthorizedUser(req.user, false),
			error: e.message
		 })
	}
})

router.get('/product-editor/:tab?', isLoggedIn, async (req, res, next) => {
	let data = {
		products: null
	}
	let home = {}
	let products;
	let fetcher = {
		products: async () => await ProductModel.find({}, {"abstract.productName":1, _id:0})
	}

	try {
		// if (!ac.isAdmin(req.user) && !ac.isEditor(req.user)) throw Error(`unauthorized`)
		if (!req.user) throw Error(`접근 권한이 없습니다.`)
		
		await Promise.all(Object.keys(data).map(async (k) => {
			home[k] = await fetcher[k]()
			// home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('editor')))
		}))
		
		res.json({
			user: renderUser.authorizedUser(req.user, true),
			data: {
				home,
				userType: req.user.getUserType()
			}
		})
	} catch (e) {
		res.status(500).json({
			user: renderUser.unauthorizedUser(req.user, false),
			error: e.message
		 })
	}
})

router.get('/store-editor/:tab?', isLoggedIn, async (req, res, next) => {
	let data = {
		stores: null,
	}
	let home = {}
	let stores;
	
	let fetcher = {
		stores: async () => await StoreModel.find({}, {"abstract.storeLink":1, _id:0})
	}
	
	console.log('fetcher', fetcher)

	try {
		// if (!ac.isAdmin(req.user) && !ac.isStore(req.user)) throw Error(`접근 권한이 없습니다.`)
		if (!req.user) throw Error(`접근 권한이 없습니다.`)
		
		await Promise.all(Object.keys(data).map(async (k) => {
			home[k] = await fetcher[k]()
			// home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('editor')))
		}))
		
		res.json({
			user: renderUser.authorizedUser(req.user, true),
			data: {
				home,
				userType: req.user.getUserType(),
			}
		})
	} catch (e) {
		res.status(500).json({
			user: renderUser.unauthorizedUser(req.user, false),
			error: e.message
		 })
	}
})


export default router;
