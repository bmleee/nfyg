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

router.delete('/:id', async (req, res) => {
  try {
    let purchase = await PurchaseModel.findOne({_id: req.params.id})
      .populate('user project product')
      
    if(!purchase) throw Error(`Unknown purchase id ${req.params.id}`)
    
    const r = await purchase.cancelByUser()
    res.json({ response: r })
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e.message })
  }
})

export default router;
