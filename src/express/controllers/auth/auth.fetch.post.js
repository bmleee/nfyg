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

import isLoggedIn from '../../lib/login-check'
import {canEdit} from '../../lib/auth-check'

import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'
import * as ac from '../../lib/auth-check'

const router = express.Router();

router.post('/:_id/comment', isLoggedIn, async (req, res) => {
  // create comment on post
  try {
    let user = req.user
    let text = req.body.text

    let post = await PostModel.findById(req.params._id)
    let comment = await post.commentedByUser(user, text)

    console.log('new comment', comment);
    res.json({ response: comment })
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:_id', isLoggedIn, async (req, res) => {
  try {
    let user = req.user

    let post = await PostModel.findById(req.params._id).populate("project product")
    if (!post) throw Error('No post found')

    if (!ac.canEdit(user, post.project || post.product)) throw Error(`Can't delete unauthorized post`)

    let r = await PostModel.remove({_id: post._id})

    res.json({ response: r })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:_id/comment/:comment_index', isLoggedIn, async (req, res) => {
  try {
    let user = req.user

    let post = await PostModel.findById(req.params._id).populate("project product")
    if (!post) throw Error('No post found')

    let comment = post.comments[req.params.comment_index]
    if (!ac.canEditComment(user, post.product || post.project, comment)) throw Error(`Can't delete unauthorized post comment`)

    post.comments.pop(req.params.comment_index)

    let r = await post.save()

    res.json({ response: r })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})


export default router;
