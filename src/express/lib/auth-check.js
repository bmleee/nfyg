'use strict';

import mongoose from 'mongoose'
import UserModel from '../models/user'
import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import MagazineModel from '../models/magazine'
import PostModel from '../models/post'
import QnAModel from '../models/qna'
import SponsorModel from '../models/sponsor'
import PurchaseModel from '../models/purchase'
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
	if (!user) return false
	if (isAdmin(user)) return true

	if (target instanceof PostModel ||
		target instanceof QnAModel) {
		return target.author.user.equals(user._id || user)
	}

	if (target instanceof ProjectModel ||
		target instanceof ProductModel) {
		return isEditor(user) || (isArtist(user) && target.authorizedTo(user))
	}

	if (target instanceof MagazineModel) {
		return isEditor(user)
	}

	if(target instanceof PurchaseModel) {
		return isEditor(user) || target.user.equals(user._id || user)
	}

	throw Error(`can't accept target`)
}

export function canEditComment(user, target, comment) {
	console.log('canEditComment.comment.author.user', comment.author.user);
	console.log('canEditComment.user', user);
	return canEdit(user, target) || comment.author.user.equals(user._id)
}

// SEE middlewares/passport
// Define the Passport configuration method
export default function(passport) {
	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user, done) {
		// console.log('serializeUser.user', user);
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		// console.log('deserializeUser.id', id);
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
		// console.log('err', err);
		// console.log('user', user);
		// console.log('info', info);

		if (err || !user) {
			console.error('localAuthenticate fails', err, info)
			return
		}
		req.user = user
		return
	})(req, res)

}
