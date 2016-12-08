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

const router = express.Router();


router.get('/*', async (req, res) => {
	console.log(req.url)
})

router.get('/', async (req, res) => {

	res.json({})
})

export default router;
