'use strict';

import mongoose from 'mongoose'

import UserModel from '../models/user'

import * as renderUser from './renderUser'

export default function isLoggedIn(req, res, next) {
	if (!req.session.user) {
		return res.status(400).json({
			user: renderUser.authorizedUser(req.session.user),
			error: new Error('user nog logged in')
		})
	} else {
		return next()
	}
}
