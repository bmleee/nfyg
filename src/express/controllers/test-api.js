'use strict'
import fs from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import md5 from 'md5'

import { checkMimeType } from '../lib/utils'

const router = express.Router();



const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../public/uploads/'),
  filename: (req, file, next) => {
    req.filename =  md5(Date.now().toString().substring(0, 8) + '_' + file.originalname)  // append filename to request object
    next(null, req.filename)
  },
	limits: {fileSize: 1000000, files:1},
  fileFilter: (req, file, cb) => {
    cb(null, checkMimeType(file.mimetype))
  }
})

const upload = multer({ storage })
router.get('/', (req, res) => {
	res.status(200).send('hello')
})

router.post('/upload/:file_name', upload.single('file'), (req, res) => {
  const imgSrc = `/uploads/${req.filename}`

  console.log(`imgSrc: ${imgSrc}`)

	res.status(200).json({
    sourceURL: imgSrc,
  })
})

router.get('/read/:file_name', (req, res) => {
	const fileName = req.params.file_name;
	const file = fs.readFileSync(path.resolve(__dirname, `../sample/${fileName}.json`), 'utf-8')
	res.status(200).json(JSON.parse(file))
})

const singleMulter = multer()
router.post('/signup', singleMulter.array(), async (req, res) => {
  const {
    email, pw, display_name, photoURL
  } =  req.body;

  console.log('headers: ', req.headers);
  console.log('/signin email', email);
  console.log('/signin pw', pw);
  console.log('/signin display_name', display_name);
  console.log('/signin photoURL', photoURL);

  // if (!!email && !!pw && !!display_name)
  //   res.redirect('/')
  // else
  //   res.redirect('/signup')
  res.json({
    response: 'response!'
  })
})

router.post('/project', singleMulter.array(), async (req, res) => {
  console.log('/project body', JSON.stringify(req.body, undefined, 4));
  res.json({
    body: req.body
  })
})

router.post('/exhibition', singleMulter.array(), async (req, res) => {
  console.log('/exhibition body', JSON.stringify(req.body, undefined, 4));
  res.json({
    body: req.body
  })
})

router.post('/magazine', singleMulter.array(), async (req, res) => {
  console.log('/magazine body', JSON.stringify(req.body, undefined, 4));
  res.json({
    body: req.body
  })
})

router.post('/sponsor', singleMulter.array(), async (req, res) => {
  console.log('/sponsor body', JSON.stringify(req.body, undefined, 4));
  res.json({
    body: req.body
  })
})

export default router;
