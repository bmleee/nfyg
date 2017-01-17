// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import QnAModel from './qna'
import PostModel from './post'
import PurchaseModel from './purchase'

const Schema = mongoose.Schema;

export const restrictedNames = ['overview', 'post', 'ranking', 'abstract', 'artworks', 'qna', 'edit', 'new']

// Define a new 'ProductSchema'
const ProductSchema = new Schema({
	abstract: {
		longTitle: {type: String, required: true},
		shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: true},
		category: {type: String, required: true}, // refers to react/constants/selectOptions
		productName: {type: String, required: true, unique: true, validate: [
			function(productName) {
				return !restrictedNames.includes(productName);
			}, `product name can't be one of ${restrictedNames}`
		]},
		state: {type: String, required: true},     // refers to react/constants/selectOptions
		postIntro: {type: String, required: true},
		created_at: {type: Date, default: Date.now()}
	},

	creator: {
		creatorName: {type: String, required: true},
		creatorImgSrc: {type: String, required: true},
		creatorLocation: {type: String, required: true},
		creatorDescription: {type: String, required: true},
	},

	authorizedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],

	// sponsor: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Sponsor'
	// },

	// Funding
	funding: {
		currentMoney: {type: Number, required: true},   // 직접 / 간접 후원에 의해 추가됨
		targetMoney: {type: Number, required: true},
		dateFrom: {type: String, required: true}, // 작성 시작 일
		dateTo: {type: String, required: true}, // 바로 다음날
		shippingFee: {type: Number, default: 0},
		minPurchaseVolume: {type: Number, required: true}, // 최소 주문 수량
		maxPurchaseVolume: {type: Number, required: true}, // 최대 주문 수량
		rewards: [
			{
				title: {type: String, required: true},
				description: {type: String, required: true},
				isDirectSupport: {type: Boolean, required: true},
				thresholdMoney: {type: Number, required: true},
			}
		],
		faqs: [
			{
				question: {type: String, required: true},
				answer: {type: String, required: true},
			}
		]
	},

	// Overview
	overview: {
		intro: {type: String},
		part1: {
			raw: {type: String, required: true},
			html: {type: String, required: true},
		},
		part2: {
			raw: {type: String, required: true},
			html: {type: String, required: true},
		},
	},

	// addede wehen
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}],
	numPosts: {type: Number, default: 0},

	qnas: [{
		type: Schema.Types.ObjectId,
		ref: 'QnA'
	}],
	numQnAs: {type: Number, default: 0},

});

// ProductSchema.post('update', function (next) {
// 	// console.log(this);
// 	// this.numPosts = this.posts.length
// 	// this.numQnAs = this.qnas.length
// 	next()
// })

// Configure the 'ProductSchema' to use getters and virtuals when transforming to JSON
ProductSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// find helper
ProductSchema.statics.findOneByName = function (name) {
	return this.findOne({'abstract.productName': name})
}

ProductSchema.methods.toFormat = async function (type, ...args) {

	// console.log(`Product.toFormat(type: ${type}, args: ${args})`, this);

	try {

		switch (type) {
			case 'home':
				switch (this.abstract.state) {

					case 'preparing':
						return {
							imgSrc: this.abstract.imgSrc,
							title: this.abstract.shortTitle,
							descriptions: [
								"거리의 수많은 동물들, ",
				        "Urban beast들을 담은 사진집을 출간합니다."
							],
							creator: {
								name: this.creator.creatorName,
								iconSrc: this.creator.creatorImgSrc,
							},
							link: `/products/${this.abstract.productName}`,
						}

					case 'completed':
						return {
							imgSrc: this.abstract.imgSrc,
							title: this.abstract.shortTitle,
							creator: {
								name: this.creator.creatorName,
								iconSrc: this.creator.creatorImgSrc,
							},
							targetMoney: this.funding.targetMoney,
							currentMoney: this.funding.currentMoney,
							numDirectSupports: await PurchaseModel.count({product: this}),
							numIndirectSupports: Math.floor(Math.random() * 300), // TODO: from IndirectSupport
							link: `/products/${this.abstract.productName}`,
						}

					case 'in-progress':
					default:
						return {
							imgSrc: this.abstract.imgSrc,
							creator: this.creator.creatorName,
							title: this.abstract.shortTitle,
							targetMoney: this.funding.targetMoney,
							currentMoney: this.funding.currentMoney,
							numDirectSupports: await PurchaseModel.count({product: this}),
							numIndirectSupports: Math.floor(Math.random() * 300), // TODO: from IndirectSupport
							remainingDays: ( new Date(this.funding.dateTo).getTime() - new Date(this.funding.dateFrom).getTime() ) / 1000 / 60 / 60 / 24,
							link: `/products/${this.abstract.productName}`,
							postIntro: this.abstract.postIntro,
						}

				} // end of switch abstract state

			case 'product_detail':
				let user = args[0];
				let posts = this.posts.map(p => p.toFormat('product_detail', user))
				let qnas = this.qnas.map(q => q.toFormat('product_detail'))
				return {
					abstract: this.abstract,
					creator: this.creator,
					funding: this.funding,
					overview: {
						intro: this.overview.intro,
						part1: this.overview.part1.html,
						part2: this.overview.part2.html,
					},
					post: {
						heading: {
							iconSrc: this.creator.creatorImgSrc,
							description: this.abstract.postIntro,
							intro: this.abstract.postIntro,
						},
						posts,
					},
					qna: {
						posts: qnas,
					},
					// TODO: async fetch data!
					ranking: {
						recent3DirectSupporters: [
							"10153932539601313",
							"10153932539601313",
							"10153932539601313"
						],
						recent3IndirectSupporters: [
							"10153932539601313",
							"10153932539601313",
							"10153932539601313"
						]
					},
					directSupporters: await Promise.all((await PurchaseModel.findByProject(this)).map(async (_) => await _.toFormat('product_detail'))),
					indirectSupporters: [
						{
			        "fbId": "10153932539601313",
			        "name": "전희재",
			        "money": 3400,
			        "support_at": 1476254937224,
			        "message": "본격 '목욕'문화 잡지라.... 안에 내용부터, 공연까지 심상치 않은 프로젝트입니다-",
			        "likes": 1,
			        "comments": 20,
			        "shares": 3,
			        "rank": 2
			      },
					],
				}

			case 'edit':
				return {
					abstract: this.abstract,
					creator: this.creator,
					funding: this.funding,
					overview: this.overview,
				}

			default:
				console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
				return ''
		}

	} catch (e) {
		console.error(e);
	} finally {

	}
}

ProductSchema.methods.pushPost = async function (post_id) {
	try {
		let posts = this.posts || []

		if (post_id instanceof Array) {
			posts.concat(post_id)
		} else {
			posts.push(post_id)
		}

		this.posts = Array.from(new Set(posts))
		this.numPosts = Array.from(new Set(posts)).length
		return await this.save()
	} catch (e) {
		console.error(e);
		throw e
	}
}

ProductSchema.methods.pushQnA = async function (_id) {
	try {
		let qnas = this.qnas || []

		if (_id instanceof Array) {
			qnas.concat(_id)
		} else {
			qnas.push(_id)
		}
			this.qnas = Array.from(new Set(qnas))
			this.numQnAs = Array.from(new Set(qnas)).length
			return await this.save()
	} catch (e) {
		console.error(e);
		throw e
	}
}

ProductSchema.methods.authorizedTo = function (user) {
	return !!this.authorizedUsers.filter( _id => user.equals(user))
}



const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel
