// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import QnAModel from './qna'
import PostModel from './post'
import PurchaseModel from './purchase'

import LikeModel from './like'
import UserModel from './user'

import FacebookTracker from '../../lib/FacebookTracker'
import * as ac from '../lib/auth-check'

import { sortBy, countBy } from 'lodash'

const Schema = mongoose.Schema;

export const restrictedNames = ['overview', 'post', 'ranking', 'abstract', 'artworks', 'qna', 'edit', 'new']

// Define a new 'ProductSchema'
const ProductSchema = new Schema({
	abstract: {
		longTitle: {type: String, required: true},
		shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: false},
		category: {type: String, required: false}, // refers to react/constants/selectOptions
		sub_category: {type: String, required: false},
		category_array: [{type: String, required: false}],
		special_category: {type: String, required: false},
		productName: {type: String, required: true, unique: true, validate: [
			function(productName) {
				return !restrictedNames.includes(productName);
			}, `product name can't be one of ${restrictedNames}`
		]},
		state: {type: String, required: true},     // refers to react/constants/selectOptions
		postIntro: {type: String, required: false},
		created_at: {type: Date, default: Date.now()},
		updated_at: {type: Date, default: Date.now()},
	},

	creator: {
		creatorName: {type: String, required: false},
		creatorImgSrc: {type: String, required: false},
		creatorLocation: {type: String, required: false},
		creatorDescription: {type: String, required: false},
		creatorEmail: {type: String, required: false},
		creatorEmailCheck: {type: Boolean},
		creatorNumber: {type: String, required: false},
		creatorNumberCheck: {type: Boolean},
	},

	authorizedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	authorizedUser: { type: String, required: false },

	// Funding
	funding: {
		currentMoney: {type: Number, required: false},   // 직접 / 간접 후원에 의해 추가됨
		currentMoney_sub: {type: Number, required: false},
		currentMoney_sub2: {type: Number, required: false, default: 0},
		numValidPurchases_sub: {type: Number, required: false},
		targetMoney: {type: Number, required: false},
		dateFrom: {type: String, required: false}, // 작성 시작 일
		dateTo: {type: String, required: false}, // 바로 다음날
		remainingDays_sub: {type: Number, required: false},
		shippingFee: {type: Number, default: 0},
		shippingCompany: {type: String, required: false, default: 'korex'},
		minPurchaseVolume: {type: Number, required: false}, // 최소 주문 수량
		maxPurchaseVolume: {type: Number, required: false}, // 최대 주문 수량
		etcrewardActive: {type: Boolean, required: false},
		mustrewardActive: {type: Boolean, required: false},
		cancellation: {type: String, required: false}, //환불 및 교환 정책
		rewards: [
			{
				title: {type: String, required: false},
				description: {type: String, required: false},
				imgSrc: {type: String,},
				isDirectSupport: {type: Boolean, required: false},
				thresholdMoney: {type: Number, required: false},
				shippingDay: {type: String, required: false},
				maxPurchaseVolume: {type: Number, required: false},
				vaildcount: {type: Number, required: false, default: 0},
				rewardComment: {type: Boolean, required: false},
			}
		],
		faqs: [
			{
				question: {type: String, required: false},
				answer: {type: String, required: false},
			}
		]
	},

	// Overview
	overview: {
		intro: {type: String},
		part1: {
			raw: {type: String, required: false},
			html: {type: String, required: false},
		},
		part2: {
			raw: {type: String, required: false},
			html: {type: String, required: false},
		},
	},
	overview_new: {type: String, required: false}, 

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
	subValidPurchases: {type: Number, default: 0},
	orderNum: {type: Number, default: 0},
	DirectMoneySum: {type: Number, default: 0},
	
	// Contents
	relatedContents: [{
		title: {type: String, required: false},
		imgSrc: {type: String, required: false},
		link: {type: String, required: false},
	}],
	
	account: {
		accountBank : {type: String, required: false},
		accountNumber : {type: String, required: false},
		accountName : {type: String, required: false}
	}
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

ProductSchema.pre('save', function (next) {
	this.abstract.updated_at = Date.now()
	next()
})

// find helper
ProductSchema.statics.findOneByName = function (name) {
	return this.findOne({'abstract.productName': name})
}
ProductSchema.statics.findAuthorizedOnesToUser = function (user) {
	return this.find({ $or:[ { authorizedUsers: { $in: [user._id || user] } }, { "authorizedUser": user.local_email || user.fb_email } ] })
}
ProductSchema.statics.findByNames = function (names) {
	if (!names) return this.find({'abstract.productName': '______'})

	let re = new RegExp(names.join('|'), "i")
	return this.find({ 'abstract.productName': re})
}

ProductSchema.methods.toFormat = async function (type, ...args) {

	// console.log(`Product.toFormat(type: ${type}, args: ${args})`, this);

	try {
		
		let product_purchase_info = await this.contentgetPurchaseInfo()
		
		var DirectMoneySum = 0;
		 for(var idx in product_purchase_info && product_purchase_info.purchases){
			DirectMoneySum += Number(product_purchase_info && product_purchase_info.purchases[idx].purchase_info.amount);
		}
		
		
		this.funding.currentMoney_sub = DirectMoneySum;
		this.funding.numValidPurchases_sub = await PurchaseModel.countValidPurchase({ product: this })
		this.funding.remainingDays_sub = ((new Date(this.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24 < 0 ? -1 : 1
		await this.save()
		
		/* for(var i in this.funding.rewards) {
			for(var e in product_purchase_info && product_purchase_info.purchases) {
				if(product_purchase_info && product_purchase_info.purchases[e].purchase_info.purchase_state != 'cancel-by-user' && product_purchase_info && product_purchase_info.purchases[e].reward.description == this.funding.rewards[i].description) {
					
					this.funding.rewards[i].vaildcount += Number(product_purchase_info && product_purchase_info.purchases[e].purchaseAmount / 2);
				}
			}
		} */
		
		switch (type) {
			case 'home':
				switch (this.abstract.state) {

					case 'preparing':

						return {
							imgSrc: this.abstract.imgSrc,
							// creator: this.creator.creatorName,
							title: this.abstract.longTitle,
							targetMoney: this.funding.targetMoney,
							// currentMoney: this.funding.currentMoney,
							currentMoney_sub2: this.funding.currentMoney_sub2,
							remainingDays_sub: this.funding.remainingDays_sub,
							numDirectSupports: await PurchaseModel.countValidPurchase({ product: this }),
							remainingDays: ((new Date(this.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24,
							link: `/products/${this.abstract.productName}`,
							postIntro: this.abstract.postIntro,
							// numValidPurchases,
							subValidPurchases: this.subValidPurchases,
							// orderNum: this.orderNum,
							// purchaseSuccess,
							// product_purchase_info,
							DirectMoneySum,
							productName: this.abstract.productName,
							category: this.abstract.category,
							sub_category: this.abstract.sub_category,
							special_category: this.abstract.special_category,
							// funding: this.funding,
							// funding_reward : this.funding.rewards,
						}

					case 'completed':

						return {
							imgSrc: this.abstract.imgSrc,
							// creator: this.creator.creatorName,
							title: this.abstract.longTitle,
							targetMoney: this.funding.targetMoney,
							// currentMoney: this.funding.currentMoney,
							currentMoney_sub2: this.funding.currentMoney_sub2,
							remainingDays_sub: this.funding.remainingDays_sub,
							numDirectSupports: await PurchaseModel.countValidPurchase({ product: this }),
							remainingDays: ((new Date(this.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24,
							link: `/products/${this.abstract.productName}`,
							postIntro: this.abstract.postIntro,
							// numValidPurchases,
							subValidPurchases: this.subValidPurchases,
							// orderNum: this.orderNum,
							// purchaseSuccess,
							// product_purchase_info,
							DirectMoneySum,
							productName: this.abstract.productName,
							category: this.abstract.category,
							sub_category: this.abstract.sub_category,
							special_category: this.abstract.special_category,
							// funding: this.funding,
							// funding_reward : this.funding.rewards,
						}

					case 'in-progress':
					default:
						let numValidPurchases = await PurchaseModel
							.count({ 'product': this })
							.where('purchase_info.purchase_state').in(['preparing', 'scheduled', 'failed'])
						let purchaseSuccess = this.funding.minPurchaseVolume <= numValidPurchases

						return {
							imgSrc: this.abstract.imgSrc,
							// creator: this.creator.creatorName,
							title: this.abstract.longTitle,
							targetMoney: this.funding.targetMoney,
							// currentMoney: this.funding.currentMoney,
							currentMoney_sub2: this.funding.currentMoney_sub2,
							remainingDays_sub: this.funding.remainingDays_sub,
							numDirectSupports: await PurchaseModel.countValidPurchase({ product: this }),
							remainingDays: ((new Date(this.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24,
							link: `/products/${this.abstract.productName}`,
							postIntro: this.abstract.postIntro,
							// numValidPurchases,
							subValidPurchases: this.subValidPurchases,
							// orderNum: this.orderNum,
							// purchaseSuccess,
							// product_purchase_info,
							DirectMoneySum,
							productName: this.abstract.productName,
							category: this.abstract.category,
							sub_category: this.abstract.sub_category,
							special_category: this.abstract.special_category,
							// funding: this.funding,
							// funding_reward : this.funding.rewards,
						}

				} // end of switch abstract state

			case 'product_detail':
				let user = args[0];
				let canEdit = args[1]; // TODO: use this!
				let money = (canEdit || !user) ? 0 :  await user.supportedMoneyOnProduct(this);
				let posts = this.posts.map(p => p.toFormat('product_detail', ac.canEdit(user, this), money))
				let qnas = this.qnas.map(q => q.toFormat('product_detail'))
				
				let comments = [];
				for(var i in qnas){
					if(!qnas[i].product_admin) {
						comments.push(qnas[i]);
					}
				}
				
				let like = await LikeModel.findByUserAndProduct(user, this)
				let like_num = await LikeModel.findByProduct(this)
				
				let athor_user = await UserModel.findOneByEmail(this.authorizedUser)   

				let numValidPurchases = await PurchaseModel.countValidPurchase({ product: this })
				let purchaseSuccess = this.funding.minPurchaseVolume <= numValidPurchases

				return {
					canEdit: canEdit,
					abstract: this.abstract,
					creator: this.creator,
					funding: this.funding,
					overview: {
						intro: this.overview.intro,
						part1: this.overview.part1.html,
						part2: this.overview.part2.html,
					},
					overview_new: this.overview_new,
					post: {
						heading: {
							iconSrc: this.creator.creatorImgSrc,
							description: this.abstract.postIntro,
							intro: this.abstract.postIntro,
						},
						posts,
						recentPost: this.posts[0] && (Date.now() - this.posts[0].abstract.created_at) / 1000 / 60 / 60 / 24 < 1
					},
					qna: {
						posts: comments,
						recentQnA: comments[0] && (Date.now() - comments[0].created_at) / 1000 / 60 / 60 / 24 < 3
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
					relatedContents: this.relatedContents,
					purchaseSuccess,
					numValidPurchases,
					subValidPurchases: this.subValidPurchases,
					product_purchase_info,
					DirectMoneySum,
					// funding_reward : this.funding.rewards,
					like : like[0],
					like_num,
					authorizedUser: this.authorizedUser,
					athor_user
				}

			case 'edit':
				return {
					abstract: this.abstract,
					creator: this.creator,
					funding: this.funding,
					overview: this.overview,
					overview_new: this.overview_new,
					relatedContents: this.relatedContents,
					authorizedUser: this.authorizedUser,
					account: this.account
				}
				
			case 'editor':
				return {
					productName: this.abstract.productName
				}


			case 'profile_admin':
				let _json = this.toJSON()
				return {
					..._json.funding,
					..._json.abstract,
				}

			case 'summary':
			let [
				purchase_info,
				authorizedUsers
			] = await Promise.all([
					this.getPurchaseInfo(),
					Promise.all(this.authorizedUsers.map(async (u) => await u.toFormat('profile_admin')))
			])
			
			// console.log('posts3333', this.posts)

				return {
					abstract: this.abstract,
					creator: this.creator,
					funding: this.funding,
					qnas: this.qnas,
					posts: this.posts,
					authorizedUsers,
					purchase_info,
					account: this.account
			}

			case 'search_result':
				return this.abstract

			default:
				console.error(`Product toFormat can't accept this ${JSON.stringify(type)}`);
				return ''
		}

	} catch (e) {
		console.error(e);
	}
}

ProductSchema.methods.authorizedTo = function (user) {
	return !!this.authorizedUsers.filter( _id => user.equals(user._id))
}

ProductSchema.methods.getPurchaseInfo = async function () {
	let purchases = await PurchaseModel.findByProduct(this)
	purchases = await Promise.all(purchases.map(
		async (p) => await p.toFormat('profile')
	))

	let stat = countBy(purchases.map(p => p.purchase_info), 'purchase_state')

	return {
		stat,
		purchases,
	}
}

ProductSchema.methods.contentgetPurchaseInfo = async function () {
	let purchases = await PurchaseModel.findByProduct(this).where('purchase_info.purchase_state').in(['preparing', 'scheduled', 'failed', 'shipping'])
	purchases = await Promise.all(purchases.map(
		async (p) => await p.toFormat('profile')
	))

	let stat = countBy(purchases.map(p => p.purchase_info), 'purchase_state')

	return {
		stat,
		purchases,
	}
}

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel
