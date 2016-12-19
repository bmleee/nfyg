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
import ExhibitionModel from '../models/magazine'
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
		// futureProjects: null,
		// pastProjects: null,
		recentExhibitions: null,
		artMagazines: null,
	}

	// TODO: refactor 3 select query from Project Collection
	let fetcher = {
		presentProjects: async () => await ProjectModel.find({'abstract.state': 'in_progress'}),
		// futureProjects: async () => ProjectModel.find({'abstract.state': 'preparing'}),
		// pastProjects: async () => ProjectModel.find({'abstract.state': 'completed'}),
		recentExhibitions: async () => await ExhibitionModel.find({}).limit(6),
		artMagazines: async () => await MagazineModel.find({}).limit(7),
	}

	try {

		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await fetcher[k]()
		}))

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true // always true
			},
			data: {
				home: {
					presentProjects: data.presentProjects.map((x) => x.toFormat('home')),
					// futureProjects: data.futureProjects.map(x => x.toFormat('home')),
					// pastProjects: data.pastProjects.map(x => x.toFormat('home')),
					recentExhibitions: data.recentExhibitions.map((x) => x.toFormat('home')),
					artMagazines: data.artMagazines.map((x) => x.toFormat('home')),
				}
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

		const projectToRender = project.toFormat('project_detail', req.session.user)

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
		const magazines = await MagazineModel.find({})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: {
				magazines: magazines.map(m => m.toFormat('magazines'))
			}
		})
	} catch (e) {
		console.error(e);
		res.json({ error: e })
	}


})

router.get('/magazines/:magazineName', async (req, res) => {
	console.log('/magazines/' + req.params.magazineName);

	try {
		const magazine = await MagazineModel.findOne({"abstract.magazineName": req.params.magazineName})

		res.json({
			user: {
				isLoggedIn: !!req.session.user,
				isAuthorized: true,
			},
			data: magazine.toFormat('magazine_detail')
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

router.get('/*', async (req, res) => {
	console.log('auth.fetch.url /*', req.url)
	res.json({})
})

export default router;
