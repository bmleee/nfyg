// Load the module dependencies
import express from 'express'
import bkfd2Password from 'pbkdf2-password'

import multer from 'multer'

import UserModel from '../../models/user'

import passport from 'passport'
import profile from './users.profile'
import address from './users.address'
import payment from './users.payment'

const hasher = bkfd2Password();

const router = express.Router();

router.use('/profile', profile)
router.use('/address', address)
router.use('/payment', payment)


const signupMulter = multer()

// Set up the 'signup' routes
router.post('/signup', signupMulter.array(), (req, res) => {
  hasher({password: req.body.password}, function(err, pass, salt, hash) {
    UserModel.create({
      ...req.body,
      access_level: 0,
      local_email: req.body.email,

      provider: 'local',
      salt,
      password: hash,
    }, function (err, user) {
      if (err) {
        console.error(err);
        return res.redirect('/signup')
      }
      res.redirect(req.params.referrer || '/') // TODO: redirect to referer
    })
  })
})

// Set up the 'login' routes
router.post('/login', signupMulter.array(), (req, res) => {
  return passport.authenticate('local', function (err, user, info) {
    if (err || !user) return res.redirect('/login')
    req.user = user;

    req.logIn(user, function(err) {
      if (err) { return res.redirect('/login') }
      res.redirect(req.params.referrer || '/') // TODO: redirect to referrer
    });

   })(req, res)
 })

router.get('/login-facebook', passport.authenticate('facebook', { scope: ['user_posts'] }))
router.get('/login-facebook/callback', (req, res) => {
  return passport.authenticate('facebook',function (err, user, info) {
    if (err || !user) return res.redirect('/login')
    req.user = user;

    req.logIn(user, function(err) {
      if (err) { return res.redirect('/login') }
      // TODO: redirect to referrer
      res.redirect('/')
    });

   })(req, res)
})

router.get('/logout', (req, res) => {
	req.logout();
  res.redirect('/')
})

export default router
