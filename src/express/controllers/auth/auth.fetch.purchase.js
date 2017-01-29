import express from 'express';

import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import ProductModel from '../../models/product'
import PurchaseModel from '../../models/purchase'

import isLoggedIn from '../../lib/login-check'
import {canEdit} from '../../lib/auth-check'

import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'
import * as ac from '../../lib/auth-check'

const router = express.Router();

router.get('/:id/summary', isLoggedIn, async (req, res) => {
  try {
    let user = req.user
    let purchase = await PurchaseModel.findById(req.params.id)
      .populate('user project product')
    if (!purchase) throw Error(`unknown purchase ${req.params.id}`)

    if (!ac.canEdit(user, purchase)) throw Error(`can't access unauthorized purchase`)

    res.json({
      user: renderUser.authorizedUser(user),
      data: {
        purchase_summary: await purchase.toFormat('summary'),
      }
    })
  } catch (e) {

  } finally {

  }

})

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    let purchase = await PurchaseModel.findOne({_id: req.params.id})
      .populate('user project product')

    if(!purchase) throw Error(`Unknown purchase id ${req.params.id}`)
    if(!ac.canEdit(req.user, purchase)) throw Error(`can't delete unauthorized purchase`)

    const r = await purchase.cancelByUser()
    res.json({ response: r })
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e.message })
  }
})

export default router;
