// Load the module dependencies
import express from 'express'
import bkfd2Password from 'pbkdf2-password'

import multer from 'multer'

import { Strategy as LocalStrategy } from 'passport-local'

import UserModel from '../../models/user'

import checkReturnTo from '../../middlewares/passport'

import passport from 'passport'
import profile from './users.profile'
import address from './users.address'
import payment from './users.payment'

import flash from 'connect-flash'
import back from 'express-back'

import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt-nodejs';
import async from 'async';
import crypto from 'crypto';
import path from 'path';

import { randomNumber } from '../../lib/utils'
import Mailer from '../../lib/Mailer'
import SMS from '../../lib/SMS'

import { sendAlimtalk_shipping, sendAlimtalk_numbercheck } from '~/src/react/api/AppAPI'

import Mailchimp from 'mailchimp-lite';
let mailchimp = new Mailchimp({
  key: 'b77eda5563facca7997e3d3914b7afbb-us13',
  datacenter: 'us13'
});

// import { ensureLoggedIn as ensureLoggedIn} from 'connect-ensure-login'

const hasher = bkfd2Password();

const router = express.Router();

const transporter = nodemailer.createTransport('smtps://sevenpictures.mailing%40gmail.com:thflatk4601@@smtp.gmail.com')

router.use('/profile', profile)
router.use('/address', address)
router.use('/payment', payment)


const signupMulter = multer()

router.get('/signup', function(req, res) {
    res.json({
      user: req.user,
			data: {
				message_error: req.flash('error'),
				message_success: req.flash('success_msg')
			}
    })
})
router.post('/signup', signupMulter.array(), (req, res) => {
  UserModel.findOneByEmail(req.body.email, function(err, user) {
      if (err) console.error('err1', err)
      if (user) {
        req.flash('error', '해당 이메일주소가 이미 존재합니다.');
        return res.redirect('/signup');
      }
      if (req.body.checkbox == undefined) {
      req.flash('error', '개인정보 이용에 동의해주세요.');
      return res.redirect('/signup');
      }
      if (req.body.password != req.body.passwordconfirm) {
      req.flash('error', '비밀번호를 확인해주세요.');
      return res.redirect('/signup');
      }
      
      hasher({password: req.body.password}, function(err, pass, salt, hash) {
      UserModel.create({
        ...req.body,
        access_level: 0,
        local_email: req.body.email,
        fb_email: req.body.email,
        provider: 'local',
        salt,
        password: hash,
      }, function (err, user) {
        if (err) {
          return res.redirect('/signup')
        }
        
				mailchimp.v2.post('/lists/batch-subscribe', {
    		  id: '0a47abeda6',
    		  update_existing: true,
    		  double_optin: false,
    		  replace_interests: false,
    		  batch: [
    		    {email: {email: req.body.email}}
    		  ]
    		}),
    		
        req.flash('success_msg', '회원가입에 성공하였습니다.');
        res.redirect('/signupsuccess'); // TODO: redirect to referer
      })
    })
  })
})

router.get('/login', function(req, res) {
    res.json({
      user: req.user,
			data: {
				message: req.flash('error')
			}
    })
})

router.post('/login', signupMulter.array(), passport.authenticate('local', {
    successReturnToOrRedirect : '/',
    failureRedirect           : '/login',
    failureFlash              : true
 }));

router.get('/login-facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email', 'public_profile', 'user_posts'] }));

router.get('/login-facebook/callback', passport.authenticate('facebook', {
    successReturnToOrRedirect : '/',
    failureRedirect           : '/login'
}));

router.get('/logout', (req, res) => {
  res.clearCookie(`2xtFeam.py-H@rd-2-5wxvq`, {path:'/', domain: 'https://netflix-salon.co.kr'});
  req.logout();
  res.redirect('/');
})

router.get('/forgot', function(req, res) {
  res.json({
      user: req.user,
			data: {
				message_error: req.flash('error'),
				message_info: req.flash('info')
			}
  })
})

router.post('/forgot', (req, res, next) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      })
    },
    function(token, done) {
      UserModel.findOneByEmail(req.body.email, function(err, user) {
        if (err) console.error('err1', err)
        if (!user) {
          req.flash('error', '해당 이메일주소와 일치하는 아이디가 없습니다.');
          console.log('No account with that email address exists.')
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        
        console.log(user.resetPasswordToken)

        user.save(function(err) {
          if(err) console.error('err2', err)
          done(err, token, user);
        })
      })
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secureConnection : false,
        port: 587,
        auth: {
          user: 'sevenpictures.mailing@gmail.com',
          pass: 'thflatk4601@'
        }
      })
      var mailOptions = {
        to: req.body.email,
        from: '7Pictures',
        subject: '7Pictures 비밀번호 변경',
        text: '비밀번호 변경을 원하시면 아래의 링크를 클릭해주세요 :)\n\n' +
          'https://' + 'netflix-salon.co.kr' + '/reset/' + token + '\n\n' +
          '해당링크는 1시간 동안 유지됩니다.'
      }
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('user.email', req.body.email);
        req.flash('info', '비밀번호 변경을 위한 메일이 ' + req.body.email + '으로 발송되었습니다.');
        done(err, 'done');
      })
    }
  ], function(err) {
    if (err) { 
      console.error('err3', err)
      return next(err);
    }
    res.redirect('/forgot');
  })
})

router.get('/reset/:token', (req, res) => {
  UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      //console.log('req.params', UserModel.resetPasswordToken)
      console.log('req.params.token', req.params.token)
      req.flash('error', '유효기간이 지난 링크 입니다.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user,
    })
  })
})

router.post('/reset/:token', (req, res) => {
  async.waterfall([
    function(done) {
      hasher({password: req.body.password}, function(err, pass, salt, hash) {
       UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user ) {
          req.flash('error', '유효기간이 지난 링크 입니다.');
          // console.log('req.params', UserModel.resetPasswordToken)
          console.log('req.params.token', req.params.token)
          console.error('err4', err)
          return res.redirect('/forgot');
        }
        
        // provider: 'local',
        
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        // console.log('req.params.token1', req.params.token)

        user.save(function(err) {
          req.logIn(user, function(err) {
            if(err) console.error('err5', err)
            done(err, user);
            })
          })
        })
      })
    },
  ], function(err) {
    if(err) console.error('err6', err)
    res.redirect('/');
  })
})

router.get('/subscribe', function(req, res) {
    res.json({
      user: req.user,
			data: {
			  message_error: req.flash('error'),
				message_success: req.flash('success_msg')
			}
    })
})

router.post('/subscribe', (req, res) => {
    console.log('req.body.email', req.body.email)
    if (req.body.checkbox == undefined) {
      req.flash('error', '개인정보 이용에 동의해주세요.');
      return res.redirect('/subscribe');
    }
		return mailchimp.v2.post('/lists/batch-subscribe', {
		  id: '0a47abeda6',
		  update_existing: true,
		  double_optin: false,
		  replace_interests: false,
		  batch: [
		    {email: {email: req.body.email}}
		  ]
		}),
		req.flash('success_msg', '구독신청 감사드립니다.'),
		res.redirect('/subscribe')
})


router.post('/mailcheck/:email', async (req, res) => {
    try {
      let user = await UserModel.findOneByEmail(req.params.email)   
      let checkNumber = randomNumber(1000000);
      
      console.log('mailcheck.mail', req.body.body)
      
      user.mail_check_number = checkNumber
      user.mail_check_Expires = Date.now() + 180000;
      user.sub_email = req.body.body
      
      let r = await user.save()
      
      await Mailer.sendCheckMail(checkNumber, req.body.body)
      
      res.json({
			  response: r
		  })
      
    } catch(e) {
      console.error('e.message', e.message)
    }
})

router.post('/mailcheck_auth/:useremail', async (req, res) => {
  try {
    let user = await UserModel.findOneByEmail(req.params.useremail)
    
    if (user.mail_check_Expires < Date.now() ) {
      req.flash('error', '유효시간 3분이 지났습니다.');
      console.log('유효시간 3분이 지났습니다.')
    }
    
    if(user.mail_check_number == req.body.body) {
      user.mail_check = true;
      user.mail_check_number = undefined;
      user.mail_check_Expires = undefined;
      user.save()
    }
    else {
      user.mail_check = false;
      user.save()
      req.flash('error', '틀린 인증번호 입니다! 다시 입력해주세요.')
    }
    
    res.json({
		  response: user.mail_check
	  })
      
  } catch(e) {
    console.error('e.message', e.message)
  }
})

router.get('/mailcheck', function(req, res) {
  res.json({
      user: req.user,
			data: {
				message_error: req.flash('error')
			}
  })
})


router.post('/numbercheck/:email', async (req, res) => {
    try {
      let user = await UserModel.findOneByEmail(req.params.email)   
      let checkNumber = randomNumber(1000000);
      
      user.number_check_number = checkNumber
      user.number_check_Expires = Date.now() + 180000;
      user.contact = req.body.body
      
      let r = await user.save()
      
      await sendAlimtalk_numbercheck(checkNumber, req.body.body)
      
      res.json({
			  response: r
		  })
      
    } catch(e) {
      // console.error('e.message', e.message)
    }
})

router.post('/numbercheck_auth/:email', async (req, res) => {
  try {
    let user = await UserModel.findOneByEmail(req.params.email)
    
    if (user.number_check_Expires < Date.now() ) {
      req.flash('error', '유효시간 3분이 지났습니다.');
      console.log('유효시간 3분이 지났습니다.')
    }
    
    if(user.number_check_number == req.body.body) {
      user.number_check = true;
      user.number_check_number = undefined;
      user.number_check_Expires = undefined;
      user.save()
    }
    else {
      user.number_check = false;
      user.save()
      req.flash('error', '틀린 인증번호 입니다! 다시 입력해주세요.');
      console.log('틀린 인증번호 입니다! 다시 입력해주세요.')
    }
    
    res.json({
		  response: user.number_check
	  })
      
  } catch(e) {
    console.error('e.message', e.message)
  }
})

router.post('/sendconfirmsmsandemail', async (req, res) => {
    let r, r2;
    // r = await SMS.sendConfirmSMS(req.body.title, req.body.number);
    r = await Mailer.sendConfirmMail(req.body.title, req.body.email);
    
    res.json({
		  response: r
	  })
})

router.post('/sendinvoicesmsandemail', async (req, res) => {
    let r, r2;
    r = await sendAlimtalk_shipping(req.body.number, req.body.name, req.body.items, req.body.shippingCompany, req.body.invoice_number, req.body.shippingCompany_link);
    r2 = await Mailer.sendInvoiceMail(req.body.title, req.body.items, req.body.email, req.body.shippingCompany, req.body.shippingCompany_link, req.body.invoice_number, req.body.name);
    
    res.json({
		  response: r
	  })
})

router.post('/makenoticesmsandemail', async (req, res) => {
    let r, r2;
    // r = await SMS.sendMakeSMS(req.body.title, req.body.link);
    r2 = await Mailer.sendMakeMail(req.body.title, req.body.PorS, req.body.link);
    
    res.json({
		  response: r2
	  })
})

export default router
