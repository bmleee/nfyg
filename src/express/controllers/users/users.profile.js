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

const router = express.Router()

router.get('/', async (req, res) => {
	let user = req.session.user

	try {
		res.json({
			user: {
				isLoggedIn: !!user,
				isAuthorized: !!user,
			},
			data: {
				user: await user.toFormat()
			}
		})
	} catch (error) {
		res.status(400).json({
			user: {
				isLoggedIn: !!user,
				isAuthorized: !!user,
			},
			error
		})
	}

})

export default router
