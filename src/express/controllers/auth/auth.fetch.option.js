/**
 * should res.json
 * {
		 user: {
			 isLoggedIn: false,
			 isAuthorized: true, // can see this page?
		 },
		 data: {
		 	options: [{label, value}]
	 	}
   }
 */

import express from 'express';

import UserModel from '../../models/user'
import ProjectModel, {restrictedNames} from '../../models/project'
import ProductModel from '../../models/product'
import ExhibitionModel from '../../models/exhibition'
import MagazineModel from '../../models/magazine'
import SponsorModel from '../../models/sponsor'

import * as ac from '../../lib/auth-check'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.get('/sponsor', async (req, res) => {
	let docs = await SponsorModel.find({}, 'sponsorName displayName')

	// if(ac.canEdit(req.session.user)) // TODO: activate auth check
		return res.json({
			user: renderUser.authorizedUser, // TODO: according to auth-check
			data: {
				options: docs.map( ({sponsorName, displayName}) => ({label: displayName, value: sponsorName}) )
			}
		})
})

router.get('/project', async (req, res) => {
	let docs = await ProjectModel.find({}, 'abstract')

	// TODO: activate auth-check
	return res.json({
		user: renderUser.authorizedUser, // TODO: according to auth-check
		data: {
			options: docs.map( ({abstract: {projectName, longTitle}}) => ({label: longTitle, value: projectName}) )
		}
	})
})

// TODO: add

export default router;
