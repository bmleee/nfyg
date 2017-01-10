import mongoose from 'mongoose'
import axios from 'axios'
import md5 from 'md5'

import IMP from '../lib/iamport'

const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  user_info: {
    nick_name: { type: String, required: true },
    fb_id: { type: String, required: true },
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


// Configure the 'PurchaseSchema' to use getters and virtuals when transforming to JSON
PurchaseSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

PurchaseSchema.pre('save', async function (next) {
  console.log('purchase pre save hoocker!');
  try {
    // assign purchase info
    let p = this.project || this.product
    let pName = p.abstract.projectName || p.abstract.productName
    // 미술소품 -> 30초 후 결제, 프로젝트 -> 해당 시간에 결제
    let schedule_at = this.project ? new Date(this.project.funding.dateTo ).getTime() / 1000 // msec to sec
      : Date.now() / 1000 + 30 // after 30 sec

    this.purchase_info.merchant_uid = `${pName}_${md5(`${this.user}_${Date.now()}`)}`
    this.purchase_info.customer_uid = this.user
    this.purchase_info.amount = this.reward.thresholdMoney * this.purchaseAmount + this.shippingFee
    this.purchase_info.schedule_at = schedule_at

    // validate card info
    let {
      card_name,
    } = await IMP.subscribe_customer.create({
      customer_uid: this.purchase_info.customer_uid,
      card_number: this.payment.card_number,
      expiry: this.payment.expiry,
      birth: this.payment.birth,
      pwd_2digit: this.payment.pwd_2digit,
    })

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
          // schedule_at: this.purchase_info.schedule_at, // TODO: activate!
          schedule_at: Date.now() / 1000 + 60, // after 1 min
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
          name: this.user_info.nick_name,
          money: this.purchase_info.amount,
          support_at: this.purchase_info.schedule_at * 1000,
        }
    default:
      console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
      return ''
  }
}

PurchaseSchema.statics.findByUser = function (user) {
	return this.find({ user }).sort({ updated_at: -1})
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