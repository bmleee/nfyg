// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import QnAModel from './qna'
import PostModel from './post'
import PurchaseModel from './purchase'
import LikeModel from './like'

import * as ac from '../lib/auth-check'
import { sortBy, countBy } from 'lodash'

const Schema = mongoose.Schema;

export const restrictedNames = ['overview', 'abstract', 'item', 'edit', 'purchase']

const StoreSchema = new Schema({
	abstract: {
		title: {type: String, required: true},
		description: {type: String, required: false},
		main_img: {type: String, required: false},
		category: {type: String, required: false},
		state: {type: String, required: true},
		storeLink: {type: String, required: true, unique: true, validate: [
			function(storeLink) {
				return !restrictedNames.includes(storeLink);
			}, `store link can't be one of ${restrictedNames}`
		]},
		cancellation: {type: String, required: false}, //환불 및 교환 정책
		first_char: [{type: String, required: false}]
	},
	
	storeOverview: [{
		img_link: {type: String, required: false},
		img: {type: String, required: false},
		text: {type: String, required: false},
	}],

	storeInfo: {
		storeNumber: {type: String, required: false},
		storeEmail: {type: String, required: false},
		storeLocation: {type: String, required: false},
		storeShippingCompany: {type: String, required: false},
		storeShippingFee: {type: Number, default: 0, required: false},
		facebook: {type: String, required: false},
		instagram: {type: String, required: false},
		twitter: {type: String, required: false},
	},
	
	storeShippingCycle: {
		orderEnd : {type: String, required: false},
		shippingStart : {type: String, required: false},
		shipping_array: [{type: String, required: false}]
	},

	authorizedUsers: { type: String, required: false },

	items: [{
		name: {type: String, required: false},
		description: {type: String, required: false},
		options: [{
			opt : {type: String, required: false},
			add_price : {type: Number, required: false, default: 0}	
		}],
		imgSrc: {type: String, required: false},
		price: {type: Number, required: false},
		saleprice: {type: Number, required: false},
		category: {type: String, required: false},
		main_category: {type: String, required: false},
		sub_category: {type: String, required: false},
		itemLink: {type: String, required: false},
		size: {type: String, required: false},
		madein: {type: String, required: false},
		vaildcount: {type: Number, required: false, default: 0},
		maxPurchaseVolume: {type: Number, required: false},
		created_at: {type: Date},
		overview: {
			raw: {type: String, required: false},
			html: {type: String, required: false}
		},
		overview_new: {type: String, required: false},
		accept : {type: Boolean, default: false},
		rewardComment: {type: Boolean, required: false},
		temporary_outofstock: {type: Boolean, required: false},
	}],

	qnas: [{
		type: Schema.Types.ObjectId,
		ref: 'QnA'
	}],
	numQnAs: {type: Number, default: 0}
});


// Configure the 'ProductSchema' to use getters and virtuals when transforming to JSON
StoreSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

StoreSchema.pre('save', function (next) {
	next()
})

// find helper
StoreSchema.statics.findOneByLink = function (link) {
	return this.findOne({'abstract.storeLink': link})
}
StoreSchema.statics.findAuthorizedOnesToUser = function (user) {
	return this.find({ 'authorizedUsers': user.local_email || user.fb_email })
}
StoreSchema.statics.findByLinks = function (links) {
	if (!links) return this.find({'abstract.storeLink': '______'})

	let re = new RegExp(links.join('|'), "i")
	return this.find({ 'abstract.storeLink': re})
}

StoreSchema.methods.toFormat = async function (type, ...args) {

	try {
		
		/* for(var i in this.funding.rewards) {
			for(var e in product_purchase_info && product_purchase_info.purchases) {
				for(var z in product_purchase_info && product_purchase_info.purchases[e].new_reward) {
					if(product_purchase_info && product_purchase_info.purchases[e].new_reward[z].title.indexOf(this.funding.rewards[i].title) != -1) {
						this.funding.rewards[i].vaildcount += Number(product_purchase_info && product_purchase_info.purchases[e].new_reward[z].purchaseAmount);
					}
				}
			}
		} */
		
		switch (type) {
			case 'home':
				switch (this.abstract.state) {
					case 'preparing':
						return {
							title: this.abstract.title,
							description: this.abstract.description,
							main_img: this.abstract.main_img,
							storeLink: this.abstract.storeLink,
							first_char: this.abstract.first_char,
							link: `/store/${this.abstract.storeLink}`,
							items: this.items
						}
					case 'in-progress':
					default:
						return {
							title: this.abstract.title,
							description: this.abstract.description,
							main_img: this.abstract.main_img,
							storeLink: this.abstract.storeLink,
							first_char: this.abstract.first_char,
							link: `/store/${this.abstract.storeLink}`,
							items: this.items
						}
				}
				
			case 'category_items':
				return {
					title: this.abstract.title,
					description: this.abstract.description,
					main_img: this.abstract.main_img,
					storeLink: this.abstract.storeLink,
					cancellation: this.abstract.cancellation,
					link: `/store/${this.abstract.storeLink}`,
					storeNumber: this.storeInfo.storeNumber,
					storeEmail: this.storeInfo.storeEmail,
					storeLocation: this.storeInfo.storeLocation,
					storeShippingFee: this.storeInfo.storeShippingFee,
					items: this.items
				}
			
			case 'item_detail':
				let user = args[0];
				let canEdit = args[1]; // TODO: use this!
				
				this.items && this.items.sort(function(a, b) {
					return a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0		
				})

				return {
					canEdit: canEdit,
					abstract: this.abstract,
					storeInfo: this.storeInfo,
					storeOverview: this.storeOverview, 
					storeShippingCycle: this.storeShippingCycle,
					items: this.items && this.items,
					recentItems: this.items[0] && (Date.now() - this.items[0].created_at) / 1000 / 60 / 60 / 24 < 10,
					qnas: this.qnas,
					recentQnA: this.qnas[0] && (Date.now() - this.qnas[0].abstract.created_at) / 1000 / 60 / 60 / 24 < 3,
					// like : like[0],
					// like_num
				}

			case 'edit':
				return {
					abstract: this.abstract,
					storeInfo: this.storeInfo,
					items: this.items,
					storeOverview: this.storeOverview,
					storeShippingCycle: this.storeShippingCycle
				}
				
			case 'editor':
				return {
					storeLink: this.abstract.storeLink
				}

			case 'profile_admin':
				let _json = this.toJSON()
				return {
					..._json.storeInfo,
					..._json.abstract,
				}

			case 'summary':
			let [
				purchase_info
			] = await Promise.all([
					this.getPurchaseInfo()
			])
				return {
					abstract: this.abstract,
					storeInfo: this.storeInfo,
					items: this.items,
					qnas: this.qnas,
					purchase_info,
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

StoreSchema.methods.authorizedTo = function (user) {
	return !!this.authorizedUsers.filter( _id => user.equals(user._id))
}

StoreSchema.methods.getPurchaseInfo = async function () {
	let purchases = await PurchaseModel.findByStore(this)
	purchases = await Promise.all(purchases.map(
		async (p) => await p.toFormat('profile')
	))
	let stat = countBy(purchases.map(p => p.purchase_info), 'purchase_state')
	return {
		stat,
		purchases,
	}
}

StoreSchema.methods.contentgetPurchaseInfo = async function () {
	let purchases = await PurchaseModel.findByStore(this).where('purchase_info.purchase_state').in(['preparing', 'scheduled', 'failed'])
	purchases = await Promise.all(purchases.map(
		async (p) => await p.toFormat('profile')
	))
	let stat = countBy(purchases.map(p => p.purchase_info), 'purchase_state')
	return {
		stat,
		purchases,
	}
}

const StoreModel = mongoose.model('Store', StoreSchema);
export default StoreModel
