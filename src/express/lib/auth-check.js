'use strict';

import mongoose from 'mongoose'
import UserModel from '../models/user'
import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import PostModel from '../models/post'
import QnAModel from '../models/qna'
import SponsorModel from '../models/sponsor'
// import PaymentModel from '../models/payment'

/**
 * check user is admin
 * @param  Object  user  user info stored in session
 * @return Boolean whether user is admin or not
 */
export function isAdmin (user) {
	return user && user.access_level == 100;
}
export function isEditor (user) {
	return user && user.access_level == 10;
}
export function isArtist (user) {
	return user && user.access_level == 1;
}

/**
 * check the user is author of {project, product, qna, }
 * @param  Object  user   user info stored in session
 * @param  Object  target
 * @return {Boolean}        [description]
 */
export function canEdit (user, target) {
	if (isAdmin(user)) return true;

	if (target instanceof PostModel ||
		target instanceof QnAModel) {
		return target.author.user.equals(user._id)
	}

	if (target instanceof ProjectModel ||
		target instanceof ProductModel) {
		return isEditor(user) || (isArtist(user) && target.authorizedTo(user))
	}

	return false
}
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
