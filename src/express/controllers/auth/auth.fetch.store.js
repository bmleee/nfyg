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

import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import ProductModel from '../../models/product'
import PostModel from '../../models/post'
import QnAModel from '../../models/qna'
import SponsorModel from '../../models/sponsor'
import AddressModel from '../../models/address'
import PurchaseModel from '../../models/purchase'
import PaymentModel from '../../models/payment'
import LikeModel from '../../models/like'
import StoreModel from '../../models/store'

import Mailer from '../../lib/Mailer'

import * as mh from '../../lib/modelHelper'

import * as ac from '../../lib/auth-check'
import isLoggedIn from '../../lib/login-check'
import * as renderHelper from '../../lib/renderHelper'
import * as renderUser from '../../lib/renderUser'

import IMP from '../../lib/iamport'
import md5 from 'md5'
import { randomNumber } from '../../lib/utils'

const router = express.Router();


router.get('/:storeLink', async (req, res, next) => {
	const {
		storeLink
	} = req.params;

	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		const store = await StoreModel.findOne({"abstract.storeLink": storeLink})

		if (!store) throw new Error(`no such product in name of ${storeLink}`)

		const canEdit = ac.canEdit(user, store)
		const storeToRender = await store.toFormat('item_detail', user, canEdit)

		res.status(200).json({
			user: renderUser.authorizedUser(req.user),
			data: {
				store: storeToRender,
				store_summary: await store.toFormat('item_detail')
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/:storeLink/edit/:tab?', isLoggedIn, async (req, res) => {

	try {
		const { storeLink } = req.params
		const { user } = req
		const store = await StoreModel.findOneByLink(storeLink)
		
		if (!ac.canEdit(user, store)) throw Error(`접근 권한이 없습니다.`)

		res.json({
			user: renderUser.authorizedUser(user),
			data: {
				store: await store.toFormat('edit'),
				userType: user.getUserType(),
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({
			user: renderUser.authorizedUser(req.user),
			error: e.message
		})
	}
})

router.get('/:storeLink/item/:itemLink', async (req, res, next) => {
	const {
		storeLink,
		itemLink
	} = req.params;

	let user = req.user
	if (user) {
		user = await UserModel.findOne({_id: user._id})
	}

	try {
		const store = await StoreModel.findOne({"abstract.storeLink": storeLink})
		if (!store) throw new Error(`no such product in name of ${storeLink}`)
		const canEdit = ac.canEdit(user, store)
		const storeToRender = await store.toFormat('item_detail', user, canEdit)

		res.status(200).json({
			user: renderUser.authorizedUser(req.user),
			data: {
				store: storeToRender,
				itemLink,
				store_summary: await store.toFormat('item_detail')
			}
		})
	} catch (e) {
		console.error(e);
		res.json({error: e.message})
	}
})

router.get('/:storeLink/summary', isLoggedIn, async (req, res) => {
	try {
		let [
			user,
			store
		] = await Promise.all([
			UserModel.findById(req.user._id),
			StoreModel.findOne({'abstract.storeLink': req.params.storeLink })
		])

		if (!ac.canEdit(user, store)) throw Error(`can't access`)

		res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				userType: user.getUserType(),
				store_summary: await store.toFormat('summary')
			}
		})
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e })
	}
})

router.get('/:storeLink/purchase', isLoggedIn, async (req, res) => {
	try {
		let store = await StoreModel.findOneByLink(req.params.storeLink)
		return res.json({
			user: renderUser.authorizedUser(req.user),
			data: {
				abstract: store.abstract,
				items: store.items,
				storeInfo: store.storeInfo,
				storeShippingCycle: store.storeShippingCycle,
				message_fail: req.flash('fail')
			}
		})
	} catch(e) {
		return res.status(500).json({
			user: renderUser.authorizedUser(req.user),
			data: {
				message_fail: req.flash('fail')
			}
		})
	}
})

router.post('/:storeLink/purchase', isLoggedIn, async (req, res) => {
	let user = req.user
	let storeLink = req.params.storeLink
	let {
		addressIndex,
		itemIndex,
		paymentIndex,
		shippingFee,
		seleted_items,
		result_price,
		result_description,
	}  = req.body

	let store = await StoreModel.findOne({'abstract.storeLink': storeLink})
	let address = (await AddressModel.findByUser(user))[addressIndex]
	let payment = (await PaymentModel.findByUser(user))[paymentIndex]
	
	let purchase_email = !address.real_email ? user.local_email : address.real_email
	let address_sum = `${address.address1}${address.address2}`
	let merchant_uid = `${storeLink}_${md5(`${user._id}_${randomNumber(10000)}_${Date.now()}`)}`
	let amount = shippingFee + result_price
	
	let now = new Date();
    let now_hours = now.getHours()+9;
    let now_date = now_hours > 24 ? (now.getDate() + 1) : now.getDate();
	
	try {	
        let {
          code,
          message,
          response,
          fail_reason,
          imp_uid,
          } = await IMP.subscribe.again({
            customer_uid: user.id + '-' + payment.card_number + '-7Pictures',
            merchant_uid: merchant_uid,
            amount: amount,
            name: result_description,
            buyer_name: address.addressee_name,
            buyer_email: purchase_email,
            buyer_addr: address_sum,
            buyer_tel: address.addressee_number,
            buyer_postcode: address.zipcode,
          })
          
	    	if(fail_reason == null){
	    		let purchase = await PurchaseModel.create({
					user,
					user_info: user,
					purchase_info: {
						customer_uid: user.id + '-' + payment.card_number + '-7Pictures', 
						merchant_uid,
						imp_uid
					},
					store,
					address: address.toJSON(),
					payment: payment.toJSON(),
					seleted_items,
					new_reward: seleted_items,
					shippingFee,
					result_price,
					result_description,
					created_at: (now.getMonth()+1) + "월 " + now_date + "일 - " + now_hours + "시:" + now.getMinutes() + "분"
				})
				res.json({
					response: purchase
				})
	    	}
	    	else {
	    		req.flash('fail', fail_reason);
	    		res.status(500).json({ response: fail_reason })
	        }
	}
	catch(e) {
		req.flash('fail', e.message);
		res.status(500).json({ response: e.message })
	}
})


router.get('/:storeLink/like', async (req, res) => {
	console.log('req.params.storeLink!!!', req.params.storeLink)
		
	if(req.user) {
		let [
			user,
			store
		] = await Promise.all([
			UserModel.findById(req.user._id),
			StoreModel.findOne({'abstract.storeLink': req.params.storeLink })
		])
		
		let like_user = await LikeModel.findByUserAndStore(user, store)
		let like_store = await LikeModel.findByStore(store)
		
		res.json({
			data: {
				like_store,
				like_user : like_user[0]
			}
		})
	} else {
		let [
			store
		] = await Promise.all([
			StoreModel.findOne({'abstract.storeLink': req.params.storeLink })
		])
		
		let like_store = await LikeModel.findByStore(store)
		
		res.json({
			data: {
				like_store
			}
		})
	}
	
})
router.post('/:storeLink/like', isLoggedIn, async (req, res) => {
	let user = req.user
	let storeLink = req.params.storeLink
	let {
		like_state
	}  = req.body
	
	try {
		let store = await StoreModel.findOne({'abstract.storeLink': storeLink})
		let like = await LikeModel.create({
			user,
			user_info: user,
			store,
			like_state
		})
		res.json({
			response: like
		})
	}
	catch (error) {
		console.error('like create error!', error);
		res.state(400).json({
			error
		})
	}
})

router.delete('/:storeLink/like/:id', isLoggedIn, async (req, res) => {
	try {
	let user = req.user
	let like = await LikeModel.findById(req.params.id)

	if(!ac.canEdit(user, like)) throw new Error(`User ${user.id} can't remove like ${like._id}`)

	let r = await like.remove()

	res.json({ response: !!r })

	} catch (e) {
		console.error('like deleto error!!', e);
		res.status(500).json({ error: e })
	}
})


router.post('/', isLoggedIn,  async (req, res) => {
	console.log('POST /auth/fetch/store');
	
	try {
		let user = req.user

		// if (!ac.isAdmin(user) && !ac.isStore(user) ) throw Error(`접근 권한이 없습니다.`)
		if (!req.user) throw Error(`접근 권한이 없습니다.`)
		
		const body = req.body

		const store = await StoreModel.create(body)
		res.json({ response: true })
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:storeLink', isLoggedIn,  async (req, res) => {
	try {
		let user = req.user
		const storeLink = req.params.storeLink
		const store = await StoreModel.findOneByLink(storeLink)
		if (!ac.canEdit(req.user, store)) throw Error(`can't edit unauthorized product`)
		
		const body = req.body
		const r = await StoreModel.update(
			{ 'abstract.storeLink': storeLink },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.put('/:storeLink/purchase/validcount', isLoggedIn,  async (req, res) => {
	try {
		const body = req.body
		const storeLink = req.params.storeLink
		const store = await StoreModel.findOneByLink(storeLink)

		const r = await StoreModel.update(
			{ 'abstract.storeLink': storeLink },
			body
		)
		res.json({response: r.n === 1})
	} catch (e) {
		console.error(e);
		res.status(500).json({ response: e })
	}
})

router.post('/:storeLink/qnas', isLoggedIn, async (req, res) => {
	try {
		let user = req.user
		let storeLink = req.params.storeLink
		let store = await StoreModel.findOne({'abstract.storeLink': storeLink})
		let {
			title,
			text
		} = req.body
    
	    let body = {
	      author: {
	        name: user.display_name,
	        iconSrc: user.image,
	        user: user._id
	      },
	      abstract: {
	        title : store.abstract.title + ' 문의(' + title + ')',
	        likes: [],
	        created_at: Date.now()
	      },
	      text,
	      comments: [],
	      user,
	      user_info: user,
	      store_admin : store.authorizedUsers
	    }
	    
		let qna = await QnAModel.create(body)
		await Mailer.sendQnAMail(store.abstract.title, text, store.storeInfo.storeEmail)
		res.json({ response: qna.toFormat('profile')})
		
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: e.message
		})
	}
})

router.get('/*', (req, res) => {
	res.json({
		user: renderUser.authorizedUser(req.user),
	})
})


export default router;
