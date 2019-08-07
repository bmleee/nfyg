import mongoose from 'mongoose'
import axios from 'axios'
import md5 from 'md5'

import IMP from '../lib/iamport'
import Mailer from '../lib/Mailer'
import SMS from '../lib/SMS'

import Iamport from 'iamport'
import config from '~/iamport.config.js'

import { randomNumber } from '../lib/utils'

import { sendAlimtalk_schedule, sendAlimtalk_success, sendAlimtalk_fail, sendAlimtalk_cancel, sendAlimtalk_complete } from '~/src/react/api/AppAPI'

const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
  user_info: {
    name: { type: String, required: false },
    display_name: { type: String, required: false },
    local_email: { type: String, required: false },
    id: { type: String, required: true },
    fb_id: { type: String,},
    image: { type: String, required: false },
  },
  address: {
    addressee_name: { type: String, required: false },
    addressee_number: { type: String, required: false },
    zipcode: { type: String, required: false },
  	address1: { type: String, required: false },
  	address2: { type: String, required: false },
  	real_email: { type: String, required: false },
  },
  payment: {
    card_name: { type: String, required: false },
    card_number: { type: String, required: false},
    expiry: { type: String, required: false},
    birth: { type: String, required: false},
    pwd_2digit: { type: String, required: false},
  },
  reward: {
    title: {type: String, required: false},
    description: {type: String, required: false},
    isDirectSupport: {type: Boolean, required: false},
    thresholdMoney: {type: Number, required: false},
  },
  new_reward: [{
    title: {type: String, required: false},
    description: {type: String, required: false},
    isDirectSupport: {type: Boolean, required: false},
    thresholdMoney: {type: Number, required: false},
    purchaseAmount: {type: Number, required: false},
  }],
  result_price: {type: Number, required: false},
  result_description: {type: String, required: false},
  purchaseAmount: {type: Number, required: false},
  shippingFee: {type: Number, required: false},
  shippingDay: {type: String, required: false},
  comment: {type: String, required: false},

  purchase_info: { // TODO: add additional purchase information here. eg, shipping, ...
    purchase_state: {
      type: String,
      enum: ['preparing', 'scheduled', 'cancel-by-user', 'cancel-by-api', 'cancel-by-system', 'purchased', 'refunded-by-user', 'refunded-by-system', 'preparing2', 'failed', 'failed2', 'shipping'],
      default: 'preparing',
    },
    merchant_uid: { type: String, },
    customer_uid: { type: String, },
    imp_uid: { type: String },
    amount: { type: Number,  },
    schedule_at: { type: Number,  },
  },
  created_at: { type: String },
	updated_at: { type: Date, default: Date.now() },
	invoice_number: {type: String, required: false},
});

PurchaseSchema.pre('validate', function (next) {
	if (this.project || this.product || this.store) next()
	else {
		next(Error('One of project, product, store field is reuqired!'))
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
    
    if(!this.store) {
      
      let user_id = this.user._id || this.user
      let p = this.project || this.product
      let pName = p.abstract.projectName || p.abstract.productName
      
      let payment_id = this.payment.card_number
      this.purchase_info.merchant_uid = `${pName}_${md5(`${user_id}_${randomNumber(10000)}_${Date.now()}`)}`
      this.purchase_info.customer_uid = `${pName}_${md5(`${payment_id}_${randomNumber(10000)}_${Date.now()}`)}`
      this.purchase_info.amount = this.result_price + this.shippingFee
      
      switch (this.purchase_info.purchase_state) {
        case 'preparing':
          await Mailer.sendPurchaseResultMail(this)
          await sendAlimtalk_schedule(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, p.funding.dateTo, this.shippingDay)
      }
      
    }
    else {
      this.purchase_info.amount = this.result_price + this.shippingFee
      
      this.purchase_info.purchase_state = 'scheduled'
      await Mailer.sendStorePurchaseMail(this)
      await sendAlimtalk_complete(this.address.addressee_number, this.address.addressee_name, this.store.abstract.title, this.store.storeShippingCycle.shipping_array.toString())
    }
    
    await next()
  } catch (e) {
    console.error('purchase-model-create-error', e);
    throw e
  }
})

PurchaseSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})

PurchaseSchema.methods.toFormat = async function (type, ...args) {
  let purchase_description = ''
  if(!this.reward.title) {
  purchase_description = this.result_description
  }
  else {
  purchase_description = this.reward.title
  }
  
  let purchase_thresholdMoney = ''
  if(!this.reward.thresholdMoney) {
  purchase_thresholdMoney = this.result_price
  }
  else {
  purchase_thresholdMoney = this.reward.thresholdMoney
  }
  
  switch (type) {
      case 'project_detail':
      case 'product_detail':
        return {
          fbId: this.user_info.fb_id,
          image: this.user_info.image,
          name: this.user_info.display_name,
          email: this.user_info.local_email,
          realemail: this.real_email,
          money: this.purchase_info.amount,
          support_at: this.purchase_info.schedule_at * 1000,
        }
      case 'profile':
        return {
          _id: this._id,
          store: this.store && this.store.abstract,
          project: this.project && this.project.abstract,
          product: this.product && this.product.abstract,
          store_info: this.store && this.store.storeInfo,
          project_funding: this.project && this.project.funding,
          product_funding: this.product && this.product.funding,
          address: this.address,
          purchase_info: this.purchase_info,
          user: this.user_info,
          reward: this.reward,
          purchaseAmount: this.purchaseAmount,
          shippingFee: this.shippingFee,
          shippingDay: this.shippingDay,
          comment: this.comment,
          result_description: purchase_description,
          result_price: purchase_thresholdMoney,
          new_reward : this.new_reward,
          invoice_number : this.invoice_number,
          created_at: this.created_at,
        }
      case 'summary':
        return {
          _id: this._id,
          project: this.project && this.project,
          product: this.product && this.product,
          store: this.store && this.store,
          payment: {
            card_name: this.payment.card_name,
            card_number: this.payment.card_number,
            expiry: this.payment.expiry,
          },
          address: this.address,
          purchase_info: this.purchase_info,
          user: this.user_info,
          reward: this.reward,
          purchaseAmount: this.purchaseAmount,
          shippingFee: this.shippingFee,
          shippingDay: this.shippingDay,
          comment: this.comment,
          created_at: this.created_at,
          result_description: purchase_description,
          result_price: this.result_price,
          new_reward : this.new_reward,
          invoice_number: this.invoice_number
        }
    default:
      console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
      return ''
  }
}

PurchaseSchema.methods.processPurchase = async function () {
  try {
    // 기존 예약 결제 취소
    // console.log(`Post ${this._id}`)
    // console.log(this.purchase_info)
    /*
    try {
      const cancel_result = await IMP.subscribe.unschedule({
        customer_uid: this.purchase_info.customer_uid,
        merchant_uid: this.purchase_info.merchant_uid,
      })

      console.log(`Post ${this._id} cancel result: `, cancel_result)
    } catch (e) {}
    
    */

    let user_id = this.user._id || this.user
    let payment_id = this.payment.card_number
    let p = this.project || this.product
    let pName = p.abstract.projectName || p.abstract.productName

    this.purchase_info.merchant_uid = this.purchase_info.merchant_uid.slice(0, 28)
    
    //this.purchase_info.schedule_at = Date.now() / 1000 + 30
    
    let address_sum = `${this.address.address1}${this.address.address2}`
    let purchase_email = !this.address.real_email ? this.user_info.local_email : this.address.real_email
    
    let purchase_description = ''
    if(!this.reward.description) {
    purchase_description = this.result_description
    }
    else {
    purchase_description = this.reward.description
    }
    
    // 15초 후 결제 실행
    /* IMP.subscribe.schedule({
      customer_uid: this.purchase_info.customer_uid,
      // customer_uid: this._id,
      // customer_uid: this.user,
      // checking_amount: 0,
      card_number: this.payment.card_number,
      expiry: this.payment.expiry,
      birth: this.payment.birth,
      pwd_2digit: this.payment.pwd_2digit,
      schedules: [
        {
          merchant_uid: this.purchase_info.merchant_uid,
          schedule_at: this.purchase_info.schedule_at,
          amount: this.purchase_info.amount,
          name: this.reward.description,
          buyer_name: this.address.addressee_name,
          buyer_email: this.user_info.local_email,
          buyer_addr: address_sum,
          buyer_tel: this.address.addressee_number,
          buyer_postcode: this.address.zipcode,
        }
      ],
    }) */
    
    try {
      if(this.payment.pwd_2digit == '') {
          let {
            code,
            message,
            response,
            fail_reason,
          } = await IMP.subscribe.again({
            customer_uid: this.user_info.id + '-' + this.payment.card_number + '-7Pictures',
            pwd_2digit: this.payment.pwd_2digit,
            merchant_uid: this.purchase_info.merchant_uid,
            amount: this.purchase_info.amount,
            name: purchase_description,
            buyer_name: this.address.addressee_name,
            buyer_email: purchase_email,
            buyer_addr: address_sum,
            buyer_tel: this.address.addressee_number,
            buyer_postcode: this.address.zipcode,
          })
          if(fail_reason == null){
            this.purchase_info.purchase_state = 'scheduled'
            this.payment.birth = ''
            this.payment.pwd_2digit = ''
            await Mailer.sendPurchaseSuccessMail(this)
            await sendAlimtalk_success(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, this.shippingDay)
          }
          else {
            this.purchase_info.purchase_state = 'failed'
            await Mailer.sendPurchaseFailedMail(this, fail_reason)
            await sendAlimtalk_fail(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, fail_reason)
          }
        }
      else {
          let {
            code,
            message,
            response,
            fail_reason,
          } = await IMP.subscribe.onetime({
            card_number: this.payment.card_number,
            expiry: this.payment.expiry,
            birth: this.payment.birth,
            pwd_2digit: this.payment.pwd_2digit,
            merchant_uid: this.purchase_info.merchant_uid,
            amount: this.purchase_info.amount,
            name: purchase_description,
            buyer_name: this.address.addressee_name,
            buyer_email: purchase_email,
            buyer_addr: address_sum,
            buyer_tel: this.address.addressee_number,
            buyer_postcode: this.address.zipcode,
          })
          if(fail_reason == null){
            this.purchase_info.purchase_state = 'scheduled'
            this.payment.birth = ''
            this.payment.pwd_2digit = ''
            await Mailer.sendPurchaseSuccessMail(this)
            await sendAlimtalk_success(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, this.shippingDay)
          }
          else {
            this.purchase_info.purchase_state = 'failed'
            await Mailer.sendPurchaseFailedMail(this, fail_reason)
            await sendAlimtalk_fail(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, fail_reason)
        }
      }
      
    }  catch (e) {
      this.purchase_info.purchase_state = 'failed'
      await Mailer.sendPurchaseFailedMail(this, e.message)
      await sendAlimtalk_fail(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, e.message)
      console.error('e', e);
      console.error('e.message', e.message);
    } 
    // this.purchase_info.purchase_state = 'scheduled' // 스케줄 결제용!!
    await this.save()
    return this.toFormat('profile')
  } catch (e) {
    let p = this.project || this.product
    this.purchase_info.purchase_state = 'failed'
    await Mailer.sendPurchaseFailedMail(this, e.message)
    await sendAlimtalk_fail(this.address.addressee_number, this.address.addressee_name, p.abstract.shortTitle, e.message)
    console.error(`Purchase ${this._id} processPurchase failed`);
    console.error(e);
  }
}

PurchaseSchema.methods.cancelByUser = async function () {

  switch (this.purchase_info.purchase_state) {
      case 'scheduled':
        try {
          IMP.subscribe.unschedule({
            customer_uid: this.purchase_info.customer_uid,
            merchant_uid: this.purchase_info.merchant_uid,
          })
        } catch (e) {
          // console.error(`Purchase ${this._id} cancelByUser failed`);
          // console.error(e);
          // throw e;
        }
      case 'preparing':
          this.purchase_info.purchase_state = 'cancel-by-user'
          await Mailer.sendPurchaseFailureMail(this, 'User cancelled purchase')
          await sendAlimtalk_cancel(this.address.addressee_number, this.address.addressee_name, this.product.abstract.shortTitle)
          
          break;

      case 'cancel-by-user':
      case 'cancel-by-api':
      case 'cancel-by-system':
        throw `Purchase ${this._id} is already cancelled : ${this.purchase_info.purchase_state}`

      default:
        console.log(`Post ${this._id} cancel purchase request on state ${this.purchase_info.purchase_state}`)
    }

    return await this.save()

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
PurchaseSchema.statics.findByUserAndProduct = function (user, product) {
	return this.find({ user }).find({ product }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findByUserAndProject = function (user, project) {
	return this.find({ user }).find({ project }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findDetailByUser = function (user) {
	return this.find({ user: user._id || user || user.local_email || user.fb_email }).populate('project product').sort({ updated_at: -1})
}
PurchaseSchema.statics.findDetailByUserAndStore = function (user) {
	return this.find({ user: user._id || user || user.local_email || user.fb_email }).populate('store')
}
PurchaseSchema.statics.findByProject = function (project) {
	return this.find({ project }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findByProduct = function (product) {
	return this.find({ product }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findByStore = function (store) {
	return this.find({ store }).sort({ updated_at: -1})
}
PurchaseSchema.statics.findOneByMerchantId = function (mid) {
	return this.findOne({ 'purchase_info.merchant_uid': mid })
}
PurchaseSchema.statics.countValidPurchase = function ({ product, project, }) {
  let q =  product ? { product } : { project }
	return this.count(q)
    .where('purchase_info.purchase_state').in(['preparing', 'scheduled', 'failed', 'shipping'])
}
PurchaseSchema.statics.countDirectMoney = function (amount) {
	return this.count('purchase_info.amount')
    .where('purchase_info.purchase_state').in(['preparing', 'scheduled', 'failed', 'shipping'])
}

// Create the 'User' model out of the 'PurchaseSchema'
const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);
export default PurchaseModel
