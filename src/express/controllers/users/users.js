// Load the module dependencies
import express from 'express'
import bkfd2Password from 'pbkdf2-password'

import multer from 'multer'

import passport from 'passport'
import users from './users.server.controller'
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
    User.create({
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
    req.session.user = user;

    return res.redirect(req.params.referrer || '/') // TODO: redirect to referrer
   })(req, res)
 })

router.get('/login-facebook', passport.authenticate('facebook', { scope: 'email' }))
router.get('/login-facebook/callback', (req, res) => {
  return passport.authenticate('facebook', function (err, user, info) {
    if (err || !user) return res.redirect('/login')
    req.session.user = user;

    // TODO: redirect to referrer
    return res.redirect('/')
   })(req, res)
})

router.get('/logout', (req, res) => {
  delete req.session.user
	req.logout();
	res.redirect('/');
})

export default router
