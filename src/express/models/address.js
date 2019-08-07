// Load the module dependencies
import mongoose from 'mongoose'

import UserModel from './user'

const Schema = mongoose.Schema;

// Define a new 'AddressSchema'
const AddressSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: false},
	title: { type: String, default: '배송지' },
	addressee_name: { type: String, required: false, }, // 수취인 이름
	addressee_number: { type: String, required: false, },
	real_email: { type: String, required: false, },
	zipcode: { type: String, required: false },
	address1: { type: String, required: false },
	address2: { type: String, required: false },
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() },
});

// Configure the 'AddressSchema' to use getters and virtuals when transforming to JSON
AddressSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

AddressSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})

AddressSchema.statics.findByUser = function (user) {
	return this.find({ user }).sort({ updated_at: -1})
}


// Create the 'User' model out of the 'AddressSchema'
const AddressModel = mongoose.model('Address', AddressSchema);
export default AddressModel
