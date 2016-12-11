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

// Define a new 'ExhibitionSchema'
const ExhibitionSchema = new Schema({
	"abstract": {
		"longTitle": {type: String, required: true},
		"shortTitle": {type: String, required: true},
		"imgSrc": {type: String, required: true},
		"location": {type: String, required: true, default: '서울'},
		"dateFrom": {type: String, required: true},
		"dateTo": {type: String, required: true},
		"exhibitionName": {type: String, required: true, unique: true},
	},
	"creator": {
			"creatorName": {type: String, required: true},
			"creatorImgSrc": {type: String, required: true},
			"creatorLocation": {type: String, required: true, default: '서울'},
			"creatorDescription": {type: String, required: true},
	},
	"overview": {
			"part1": {type: String, required: true},
			"part2": {type: String, required: true},
	},
	"artworks": [{
			"imgSrc": {type: String, required: true},
			"width": {type: Number, required: true},
			"height": {type: Number, required: true},
			"title": {type: String, required: true},
			"description": {type: String, required: true},
			"price": {type: Number, required: true},
			"soldOut": {type: Boolean, default: false},
	}],
	"recommends": [{
		"imgSrc": {type: String, required: true},
		"title": {type: String, required: true},
		"description": {type: String, required: true},
	}],
	qnas: [{
		type: Schema.Types.ObjectId,
		ref: 'QnA',
	}]
});

// Configure the 'ExhibitionSchema' to use getters and virtuals when transforming to JSON
ExhibitionSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

ExhibitionSchema.methods.toFormat = function (type) {
	switch (type) {
		case 'home':
			return {
				imgSrc: this.abstract.imgSrc,
				title: this.abstract.shortTitle,
				creator: {
					name: this.creator.creatorName,
					iconSrc: this.creator.creatorImgSrc,
				},
				schedule: `${this.abstract.dateFrom} ~ ${this.abstract.dateTo}`,
				location: this.abstract.location,
				linkToExhibition: `/exhibitions/${this.abstract.exhibitionName}`, // TODO: change linkToExhibition to link
			}
		default:
			return ''
	}

}

ExhibitionSchema.methods.pushQnA = async function (_id) {
	try {
		let qnas = this.qnas || []
		qnas.push(_id)
		this.qnas = Array.from(new Set(qnas))
		return await this.save()
	} catch (e) {
		console.error(e);
		throw e
	}
}


// Create the 'User' model out of the 'ExhibitionSchema'
const ExhibitionModel = mongoose.model('Exhibition', ExhibitionSchema);
export default ExhibitionModel
