import mongoose from 'mongoose'
import IMP from '../lib/iamport'

import UserModel from './user'
import axios from 'axios'

const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  card_name: { type: String },
  card_number: { type: String },
  expiry: { type: String },
  birth: { type: String },
  pwd_2digit: { type: String },
  created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() },
	// error_msg: { type: String, required: false},
});

// Configure the 'PaymentSchema' to use getters and virtuals when transforming to JSON
PaymentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

PaymentSchema.pre('save', async function (next) {
  if (this.card_name) return next()
  
  // console.log('this.user._id', this.user._id)
  
  // console.log('this.user', this.user)

  try {
    let {
      card_name,
    } = await IMP.subscribe_customer.create({
      customer_uid: this.user.id + '-' + this.card_number.substring(15, 19) + '-7Pictures',
      card_number: this.card_number,
      expiry: this.expiry,
      birth: this.birth,
      pwd_2digit: this.pwd_2digit,
    })

    this.card_name = card_name
    next()
  } catch (e) {
    console.error(`faild to create payment User${this.user._id}`);
    console.error(e);
    // let error_msg : e.message
    throw e
  }
})

PaymentSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})

PaymentSchema.statics.findByUser = function (user) {
	return this.find({ user }).sort({ updated_at: -1})
}

// Create the 'User' model out of the 'PaymentSchema'
const PaymentModel = mongoose.model('Payment', PaymentSchema);
export default PaymentModel
