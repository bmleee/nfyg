// Load the module dependencies
import mongoose from 'mongoose'

import pick from 'lodash.pick'

const Schema = mongoose.Schema;

// Define a new 'SponsorSchema'
var SponsorSchema = new Schema({

	sponsorName: {type: String, required: true, unique: true},

	displayName: {type: String, required: true, unique: true},

	description: {type: String, required: true},

	imgSrc: {type: String, required: true, default: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/7pictures_후원기업.jpg?fit=1004%2C378&ssl=1'},

	logoSrc: {type: String, required: true, default: 'http://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg2/flowerwall3.jpg'},

	money: {type: Number, required: true},

	created_at: {type: Date, default: Date.now()},
	updated_at: {type: Date, default: Date.now()},

	contacts: {
		facebook: {type: String},
		blog: {type: String},
		homepage: {type: String},
	}
});

SponsorSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})
SponsorSchema.pre('save', function (next) {
	this.updated_at = Date.now()
	next()
})


// Configure the 'SponsorSchema' to use getters and virtuals when transforming to JSON
SponsorSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

SponsorSchema.statics.findByName = function (name) {
	return this.findOne({'sponsorName': name})
}

SponsorSchema.methods.toFormat = async function (type, ...args) {
	switch (type) {
		case 'sponsors':
			return this.toJSON()
		case 'profile_admin':
			return pick(this.toJSON(), ['sponsorName', 'displayName', 'money', 'created_at'])
		default:
			{}
	}
}

// Create the 'User' model out of the 'SponsorSchema'
module.exports = mongoose.model('Sponsor', SponsorSchema);
