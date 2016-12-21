import express from 'express';

const router = express.Router();

router.get('/login-success', (req, res) => {
	const referrer = req.get('Referrer')
	console.log('req.headers', JSON.stringify(req.headers, undefined, 4));
	console.log('referrer', referrer);

	res.redirect('/')
})

export default router;
