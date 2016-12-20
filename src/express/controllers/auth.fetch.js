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
import ExhibitionModel from '../models/exhibition'
import MagazineModel from '../models/magazine'
import SponsorModel from '../models/sponsor'

const router = express.Router();

router.use('/', (req, res, next) => {
	console.log('auth.fetch.url', req.url);
	next()
})

/**
 * auth level : anyone
 */
router.get('/', async (req, res) => {
	console.log('auth.fetch /');

	let data = {
		presentProjects: null,
		recentExhibitions: null,
		artMagazines: null,
	}

	let home = {}

	let presentProjects, recentExhibitions, artMagazines;

	// TODO: refactor 3 select query from Project Collection
	let fetcher = {
		presentProjects: async () => await ProjectModel.find({'abstract.state': 'in_progress'}),
		recentExhibitions: async () => await ExhibitionModel.find({}).limit(6),
		artMagazines: async () => await MagazineModel.find({}).limit(7),
	}

	try {

		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
			home[k] = await Promise.all(data[k].map(async (x) => await x.toFormat('home')))
		}))

		console.log('recentExhibitions', JSON.stringify(home.recentExhibitions, undefined, 4));

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true // always true
			},
			data: {
				home
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

/**
 * auth level
 * 	- overview: anyone
 * 	- post: according to thresholdMoney
 * 	- qna: anyone
 * fetch project detail info
 * @type {[type]}
 */
router.get('/projects/:projectName/:option?', async (req, res, next) => {
	const {
		projectName,
		option,
	} = req.params;

	if (restrictedNames.includes(projectName)) {
		return res.redirect('/404')
	};

	if(['edit'].includes(option)) {
		return next() // go to /:projectName/edit
	}

	try {
		const project = await ProjectModel.findOne({"abstract.projectName": projectName})
			.populate('sponsor posts qnas')

		if (!project) throw new Error(`no such project in name of ${projectName}`)

		const projectToRender = await project.toFormat('project_detail', req.session.user)

		// console.log('projectToRender', JSON.stringify(projectToRender, undefined, 4));

		res.status(200).json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true // always true
			},
			data: {
				project: projectToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}
})

router.get('/projects/:projectName/edit', async (req, res) => {
	console.log('/projects/:projectName/edit');
	res.json({})
})

// TODO: add res.json to user auth info
// TODO: magazine paginaiton
// TODO: magazine category select
router.get('/magazines', async (req, res) => {
	console.log('/magazines/', );

	try {
		const magazines = await MagazineModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				magazines: await Promise.all(magazines.map(async (m) => await m.toFormat('magazines')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e })
	}


})

router.get('/magazines/:magazineName/:option?', async (req, res, next) => {
	console.log('/magazines/' + req.params.magazineName);
	if(['edit'].includes(req.params.option)) {
		return next()
	}

	try {
		const magazine = await MagazineModel.findOne({"abstract.magazineName": req.params.magazineName})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: await magazine.toFormat('magazine_detail')
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

router.get('/magazines/:magazineName/edit', async (req, res) => {
	console.log('/magazines/:magazineName/edit');
	res.json({})
})

// TODO: add res.json to user auth info
// TODO: exhibition paginaiton
// TODO: magazine genre select
router.get('/exhibitions', async (req, res) => {
	console.log('/exhibitions/', );

	try {
		const exhibitions = await ExhibitionModel.find({}).sort({"abstract.created_at": -1})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				exhibitions: await Promise.all(exhibitions.map(async (e) => await e.toFormat('exhibitions')))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e })
	}


})

router.get('/exhibitions/:exhibitionName/:option', async (req, res, next) => {
	console.log('/exhibitions/' + req.params.exhibitionName);
	if (['edit'].includes(req.params.option)) {
		return next()
	}

	try {
		let exhibition = await ExhibitionModel.findOne({"abstract.exhibitionName": req.params.exhibitionName})
			.populate('qnas')
		exhibition = await exhibition.toFormat('exhibition_detail')

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				exhibition
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

router.get('/exhibitions/:exhibitionName/edit', async (req, res) => {
	console.log('/exhibitions/:exhibitionName/edit');
	res.json({})
})


router.get('/*', async (req, res) => {
	console.log('auth.fetch.url /*', req.url)
	res.json({})
})

export default router;
