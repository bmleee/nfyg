// Load the module dependencies
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

// Define a new 'SponsorSchema'
var SponsorSchema = new Schema({

	sponsorName: {type: String, required: true, unique: true},

	displayName: {type: String, required: true, unique: true},

	description: {type: String, required: true},

	imgSrc: {type: String, required: true, default: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/7pictures_후원기업.jpg?fit=1004%2C378&ssl=1'},

	logoSrc: {type: String, required: true, default: 'http://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg2/flowerwall3.jpg'},

	money: {type: Number, required: true},

	contacts: {
		facebook: {type: String},
		blog: {type: String},
		homepage: {type: String},
	}
});



// Configure the 'SponsorSchema' to use getters and virtuals when transforming to JSON
SponsorSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'SponsorSchema'
module.exports = mongoose.model('Sponsor', SponsorSchema);
