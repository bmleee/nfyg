import express from 'express';
import fetch from './auth.fetch'
import passport from 'passport'

import { localAuthenticate } from '../../middlewares/passport'

const router = express.Router();

router.use('/fetch', fetch)

export default router;
