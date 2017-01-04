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

import * as ac from '../../lib/auth-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

/**
 * auth level
 * 	- overview: anyone
 * 	- post: according to thresholdMoney
 * 	- qna: anyone
 * fetch project detail info
 * @type {[type]}
 */
router.get('/:projectName/:option?', async (req, res, next) => {
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
		const project = await ProjectModel.findByName(projectName)
			.populate('sponsor posts qnas')

		if (!project) throw new Error(`no such project in name of ${projectName}`)

		const projectToRender = await project.toFormat('project_detail', req.session.user)

		// console.log('projectToRender', JSON.stringify(projectToRender, undefined, 4));

		res.status(200).json({
			user: renderUser.authorizedUser(req.session.user),
			data: {
				project: projectToRender
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e})
	}
})

router.get('/:projectName/edit', async (req, res) => {
	console.log('/projects/:projectName/edit');

	const { projectName } = req.params
	const { user } = req.session
	const project = await ProjectModel.findByName(projectName)
		.populate('sponsor')
	console.log('/projects/:projectName/edit.project', project);

	// TODO: activate this
	// if (!ac.canEdit(user, project)) {
	// 	return res.status(401).json(renderHelper.unauthorizedUser(user))
	// }

	res.json({
		user: renderUser.authorizedUser(user),
		data: {
			project: await project.toFormat('edit')
		}
	})
})

// update project
router.post('/:new?', async (req, res) => {
	console.log('POST /auth/fetch/projects');

	const body = req.body
	const isNew = !!req.param.new
	const projectName = body.abstract.projectName
	const sponsor = await SponsorModel.findOne({sponsorName: body.sponsor.sponsorName})
	body.sponsor = sponsor

	// console.log("{ 'abstract.project_name': projectName }", 			{ 'abstract.project_name': projectName });
	try {
		const r = await ProjectModel.update(
			{ 'abstract.projectName': projectName },
			body,
		)

		console.log('upsert result', r);

		res.status(200).json({response: !!r.ok})
	} catch (e) {
		console.error(e);
		res.state(400).json({ error: e })
	} finally {

	}
})

export default router;
