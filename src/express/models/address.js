// Load the module dependencies
import mongoose from 'mongoose'

import UserModel from './user'

const Schema = mongoose.Schema;

// Define a new 'AddressSchema'
const AddressSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	title: { type: String, default: '배송지' },
	zipcode: { type: String, required: true },
	address1: { type: String, required: true },
	address2: { type: String, required: true },
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
