// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies

// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const User = require('../models/user');
import { Strategy as LocalStrategy } from 'passport-local'

import mongoose from 'mongoose'
import User from '../models/user'


// Create the Local strategy configuration method
export default function(passport) {
	// Use the Passport's Local strategy
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		User.findOne({
			email: email
		}, function(err, user) {
			// If an error occurs continue to the next middleware
			console.error(err, user)
			if (err) {
				return done(err);
			}

			// If a user was not found, continue to the next middleware with an error message
			if (!user) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}

			// If the passport is incorrect, continue to the next middleware with an error message
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}

			// Otherwise, continue to the next middleware with the user object
			return done(null, user);
		});
	}));
};
