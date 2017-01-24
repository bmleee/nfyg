import express from 'express'

import testAPI from './test-api'
import todos from './Todos'
import AWS from './AWS'
import users from './users'
import end_point from './end-point'
import auth from './auth'
import mail from './mail'
import payment from './payment'
import iamport from './iamport'

const router = express.Router()

router.use('/test-api', testAPI)
router.use('/todos', todos)
router.use('/aws', AWS)
router.use('/users', users)
router.use('/end-point', end_point)
router.use('/auth', auth)
router.use('/mail', mail)
router.use('/payment', payment)
router.use('/iamport', iamport)

export default router
