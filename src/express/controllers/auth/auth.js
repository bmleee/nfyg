import express from 'express';
import fetch from './auth.fetch'
import passport from 'passport'
import flash from 'connect-flash'

import { localAuthenticate } from '../../middlewares/passport'

const router = express.Router();

router.use('/fetch', fetch)

export default router;
