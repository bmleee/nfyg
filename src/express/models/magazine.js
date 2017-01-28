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
export const categories = SelectOptions.MagazineCategory.map(x => x.value)
// export const categories = [
// 	{ "value": 'culture space', "label": "문화 공간" },
// 	{ "value": 'exhibition / museum', "label": "전시 / 미술관" },
// 	{ "value": 'art content', "label": "예술 컨텐츠" },
// 	{ "value": 'art infomation', "label": "예술 정보" },
// 	{ "value": 'purchase / collection', "label": "구매 및 소장" },
// 	{ "value": 'purchase', "label": "구매" },
// ].map(x => x.value)

// Define a new 'MagazineSchema'
const MagazineSchema = new Schema({
	no: {type: Number, required: true, unique: true},

	abstract: {
		longTitle: {type: String, required: true},
		// shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: true},
		description: {type: String, required: true},
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
		created_at: {type: Date, default: Date.now()},
	},

	creator: {
		creatorName: {type: String, required: true},
		creatorImgSrc: {type: String, required: true},
		// creatorLocation: {type: String, required: true},
		// creatorDescription: {type: String, required: true},
	},

	content: {
		raw: {type: String, required: true},
		html: {type: String, required: true},
	},

	// Contents
	relatedContents: [{
		title: {type: String, required: true},
		imgSrc: {type: String, required: true},
		link: {type: String, required: true},
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
				link: `/magazines/${this.abstract.magazineName}`
			}
		case 'magazine_detail':
			let [
				next,
				pre
			] = await Promise.all([
				this.getNextMagazine(),
				this.getPreviousMagazine()
			])

			console.log('next', (next && next.no) || -1);
			console.log('this', this.no || -1);
			console.log('pre', (pre && pre.no) || -1);

			return {
				magazine: {
					title: this.abstract.longTitle,
					creator: {
						name: this.creator.creatorName,
						iconSrc: this.creator.creatorImgSrc
					},
					imgSrc: this.abstract.imgSrc,
					descriptions: this.abstract.description.split('\n'),
					descriptions: [ // TODO: MagazineEditor should upload this field
						"관객과 작품으로 소통하기 위해서",
		        "누구나 알고 있는 자연을 작품의 소재로 선택하고,",
		        "나만의 색과 기법을 통해 작품에 감성을 담아낸다."
					],
					content: this.content.html || '',
				},
				relatedContents: this.relatedContents || [],
				next: next && next.abstract,
				pre: pre && pre.abstract,
			}

		case 'edit':
			return {
				abstract: this.abstract,
				creator: this.creator,
				content: this.content,
				relatedContents: this.relatedContents || [],
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
