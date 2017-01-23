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
import * as ac from '../../lib/auth-check'

const router = express.Router();

router.post('/:_id/comment', isLoggedIn, async (req, res) => {
  try {
    let user = req.user
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

router.delete('/:_id', isLoggedIn, async (req, res) => {
  try {
    let user = req.user

    let qna = await QnAModel.findById(req.params._id).populate("project product")
    if (!qna) throw Error('No qna found')

    if (!ac.canEdit(user, qna.project || qna.product)) throw Error(`Can't delete unauthorized post`)

    let r = await QnAModel.remove({_id: qna._id})

    res.json({ response: r })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:_id/comment/:comment_index', isLoggedIn, async (req, res) => {
  try {
    let user = req.user

    let qna = await QnAModel.findById(req.params._id).populate("project product")
    if (!qna) throw Error('No post found')

    let comment = qna.comments[req.params.comment_index]
    if (!ac.canEditComment(user, qna.product || qna.project, comment)) throw Error(`Can't delete unauthorized post comment`)

    qna.comments.pop(req.params.comment_index)

    let r = await qna.save()

    res.json({ response: r })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})


export default router;
