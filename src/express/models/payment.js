import mongoose from 'mongoose'
import IMP from '../lib/iamport'

import UserModel from './user'
import axios from 'axios'

const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  card_name: { type: String, },
  card_number: { type: String, required: true},
  expiry: { type: String, required: true},
  birth: { type: String, required: true},
  pwd_2digit: { type: String, required: true},
  created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() },
});

// Configure the 'PaymentSchema' to use getters and virtuals when transforming to JSON
PaymentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

PaymentSchema.pre('save', async function (next) {
  try {
    let {
      card_name,
    } = await IMP.subscribe_customer.create({
      customer_uid: this.user,
      card_number: this.card_number,
      expiry: this.expiry,
      birth: this.birth,
      pwd_2digit: this.pwd_2digit,
    })

    this.card_name = card_name
    await next()
  } catch (e) {
    console.error(e);
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
