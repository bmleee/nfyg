import express from 'express';

import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import ProductModel from '../../models/product'
import PurchaseModel from '../../models/purchase'

import isLoggedIn from '../../lib/login-check'
import {canEdit} from '../../lib/auth-check'
import Mailer from '../../lib/Mailer'

import IMP from '../../lib/iamport'

import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'
import * as ac from '../../lib/auth-check'

const router = express.Router();

router.get('/:id/summary', isLoggedIn, async (req, res) => {
  try {
    let user = req.user
    let purchase = await PurchaseModel.findById(req.params.id)
      .populate('user project product store')
    if (!purchase) throw Error(`unknown purchase ${req.params.id}`)

    if (!ac.canEdit(user, purchase)) throw Error(`can't access unauthorized purchase`)

    res.json({
      user: renderUser.authorizedUser(user),
      data: {
        purchase_summary: await purchase.toFormat('summary'),
      }
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
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
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:id/store', isLoggedIn, async (req, res) => {
  try {
    let purchase = await PurchaseModel.findOne({_id: req.params.id})
      .populate('user project product store')
      
    console.log('purchase.purchase_info.imp_uid', purchase.purchase_info.imp_uid)
    
    if(!purchase) throw Error(`Unknown purchase id ${req.params.id}`)
    if(!ac.canEdit(req.user, purchase)) throw Error(`can't delete unauthorized purchase`)
    
    try {
      let response = await IMP.payment.cancel({
        imp_uid : purchase.purchase_info.imp_uid
      })
      console.log('response', response)
      res.json({ response: response })
    } catch(e) {
      console.error(e.message)
    }
    
    await Mailer.sendStorePurchaseCancelMail(purchase)
    let r2 = await purchase.remove()
    
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
})

router.put('/:id/address', isLoggedIn,  async (req, res) => {
	// console.log('POST /auth/fetch/products');
	try {
		let purchase = await PurchaseModel.findOne({_id: req.params.id})
      .populate('user project product')

    if(!purchase) throw Error(`Unknown purchase id ${req.params.id}`)
    if(!ac.canEdit(req.user, purchase)) throw Error(`can't delete unauthorized purchase`)
    
    const body = req.body
    
    // console.log('bodyadddreeesss', body)
    // console.log('purchasessssss', purchase)
    
    // let p = purchase.project || purchase.product
    // await Mailer.sendAddressChangeMail(p.abstract.shortTitle, purchase.address.addressee_name, purchase.result_description)
    
		const r = await PurchaseModel.update(
		  { '_id': purchase._id },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:id/payment', isLoggedIn,  async (req, res) => {
	// console.log('POST /auth/fetch/products');
	try {
		let purchase = await PurchaseModel.findOne({_id: req.params.id})
      .populate('user project product')
    

    if(!purchase) throw Error(`Unknown purchase id ${req.params.id}`)
    if(!ac.canEdit(req.user, purchase)) throw Error(`can't delete unauthorized purchase`)
    
    const body = req.body
    
    // console.log('product', p)
    // console.log('purchasessssss', purchase)

		const r = await PurchaseModel.update(
		  { '_id': purchase._id },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:id/state', isLoggedIn,  async (req, res) => {
	try {
		let purchase = await PurchaseModel.findOne({_id: req.params.id})
      .populate('user project product')

    if(!purchase) throw Error(`Unknown purchase id ${req.params.id}`)
    
    const body = req.body
    
		const r = await PurchaseModel.update(
		  { '_id': purchase._id },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})


export default router;
