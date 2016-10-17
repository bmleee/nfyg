import express from 'express'

import testAPI from './test-api'
import todos from './Todos'

const router = express.Router()

router.use('/test-api', testAPI)
router.use('/todos', todos)

export default router
