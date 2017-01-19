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
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.get('/project-editor/:tab?', async (req, res) => {
	// TODO: let only editor, admin can access
	res.json({
		user: renderUser.authorizedUser(req.user),
		data: {}
	})
})

router.get('/product-editor/:tab?', async (req, res) => {
	// TODO: let only editor, admin can access
	res.json({
		user: renderUser.authorizedUser(req.user),
		data: {}
	})
})

export default router;
