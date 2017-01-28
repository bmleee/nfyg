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

router.get('/sponsorName', async (req, res) => {
	let docs = await SponsorModel.find({}, 'sponsorName displayName')

	// if(ac.canEdit(req.user)) // TODO: activate auth check
		return res.json({
			user: renderUser.authorizedUser(req.user), // TODO: according to auth-check
			data: {
				options: docs.map( ({sponsorName, displayName}) => ({label: displayName, value: sponsorName}) )
			}
		})
})

router.get('/project', async (req, res) => {
	let docs = await ProjectModel.find({}, 'abstract')

	// TODO: activate auth-check
	return res.json({
		user: renderUser.authorizedUser(req.user), // TODO: according to auth-check
		data: {
			options: docs.map( ({abstract: {projectName, longTitle}}) => ({label: longTitle, value: projectName}) )
		}
	})
})

// TODO: check project name on client-side
router.get('/projectName', async (req, res) => {
	let docs = await ProjectModel.find({}, 'abstract')

	// TODO: activate auth-check
	return res.json({
		user: renderUser.authorizedUser(req.user), // TODO: according to auth-check
		data: {
			options: docs.map( ({abstract: {projectName, longTitle}}) => ({label: longTitle, value: projectName}) )
		}
	})
})

// TODO: check oridyct name on client-side
router.get('/productName', async (req, res) => {
	let docs = await ProductModel.find({}, 'abstract')

	// TODO: activate auth-check
	return res.json({
		user: renderUser.authorizedUser(req.user), // TODO: according to auth-check
		data: {
			options: docs.map( ({abstract: {productName, longTitle}}) => ({label: longTitle, value: productName}) )
		}
	})
})

router.get('/magazineCategory', async (req, res) => {
	
})

// TODO: add

export default router;
