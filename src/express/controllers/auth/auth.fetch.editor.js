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

import * as ac from '../../lib/auth-check'
import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.get('/:editor/:tab?', async (req, res, next) => {
	if (!['project-editor', 'product-editor', 'magazine-editor'].includes(req.params.editor)) {
		return next()
	}

	try {
		if (!ac.isAdmin(req.user) && !ac.isEditor(req.user)) throw Error(`unauthorized`)
		res.json({
			user: renderUser.authorizedUser(req.user, true),
		})
	} catch (e) {
		res.status(401).json({
			user: renderUser.unauthorizedUser(req.user, false),
			error: e.message
		 })
	}
})


export default router;
