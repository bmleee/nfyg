// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import { restrictedNames } from './project'
export {
	restrictedNames
}

const Schema = mongoose.Schema;

// from ~/src/react/constants
export const categories = [
	{ value: 'life-style', label: '라이프 스타일' },
	{ value: 'beauty', label: '뷰티' },
	{ value: 'health', label: '건강' },
	{ value: 'culture', label: '문화' },
].map(x => x.value)

// Define a new 'MagazineSchema'
const MagazineSchema = new Schema({
	abstract: {
		longTitle: {type: String, required: true},
		shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: true},
		category: {type: String, required: true, validate: [
			function (category) {
				return categories.includes(category)
			}, `magazine category is not valid category. must be one of ${categories}`
		]}, // refers to react/constants/selectOptions
		magazineName: {type: String, required: true, unique: true, validate: [
			function (magazineName) {
				return !restrictedNames.includes(magazineName)
			}, `magazine name can't be one of ${restrictedNames}`
		]},
	},

	creator: {
		creatorName: {type: String, required: true},
		creatorImgSrc: {type: String, required: true},
		creatorLocation: {type: String, required: true},
		creatorDescription: {type: String, required: true},
	},

	content: {type: String, required: true},

	recommendedExhibitions: [{
		imgSrc: {type: String, required: true},
		title: {type: String, required: true},
		description: {type: String, required: true},
		link: {type: String, required: true},
	}],

	recommendedMagazines: [{
		imgSrc: {type: String, required: true},
		title: {type: String, required: true},
		description: {type: String, required: true},
		link: {type: String, required: true},
	}],

});

// Configure the 'MagazineSchema' to use getters and virtuals when transforming to JSON
MagazineSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

MagazineSchema.methods.toFormat = function (type) {
	switch (type) {
		case 'home':
			return {
				imgSrc: this.abstract.imgSrc,
				title: this.abstract.shortTitle,
				descriptions: [],
				categories: [this.abstract.category], // TODO: categories? category
				creator: {
					name: this.creator.creatorName,
					iconSrc: this.creator.creatorImgSrc,
				},
				link: `/magazines/${this.abstract.magazineName}`,
			}
		default:
			return ''
	}

}


// Create the 'User' model out of the 'MagazineSchema'
const MagazineModel = mongoose.model('Magazine', MagazineSchema);
export default MagazineModel
