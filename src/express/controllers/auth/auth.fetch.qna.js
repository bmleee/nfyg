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

router.post('/:qna_id/comment', isLoggedIn, async (req, res) => {
  let user = req.session.user
  let {
    qna_id
  } = req.params
  let {
    text
  } = req.body

  try {
    let comment = await mh.createCommentOnQnA({_id: qna_id, text, user})
    res.json({ response: comment })
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e })
  }
})

export default router;
