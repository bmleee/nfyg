// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
import mongoose from 'mongoose'
import User from '../models/user'

import bkfd2Password from 'pbkdf2-password'

import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'

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
		clientID: '173733359775456',
    clientSecret: '5e2b6f76dd2056a75baa30bc53b5463f',
    callbackURL: "/api/users/login-facebook/callback",
    profileFields:['id', 'email', 'gender', 'link', 'displayName', 'name']
	}, function(accessToken, refreshToken, profile, done) {
		if (!profile.emails) return done(new Error(`can't get user email from facebook profile`))

		let email = profile.emails[0].value

		// TODO: get long lived access token
		// TODO: facebook tracker - /users/login

		User.findOneByEmail(email, function(err, user) {
			if (err) return done(err)
			// user found
			if (user) return done(null, user)

			// create new user
			User.create({
				display_name: profile.displayName,
				name: profile.displayName,
				fb_id: profile.id,
				fb_email: email,
				fb_access_token: refreshToken,
				image: profile.profileUrl,
			}, function(err, user) {
				if (err) return done(err)
				return done(null, user)
			})
		})
	}))


}
