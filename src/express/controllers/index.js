import express from 'express'

import testAPI from './test-api'
import todos from './Todos'
import AWS from './AWS'
import users from './users'
import end_point from './end-point'
import auth from './auth'

const router = express.Router()

router.use('/test-api', testAPI)
router.use('/todos', todos)
router.use('/aws', AWS)
router.use('/users', users)
router.use('/end-point', end_point)
router.use('/auth', auth)

export default router
