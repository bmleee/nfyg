import fs from 'fs'
import path from 'path'
import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send('hello')
})

router.get('/:file_name', (req, res) => {
	const fileName = req.params.file_name;
	const file = fs.readFileSync(path.resolve(__dirname, `../sample/${fileName}.json`), 'utf-8')
	res.status(200).json(JSON.parse(file))
})

export default router;
