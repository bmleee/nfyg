chr// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import { restrictedNames } from './project'
import QnAModel from './qna'

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
		"shortTitle": {type: String, required: false},
		"imgSrc": {type: String, required: true},
		"address": {type: String, required: true},
		"city": {type: String, required: true},
		"genre": {type: String, required: true},
		"dateFrom": {type: String, required: true},
		"dateTo": {type: String, required: true},
		"exhibitionName": {type: String, required: true, unique: true},
		"created_at": {type: Date, default: Date.now()},
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
	}],
	numQnAs: {type: Number, default: 0},
});

ExhibitionSchema.pre('update', function (next) {
	// this.numQnAs = this.qnas.length
	next()
})

// Configure the 'ExhibitionSchema' to use getters and virtuals when transforming to JSON
ExhibitionSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

ExhibitionSchema.methods.toFormat = async function (type) {
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
				dateFrom: this.abstract.dateFrom,
				dateTo: this.abstract.dateTo,

				address: this.abstract.address,
				city: this.abstract.city,
				genre: this.abstract.genre,

				link: `/exhibitions/${this.abstract.exhibitionName}`, // TODO: change linkToExhibition to link
			}
		case 'exhibitions':
			return {
				imgSrc: this.abstract.imgSrc,
				title: this.abstract.longTitle,
				state: date2exhibitionState(this.abstract.dateFrom, this.abstract.dateTo),
				city: this.abstract.city,
				genre: this.abstract.genre,
				creator: {
					name: this.creator.creatorName,
					iconSrc: this.creator.creatorImgSrc,
				},
				schedule: date2schedule(this.abstract.dateFrom, this.abstract.dateTo),
				location: this.abstract.address,
				link: `/exhibitions/${this.abstract.exhibitionName}`
			}
		case 'exhibition_detail':
			return {
				heading: {
					imgSrc: this.abstract.imgSrc,
					logoSrc: this.creator.creatorImgSrc,
					title: this.abstract.longTitle,
					exhibitionName: this.abstract.exhibitionName,
					remainingDays: date2remainingDays(this.abstract.dateTo),
					// TODO: get data frmo node-tracker
					recent3Users: [
						"10153932539601313",
			      "10153932539601313",
			      "10153932539601313"
					],
					"numSupporters": 102,
					location: this.abstract.address,
					schedule: date2schedule(this.abstract.dateFrom, this.abstract.dateTo),
				},
				overview: {
					part1: this.overview.part1,
					part2: this.overview.part2
				},
				recommendedExhibitions: this.recommends,
				artworks: this.artworks,
				qna: {
					posts: await Promise.all(this.qnas.map(async (q) => await q.toFormat('exhibition_detail')))
				}
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
		this.numQnAs = Array.from(new Set(qnas)).length
		return await this.save()
	} catch (e) {
		console.error(e);
		throw e
	}
}


// Create the 'User' model out of the 'ExhibitionSchema'
const ExhibitionModel = mongoose.model('Exhibition', ExhibitionSchema);
export default ExhibitionModel

//
// Helper functions
//
function date2schedule(from, to) {
	const f = (t) => new Date(t).toDateString()
	from = f(from).split(' ')
	to = f(to).split(' ')

	return `${from.slice(1, 3).join(' ')}-${to.slice(1, 3).join(' ')}, ${to[3]}`
}

function date2exhibitionState(from, to) {
	from = new Date(from).getTime()
	to = new Date(to).getTime()
	let t = new Date().getTime()

	return t <= from ? 'preparing' :
		t <= to ? 'in_progress' :
		'preparing'
}

function date2remainingDays(to) {
	let t = new Date()
	to = new Date(to)
	return Math.floor((to - t) / 1000 / 60 / 60 / 24)
}
