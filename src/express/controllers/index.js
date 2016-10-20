import express from 'express'

import testAPI from './test-api'
import todos from './Todos'
import AWS from './AWS'

const router = express.Router()

router.use('/test-api', testAPI)
router.use('/todos', todos)
router.use('/aws', AWS)

export default router
