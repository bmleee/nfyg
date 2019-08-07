'use strict';

import mongoose from 'mongoose'

import UserModel from '../models/user'

import * as renderUser from './renderUser'

export default function isLoggedIn(req, res, next) {
	req.session.returnTo = req.url;
	if (!req.user) {
		return res.status(500).json({
			user: renderUser.authorizedUser(req.user),
			error: new Error('user nog logged in')
		})
	}
	else {
		return next()
	}
	
}
