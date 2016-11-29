// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
	mongoose = require('mongoose');

// Define the Passport configuration method
module.exports = function() {
	// Load the 'User' model
	// var User = mongoose.model('User');
	var User = require('../models/user')
	
	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		User.findOne({
			id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	// Load Passport's strategies configuration files
	require('../lib/passport_local.js')();
};