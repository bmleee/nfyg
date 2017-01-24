import mongoose from 'mongoose'
import axios from 'axios'
import md5 from 'md5'

import IMP from '../lib/iamport'
import Mailer from '../lib/Mailer'

import Iamport from 'iamport'
import config from '~/iamport.config.js'

import { randomNumber } from '../lib/utils'

const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  user_info: {
    name: { type: String, required: true },
    display_name: { type: String, required: true },
    id: { type: String, required: true },
    fb_id: { type: String,},
    image: { type: String, required: true },
  },
  address: {
    addressee_name: { type: String, required: true },
    zipcode: { type: String, required: true },
  	address1: { type: String, required: true },
  	address2: { type: String, required: true },
  },
  payment: {
    card_name: { type: String, required: true },
    card_number: { type: String, required: true},
    expiry: { type: String, required: true},
    birth: { type: String, required: true},
    pwd_2digit: { type: String, required: true},
  },
  reward: {
    title: {type: String, required: true},
    description: {type: String, required: true},
    isDirectSupport: {type: Boolean, required: true},
    thresholdMoney: {type: Number, required: true},
  },
  purchaseAmount: {type: Number, required: true},
  shippingFee: {type: Number, required: true},

  purchase_info: { // TODO: add additional purchase information here. eg, shipping, ...
    purchase_state: {
      type: String,
      enum: ['preparing', 'scheduled', 'cancel-by-user', 'cancel-by-api', 'cancel-by-system', 'purchased', 'refunded-by-user', 'refunded-by-system'],
      default: 'preparing',
    },
    merchant_uid: { type: String, }, // TODO: unique - true
    customer_uid: { type: String, },
    amount: { type: Number,  },
    schedule_at: { type: Number,  },
  },
  created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() },
});

PurchaseSchema.pre('validate', function (next) {
	if (this.project || this.product) next()
	else {
		next(Error('One of project, product field is reuqired!'))
	}
})

PurchaseSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})



// Configure the 'PurchaseSchema' to use getters and virtuals when transforming to JSON
PurchaseSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

PurchaseSchema.pre('save', async function (next) {
  // console.log('purchase pre save hoocker!');
  try {
    let user_id = this.user._id || this.user

    // assign purchase info
    let p = this.project || this.product
    let pName = p.abstract.projectName || p.abstract.productName
    // 미술소품 -> 30초 후 결제, 프로젝트 -> 해당 시간에 결제
    let schedule_at = new Date(p.funding.dateTo ).getTime() / 1000 + 60 * 60 * 24 * 30 // schedule_at dateTo + 30 days : Don't let it be paid as scheduled date

    this.purchase_info.merchant_uid = `${pName}_${md5(`${user_id}_${randomNumber(10000)}_${Date.now()}`)}`
    this.purchase_info.customer_uid = user_id
    this.purchase_info.amount = this.reward.thresholdMoney * this.purchaseAmount + this.shippingFee
    this.purchase_info.schedule_at = schedule_at

    let {
      code,
      message,
      response, // [ { customer_uid, merchant_uid, schedule_at, amount } ]
    } = await IMP.subscribe.schedule({
      customer_uid: this.purchase_info.customer_uid,
      checking_amount: 0,
      card_number: this.payment.card_number,
      expiry: this.payment.expiry,
      birth: this.payment.birth,
      pwd_2digit: this.payment.pwd_2digit,
      schedules: [
        {
          merchant_uid: this.purchase_info.merchant_uid,
          schedule_at: this.purchase_info.schedule_at, // TODO: activate!
          // schedule_at: Date.now() / 1000 + 60, // after 1 min
          amount: this.purchase_info.amount,
        }
      ]
    })
    await next()
  } catch (e) {
    console.error(e);
    next(Error(e))
  }
})

PurchaseSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})

PurchaseSchema.methods.toFormat = async function (type, ...args) {
  switch (type) {
      case 'project_detail':
      case 'product_detail':
        return {
          fbId: this.user_info.fb_id,
          image: this.user_info.image,
          name: this.user_info.display_name,
          money: this.purchase_info.amount,
          support_at: this.purchase_info.schedule_at * 1000,
        }
      case 'profile':
        return {
          _id: this._id,
          project: this.project && this.project.abstract,
          product: this.product && this.product.abstract,
          address: this.address,
          purchase_info: this.purchase_info,
          user: this.user_info,
          reward: this.reward,
          purchaseAmount: this.purchaseAmount,
          shippingFee: this.shippingFee
        }
    default:
      console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
      return ''
  }
}

PurchaseSchema.methods.processPurchase = async function () {
  try {
    // 기존 예약 결제 취소
    IMP.subscribe.unschedule({
      customer_uid: this.purchase_info.customer_uid,
      merchant_uid: this.purchase_info.merchant_uid,
    })

    let user_id = this.user._id || this.user

    let p = this.project || this.product
    let pName = p.abstract.projectName || p.abstract.productName

    this.purchase_info.merchant_uid = `${pName}_${md5(`${user_id}_${randomNumber(10000)}_${Date.now()}`)}`
    this.purchase_info.amount = this.reward.thresholdMoney * this.purchaseAmount + this.shippingFee
    this.purchase_info.schedule_at = Date.now() / 1000 + 15

    // 15초 후 결제 실행
    IMP.subscribe.schedule({
      customer_uid: this.purchase_info.customer_uid,
      checking_amount: 0,
      card_number: this.payment.card_number,
      expiry: this.payment.expiry,
      birth: this.payment.birth,
      pwd_2digit: this.payment.pwd_2digit,
      schedules: [
        {
          merchant_uid: this.purchase_info.merchant_uid,
          schedule_at: this.purchase_info.schedule_at, // TODO: activate!
          amount: this.purchase_info.amount,
        }
      ],
    })

    this.purchase_info.purchase_state = 'scheduled'
    return await this.save()
  } catch (e) {
    console.error(`Purchase ${this._id} processPurchase failed`);
    console.error(e);
    throw e
  }
}

PurchaseSchema.methods.cancelByUser = async function () {
  try {
    IMP.subscribe.unschedule({
      customer_uid: this.purchase_info.customer_uid,
      merchant_uid: this.purchase_info.merchant_uid,
    })

    this.purchase_info.purchase_state = 'cancel-by-user'
    await Mailer.sendPurchaseFailureMail(this, 'User cancelled purchase')
    return await this.save()
  } catch (e) {
    console.error(`Purchase ${this._id} cancelByUser failed`);
    console.error(e);
  }
}

PurchaseSchema.methods.cancelByApi = async function (error_msg) {
  try {
    this.purchase_info.purchase_state = 'cancel-by-api'
    console.log(`User ${this.user.id} purcahse cancelled by api : ${error_msg}`);
    await Mailer.sendPurchaseFailureMail(this, error_msg)
    return await this.save()
  } catch (e) {
    console.error(`Purchase ${this._id} Api failed`);
    console.error(e);
  }
}

PurchaseSchema.statics.findByUser = function (user) {
	return this.find({ user }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findDetailByUser = function (user) {
	return this.find({ user }).populate('project product').sort({ updated_at: -1})
}
PurchaseSchema.statics.findByProject = function (project) {
	return this.find({ project }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findByProduct = function (product) {
	return this.find({ product }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findOneByMerchantId = function (mid) {
	return this.findOne({ 'purchase_info.merchant_uid': mid })
}

// Create the 'User' model out of the 'PurchaseSchema'
const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);
export default PurchaseModel
