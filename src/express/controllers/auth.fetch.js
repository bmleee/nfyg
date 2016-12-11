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
		futureProjects: null,
		pastProjects: null,
		recentExhibitions: null,
		artMagazines: null,
	}
	let args = {
		presentProjects: [ProjectModel, {'abstract.state': 'in_progress'}],
		futureProjects: [ProjectModel, {'abstract.state': 'preparing'}],
		pastProjects: [ProjectModel, {'abstract.state': 'completed'}],
		recentExhibitions: [ExhibitionModel, {}],
		artMagazines: [MagazineModel, {}],
	}

	try {

		await Promise.all(Object.keys(data).map(async (k) => {
			data[k] = await args[k][0].find(args[k][1])
		}))

		res.json({
			presentProjects: data.presentProjects.map(x => x.toFormat('home')),
			futureProjects: data.futureProjects.map(x => x.toFormat('home')),
			pastProjects: data.pastProjects.map(x => x.toFormat('home')),
			recentExhibitions: data.recentExhibitions.map(x => x.toFormat('home')),
			artMagazines: data.artMagazines.map(x => x.toFormat('home')),
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}

})

/**
 * auth level : anyone
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
		console.log('project', project);
		if (!project) throw new Error(`no such project in name of ${projectName}`)
		console.log('returns', project.toJSON());
		res.json({
			user: req.session.user,
			data: {
				project: project.toJSON()
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

router.get('/*', async (req, res) => {
	console.log('auth.fetch.url /*', req.url)
	res.json({})

})

export default router;
