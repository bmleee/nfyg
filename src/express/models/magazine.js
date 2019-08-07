// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import { restrictedNames } from './project'
import { SelectOptions } from '~/src/react/constants'


export {
	restrictedNames
}

const Schema = mongoose.Schema;

// from ~/src/react/constants
// export const categories = SelectOptions.MagazineCategory.map(x => x.value)
export const categories = [
	{ "value": 'culture space', "label": "매거진" },
	{ "value": 'exhibition / museum', "label": "전시" },
].map(x => x.value)

// Define a new 'MagazineSchema'
const MagazineSchema = new Schema({
	no: {type: Number, required: false, unique: true},

	abstract: {
		longTitle: {type: String, required: false},
		// shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: false},
		description: {type: String, required: false},
		category: {type: String, required: false}, // refers to react/constants/selectOptions
		magazineName: {type: String, required: true, unique: true, validate: [
			function (magazineName) {
				return !restrictedNames.includes(magazineName)
			}, `magazine name can't be one of ${restrictedNames}`
		]},
		created_at: {type: Date, default: Date.now()},
	},

	creator: {
		creatorName: {type: String, required: false},
		creatorImgSrc: {type: String, required: false},
		// creatorLocation: {type: String, required: true},
		// creatorDescription: {type: String, required: true},
	},

	content: {
		raw: {type: String, required: false},
		html: {type: String, required: false},
	},
	
	headingSlider: [{
		imgSrc: {type: String, required: false}
	}],
	
	artworks: [{
		artist: {type: String, required: false},
		title: {type: String, required: false},
		year: {type: String, required: false},
		price: {type: Number, required: false},
		imgSrc: {type: String, required: false}
	}],

	// Contents
	relatedContents: [{
		title: {type: String, required: false},
		imgSrc: {type: String, required: false},
		link: {type: String, required: false},
	}]

});

// Configure the 'MagazineSchema' to use getters and virtuals when transforming to JSON
MagazineSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

MagazineSchema.methods.toFormat = async function (type) {
	switch (type) {
		case 'home':
			return {
				imgSrc: this.abstract.imgSrc,
				title: this.abstract.longTitle,
				descriptions: [],
				categories: [this.abstract.category], // TODO: categories? category
				creator: {
					name: this.creator.creatorName,
					iconSrc: this.creator.creatorImgSrc,
				},
				link: `/magazines/${this.abstract.magazineName}`,
				abstract: this.abstract,
			}
		case 'magazines':
			return {
				title: this.abstract.longTitle,
				creator: {
					name: this.creator.creatorName,
					iconSrc: this.creator.creatorImgSrc
				},
				imgSrc: this.abstract.imgSrc,
				category: this.abstract.category,
				description: this.abstract.description,
				link: `/magazines/${this.abstract.magazineName}`,
				abstract: this.abstract,
			}
		case 'magazine_detail':
			let [
				next,
				pre
			] = await Promise.all([
				this.getNextMagazine(),
				this.getPreviousMagazine()
			])

			// console.log('next', (next && next.no) || -1);
			// console.log('this', this.no || -1);
			// console.log('pre', (pre && pre.no) || -1);

			return {
				magazine: {
					title: this.abstract.longTitle,
					creator: {
						name: this.creator.creatorName,
						iconSrc: this.creator.creatorImgSrc
					},
					imgSrc: this.abstract.imgSrc,
					descriptions: this.abstract.description.split('\n'),
					content: this.content.html,
					contentraw: this.content.raw,
				},
				Linktitle: this.abstract.longTitle,
				LinkimgSrc: this.abstract.imgSrc,
				description: this.abstract.description,
				headingSlider: this.headingSlider || [],
				artworks: this.artworks || [],
				relatedContents: this.relatedContents || [],
				next: next && next.abstract,
				pre: pre && pre.abstract,
				abstract: this.abstract,
			}

		case 'edit':
			return {
				abstract: this.abstract,
				creator: this.creator,
				content: this.content,
				headingSlider: this.headingSlider,
				artworks: this.artworks,
				relatedContents: this.relatedContents,
			}

		case 'search_result':
			return this.abstract

		default:
			console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
			return ''
	}

}

MagazineSchema.statics.findOneByName = function (name) {
	return this.findOne({'abstract.magazineName': name})
}

MagazineSchema.methods.getNextMagazine = async function() {
	return await MagazineModel.findOne({ no: { $gt: this.no } }).sort({ no: 1 }).limit(1)
}

MagazineSchema.methods.getPreviousMagazine = async function() {
	return  await MagazineModel.findOne({ no: { $lt: this.no } }).sort({ no: -1 }).limit(1)
}

MagazineSchema.plugin(autoIncrement.plugin, { model: 'Magazine', field: 'no' });

// Create the 'User' model out of the 'MagazineSchema'
const MagazineModel = mongoose.model('Magazine', MagazineSchema);
export default MagazineModel
