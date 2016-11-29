// Load the module dependencies
import express from 'express'

import multer from 'multer'

import users from './users.server.controller'
import passport from 'passport'

const router = express.Router();

const signupMulter = multer()

// Set up the 'signup' routes
router.route('/signup')
   .get(users.renderSignup)
   .post(signupMulter.array(), users.signup);

// Set up the 'signin' routes
router.route('/login')
   .get(users.renderLogin)
   .post(signupMulter.array(), passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: false
   }));

// Set up the 'signout' route
router.get('/logout', users.logout);

export default router
