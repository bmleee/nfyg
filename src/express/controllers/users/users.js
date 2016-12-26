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
   .post(signupMulter.array(), (req, res) => {

     console.log('login tried');
     console.log('req.body', JSON.stringify(req.body, undefined, 4));

     let session = req.session


     return passport.authenticate('local', function (err, user, info) {
       console.log('err', err);
       console.log('user', user);
       console.log('info', info);

      //  if (err) return res.status(400).json(err)
      //  if (!user) return res.status(401).json({})
      if (err || !user) return res.redirect('/login')
      session.user = user;
      console.log('session', session);

      // TODO: redirect to referrer
      return res.redirect('/')
     })(req, res)
   });
  // .post(signupMulter.array(), passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: false
  // }))

// Set up the 'signout' route
router.get('/logout', users.logout);

export default router
