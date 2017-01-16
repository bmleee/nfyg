/**
 * should res.json
 * {
		 user: {
			 isLoggedIn: false,
			 isAuthorized: true, // can see this page?
		 },
		 data: {...}
   }
 */

import express from 'express';

// import cache from '../../lib/cache'

import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import ProductModel from '../../models/product'
import PostModel from '../../models/post'
import QnAModel from '../../models/qna'

import * as mh from '../../lib/modelHelper'

import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

const router = express.Router();

router.post('/:_id/comment', isLoggedIn, async (req, res) => {
  try {
    let user = req.session.user
    let _id = req.params._id
    let text = req.body.text

    let qna = await QnAModel.findById(_id)
    let comment = await qna.commentedByUser(user, text)
    res.json({ response: comment })

  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message })
  }
})

export default router;
