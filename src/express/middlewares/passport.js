// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
import mongoose from 'mongoose'
import User from '../models/user'

import bkfd2Password from 'pbkdf2-password'

import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import { FB_APP } from '~/env'

import FacebookTracker from '../../lib/FacebookTracker'

import Mailchimp from 'mailchimp-lite';
let mailchimp = new Mailchimp({
  key: 'b77eda5563facca7997e3d3914b7afbb-us13',
  datacenter: 'us13'
});


const hasher = bkfd2Password();

// Define the Passport configuration method
export default function(passport) {
	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		User.findOne({ id }, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done) {
		User.findOneByEmail(email, function(err, user) {
			console.error(err);

			if (err) return done(err)
			if (!user) return done(null, false, { message: 'Unknown user' })

			return hasher({password, salt: user.salt}, function(e, p, salt, hash) {
				if (hash === user.password) done(null, user)
				else done(null, false, { message: 'Incorrect password.' })
			})
		})
	}))

	passport.use(new FacebookStrategy({
		clientID: FB_APP.clientID,
	    clientSecret: FB_APP.clientSecret,
	    callbackURL: "/api/users/login-facebook/callback",
	    profileFields:['id', 'email', 'gender', 'link', 'displayName', 'name']
	}, async function(accessToken, refreshToken, profile, done) {
		if (!profile.emails) return done(new Error(`can't get user email from facebook profile`))

		let email = profile.emails[0].value
		let long_lived_access_token = refreshToken || accessToken
		// TODO: get long lived access token
		// TODO: facebook tracker - /users/login
	try {
		long_lived_access_token = await FacebookTracker.getLongLivedUserAccessToken(refreshToken || accessToken)
	} catch (e) {
		console.error(e.message)
		console.error(e)
	}
		User.findOneByEmail(email, function(err, user) {
			if (err) return done(err)
			// user found
			if (user) {
				console.log('기존 회원 발견');
				user.fb_access_token = long_lived_access_token
        user.fb_id = profile.id
				return user.save(async function (err, user) {
          await FacebookTracker.fbUserLoggedIn(user)

					if (err) return done(err)
					return done(null, user)
				})
			}

			console.log('새로운 회원');
			// create new user
			User.create({
				display_name: profile.displayName,
				name: profile.displayName,
				fb_id: profile.id,
				fb_email: email,
				local_email: email,
				fb_access_token: long_lived_access_token,
				image: `http://graph.facebook.com/${profile.id}/picture?type=large`,
			}, async function(err, user) {
				if (err) return done(err)

        await FacebookTracker.fbUserLoggedIn(user)

				let subemail = user.fb_email

				const result = await mailchimp.v2.post('/lists/batch-subscribe', {
				  id: 'c7e4765340',
				  update_existing: true,
				  double_optin: false,
				  replace_interests: false,
				  batch: [
				    {email: {email: subemail}}
				  ]
				})

				console.log(result)

				return done(null, user)
			})
		})
	}))


}
