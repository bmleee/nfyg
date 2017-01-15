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

import ProjectRouter from './auth.fetch.project'
import ProductRouter from './auth.fetch.product'
import ExhibitionRouter from './auth.fetch.exhibition'
import MagazineRouter from './auth.fetch.magazine'
import SponsorRouter from './auth.fetch.sponsor'

import QnARouter from './auth.fetch.qna'

import OptionRouter from './auth.fetch.option'
import EditorRouter from './auth.fetch.editor'

import { authorizedUser } from '../../lib/renderUser'

const router = express.Router();

router.use('/', (req, res, next) => {
	console.log('auth.fetch.url', req.url);
	next()
})

router.use('/projects', ProjectRouter);
router.use('/products', ProductRouter);
router.use('/exhibitions', ExhibitionRouter);
router.use('/magazines', MagazineRouter);
router.use('/sponsors', SponsorRouter);
router.use('/options', OptionRouter);
router.use('/', EditorRouter);

router.use('/qna', QnARouter);


/**
 * auth level : anyone
 */
router.get('/', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		presentProjects: null,
		recentExhibitions: null,
		artMagazines: null,
		products: null,
	}

	let home = {}

	let presentProjects, recentExhibitions, artMagazines, products;

	// TODO: refactor 3 select query from Project Collection
	let fetcher = {
		presentProjects: async () => await ProjectModel.find({'abstract.state': 'in-progress'}),
		recentExhibitions: async () => await ExhibitionModel.find({}).limit(6),
		artMagazines: async () => await MagazineModel.find({}).limit(7),
		products: async () => await ProductModel.find({'abstract.state': 'in-progress'}),
	}

	try {

		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))

		res.json({
			user: authorizedUser(req.session.user),
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

export default router;
