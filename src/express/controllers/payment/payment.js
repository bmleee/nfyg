import express from 'express';
import IMP from '../../lib/iamport'

const router = express.Router();

// subscribe/payments/schedules
let customer_uid = 'customer1234'
let merchant_uids = () => (['your_merchant_uid3_' + Date.now(), 'your_merchant_uid4_' + Date.now()])

let checking_amount = 1004
let schedules = [
	{
		"merchant_uid": merchant_uids()[0],
		"schedule_at": new Date().getTime() + 1000 * 60 * 2,
		"amount": 1004
	},
	{
		"merchant_uid": merchant_uids()[1],
		"schedule_at": new Date().getTime() + 1000 * 60 * 60 * 24 * 3,
		"amount": 1004
	}
]

// subscribe/payments/unsubscribe


// subscribe/customers/{customer-uid}
let card_number = '4214-2000-1125-7680'
let expiry = '2018-08'
let birth = '921011'
let pwd_2digit = '16'

router.get('/get-billing-key', async (req, res) => {
	try {
		let {
			updated,
			card_name,
		} = await IMP.subscribe_customer.create({
			customer_uid,
			card_number,
			expiry,
			birth,
			pwd_2digit
		})

		console.log({updated, card_name});

		// let billing_key[customer_uid] = r.updated

		res.json({
			response: {updated, card_name}
		})
	} catch (error) {
		console.error(error);
		res.json({error})
	}
})

router.get('/schedule', async (req, res) => {
	try {
		let r = await IMP.subscribe.schedule({
			customer_uid,
			checking_amount,
			card_number,
			expiry,
			birth,
			pwd_2digit,
			schedules
		})

		res.json({
			response: r
		})
	} catch (error) {
		console.error(error);
		res.json({error})
	}
})

router.get('/unschedule', async (req, res) => {
	try {
		let r = await IMP.subscribe.unschedule({
			customer_uid,
			// merchant_uid // cancle all
		})

		res.json({
			response: r
		})
	} catch (error) {
		console.error(error);
		res.json({error})
	}
})

export default router;
