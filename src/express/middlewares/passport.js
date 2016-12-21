// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
import LocalStrategy from '../lib/passport.local'

import mongoose from 'mongoose'
import User from '../models/user'

// Define the Passport configuration method
export default function(passport) {
	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user, done) {
		console.log('serializeUser.user', user);
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		console.log('deserializeUser.id', id);
		User.findOne({
			id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	// Load Passport's strategies configuration files
	LocalStrategy(passport);

};

export function localAuthenticate(req, res) {
	return passport.authenticate('local', function (err, user, info) {
		console.log('err', err);
		console.log('user', user);
		console.log('info', info);

		if (err || !user) {
			console.error('localAuthenticate fails', err, info)
			return
		}
		req.user = user
		return
	})(req, res)

}
