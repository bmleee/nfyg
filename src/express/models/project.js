// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import QnAModel from './qna'
import PostModel from './post'
import PurchaseModel from './purchase'
import UserModel from './user'

import LikeModel from './like'

import FacebookTracker from '../../lib/FacebookTracker'
import * as ac from '../lib/auth-check'

import { sortBy, countBy } from 'lodash'

const Schema = mongoose.Schema;

export const restrictedNames = ['overview', 'post', 'ranking', 'abstract', 'artworks', 'qna', 'edit', 'new']

// Define a new 'ProjectSchema'
const ProjectSchema = new Schema({
	abstract: {
		longTitle: {type: String, required: true},
		shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: true},
		category: {type: String, required: false}, // refers to react/constants/selectOptions
		projectName: {type: String, required: false, unique: true, validate: [
			function(projectName) {
				return !restrictedNames.includes(projectName);
			}, `이미 존재하는 링크입니다. ${restrictedNames}`
		]},
		state: {type: String, required: true},     // refers to react/constants/selectOptions
		postIntro: {type: String, required: true}, // TODO: change name, postIntro -> projectDescription
		created_at: {type: Date, default: Date.now()},
		updated_at: {type: Date, default: Date.now()},
	},

	creator: {
		creatorName: {type: String, required: false},
		creatorImgSrc: {type: String, required: false},
		creatorLocation: {type: String, required: false},
		creatorDescription: {type: String, required: false},
		creatorEmail: {type: String, required: false},
	},

	authorizedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],

	sponsor: {
		type: Schema.Types.ObjectId,
		ref: 'Sponsor'
	},

	// Funding
	funding: {
		currentMoney: {type: Number, required: true},   // 직접 / 간접 후원에 의해 추가됨
		currentMoney_sub: {type: Number, required: true},
		numValidPurchases_sub: {type: Number, required: true},
		targetMoney: {type: Number, required: true},
		shippingFee: {type: Number, default: 0},
		dateFrom: {type: String, required: true}, // 작성 시작 일
		dateTo: {type: String, required: true}, // 바로 다음날
		etcrewardActive: {type: Boolean, required: false},
		mustrewardActive: {type: Boolean, required: false},
		remainingDays_sub: {type: Number, required: false, default: 0},
		rewards: [
			{
				title: {type: String, required: false},
				description: {type: String, required: false},
				imgSrc: {type: String,},
				isDirectSupport: {type: Boolean, required: false},
				shippingDay: {type: String, required: false},
				thresholdMoney: {type: Number, required: false},
				maxPurchaseVolume: {type: Number, required: false},
				vaildcount: {type: Number, required: false, default: 0},
			}
		]
	},

	// Overview
	overview: {
		intro: {type: String, },
		part1: {
			raw: {type: String, required: true},
			html: {type: String, required: true},
		},
		part2: {
			raw: {type: String, required: false},
			html: {type: String, required: false},
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
	subValidPurchases: {type: Number, default: 0},
	orderNum: {type: Number, default: 0},
	numIndirectSupports : {type: Number, default: 0},

	// Contents
	relatedContents: [{
		title: {type: String, required: false},
		imgSrc: {type: String, required: false},
		link: {type: String, required: false},
	}]
	
});

// ProjectSchema.pre('update', function (next) {
// 	// console.log(this);
// 	// this.numPosts = this.posts.length
// 	// this.numQnAs = this.qnas.length
// 	next()
// })

ProjectSchema.pre('update', function (next) {
	// this.abstract.updated_at = Date.now()
	next()
})
ProjectSchema.pre('save', function (next) {
	this.abstract.updated_at = Date.now()
	next()
})


// Configure the 'ProjectSchema' to use getters and virtuals when transforming to JSON
ProjectSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// find helper
ProjectSchema.statics.findOneByName = function (name) {
	return this.findOne({'abstract.projectName': name})
}
ProjectSchema.statics.findAuthorizedOnesToUser = function (user) {
	return this.find({ authorizedUsers: { $in: [user._id || user] } })
}
ProjectSchema.statics.findByNames = function (names) {
	if (!names) return this.find({'abstract.projectName': '______'})
	
	let re = new RegExp(names.join('|'), "i")
	return this.find({'abstract.projectName': re})
}


ProjectSchema.methods.toFormat = async function (type, ...args) {

	// console.log(`Project.toFormat(type: ${type}, args: ${args})`, this);

	try {
		let {
			likes, shares, comments, num_users, num_posts,
			money_by_sharing, recent_3_user_ids,
			post_messages
		} = await FacebookTracker.getProjectSummary(this.abstract.projectName)
		
		//console.log('num_useres', num_users)
		//console.log('likes', likes)
		//console.log('shares', shares)
		//console.log('comments', comments)
		//console.log('money_by_sharing', money_by_sharing)
		//console.log('num_posts', num_posts)
		// console.log('post_messages', post_messages)
		
		let project_purchase_info = await this.contentgetPurchaseInfo()
		
		var DirectMoneySum = 0;
		 for(var idx in project_purchase_info && project_purchase_info.purchases){
			DirectMoneySum += Number(project_purchase_info && project_purchase_info.purchases[idx].purchase_info.amount);
		}
		
		this.funding.currentMoney_sub = DirectMoneySum;
		this.funding.numValidPurchases_sub = await PurchaseModel.countValidPurchase({ project: this })
		await this.save()
		
		// let	purchase_info = await Promise.all(this.getPurchaseInfo())
		
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
							link: `/projects/${this.abstract.projectName}`,
							projectName: this.abstract.projectName,
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
							numDirectSupports: await PurchaseModel.count({project: this}),
							numIndirectSupports: num_posts,
							link: `/projects/${this.abstract.projectName}`,
							projectName: this.abstract.projectName,
						}

					case 'in-progress':
						
					default:
						return {
							imgSrc: this.abstract.imgSrc,
							creator: this.creator.creatorName,
							title: this.abstract.shortTitle,
							targetMoney: this.funding.targetMoney,
							currentMoney: this.funding.currentMoney + money_by_sharing,
							numDirectSupports: await PurchaseModel.count({project: this}),
							numIndirectSupports: num_posts,
							remainingDays: ((new Date(this.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24,
							link: `/projects/${this.abstract.projectName}`,
							postIntro: this.abstract.postIntro,
							abstract: this.abstract,
							projectName : this.abstract.projectName,
							project_purchase_info,
							DirectMoneySum,
							orderNum: this.orderNum,
						}
					
				} // end of switch this.abstract.state

			case 'project_detail':
				let user = args[0];
				let canEdit = args[1];
				let money = (canEdit || !user) ? 0 :  await user.supportedMoney(this);
				let posts = this.posts.map(p => p.toFormat('project_detail', ac.canEdit(user, this), money))
				let qnas = this.qnas.map(q => q.toFormat('project_detail'))
				let numValidPurchases = await PurchaseModel.countValidPurchase({ project: this })
				
				let like = await LikeModel.findByUserAndProject(user, this)
				let like_num = await LikeModel.findByProject(this)
				
				for(var i in this.funding.rewards) {
					for(var e in project_purchase_info && project_purchase_info.purchases) {
						if(project_purchase_info && project_purchase_info.purchases[e].result_description.indexOf(this.funding.rewards[i].title) != -1) {
							this.funding.rewards[i].vaildcount = this.funding.rewards[i].vaildcount + project_purchase_info && project_purchase_info.purchases[e].purchaseAmount;
						}
					}
				}
				
				let indirectSupporters = post_messages.map(pm => ({
					fbId: pm.user_app_scope_id,
					name: pm.name,
					message: pm.post_message,
					support_at: new Date(pm.created_at).getTime(), // TOOD: correct support_at from FacebookTracker
					likes: pm.likes,
					shares: pm.shares,
					comments: pm.shares,
					money: (pm.likes + pm.comments + pm.shares) * 200,
				}))
				
				
				// console.log('프로젝트this', this)
				
				console.log('구매내역', purchase_info)
				
				return {
					abstract: this.abstract,
					creator: this.creator,
					sponsor: {
						sponsorName: this.sponsor.sponsorName,
						sponsorDisplayName: this.sponsor.displayName,
						sponsorLogoSrc: this.sponsor.logoSrc,
						sponsorImgSrc: this.sponsor.imgSrc,
						sponsorDescription: this.sponsor.description,
					},
					funding: {
						currentMoney: this.funding.currentMoney + money_by_sharing,
						targetMoney: this.funding.targetMoney,
						shippingFee: this.funding.shippingFee,
						dateFrom: this.funding.dateFrom,
						dateTo: this.funding.dateTo,
						rewards: this.funding.rewards,
					},
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
						recentPost: this.posts[0] && (Date.now() - this.posts[0].abstract.created_at) / 1000 / 60 / 60 / 24 < 1 // less than 1 day
					},
					qna: {
						posts: qnas,
						recentQnA: this.qnas[0] && (Date.now() - this.qnas[0].abstract.created_at) / 1000 / 60 / 60 / 24 < 3
					},
					ranking: {
						recent3DirectSupporters: [
							"10153932539601313",
							"10153932539601313",
							"10153932539601313"
						],
						recent3IndirectSupporters: recent_3_user_ids
					},
					directSupporters: (await PurchaseModel.findByProject(this)).map(async (_) => await _.toFormat('project_detail')),
					indirectSupporters: indirectSupporters,
					numIndirectSupports: num_posts,
					relatedContents: this.relatedContents,
					numValidPurchases,
					subValidPurchases: this.subValidPurchases,
					orderNum: this.orderNum,
					project_purchase_info,
					DirectMoneySum,
					funding_reward : this.funding.rewards,
					like : like[0],
					like_num
				}


			case 'edit':
				return {
					abstract: this.abstract,
					creator: this.creator,
					sponsor: this.sponsor.sponsorName,
					funding: this.funding,
					overview: this.overview,
					relatedContents: this.relatedContents,
				}

			case 'profile_admin':
			case 'shared_project':
				let _json = this.toJSON()
				return {
					..._json.funding,
					..._json.abstract,
				}

			case 'summary':
				let [
					// sharing_info,
					purchase_info,
					authorizedUsers
				] = await Promise.all([
						// this.getSharingInfo(), // likes, shares, comments, num_users, num_posts, money_by_sharing,
						this.getPurchaseInfo(),
						Promise.all(this.authorizedUsers.map(async (u) => await u.toFormat('profile_admin')))
				])
				
				console.log('posts2222', this.posts)

				return {
					abstract: this.abstract,
					creator: this.creator,
					funding: this.funding,
					posts: sortBy(this.posts, (p) => -new Date(p.abstract.created_at).getTime()),
					qnas: sortBy( this.qnas, (p) => -new Date(p.abstract.created_at).getTime()),
					sponsor: this.sponsor,
					authorizedUsers,
					// sharing_info,
					purchase_info
				}

			case 'search_result':
				return this.abstract

			default:
				console.error(`ProjectModel.toFormat can't accept this ${JSON.stringify(type)}`);
				return ''
		}

	} catch (e) {
		console.error(e);
	}
}

ProjectSchema.methods.authorizedTo = function (user) {
	return !!this.authorizedUsers.filter( _id => user.equals(user))
}

ProjectSchema.methods.getSharingInfo = async function () {
	const {
		likes, shares, comments, num_users, num_posts, money_by_sharing, post_messages,
	} = await FacebookTracker.getProjectSummary(this.abstract.projectName)

	// console.log('post_messages', post_messages);

	let users = await Promise.all(post_messages.map(
		async ({user_app_scope_id, user_id, name, likes, comments, shares,}) => {
			let user = await UserModel.findOne({ fb_id: user_app_scope_id })
			
			return {
				user: await user.toFormat('profile_admin'),
				user_id: user.id,
				name,
				likes,
				comments,
				shares,
			}
		}
	))

	return { likes, shares, comments, num_users, num_posts, money_by_sharing, users}
}

ProjectSchema.methods.getPurchaseInfo = async function () {
	let purchases = await PurchaseModel.findByProject(this)
	purchases = await Promise.all(purchases.map(
		async (p) => await p.toFormat('profile')
	))

	let stat = countBy(purchases.map(p => p.purchase_info), 'purchase_state')

	return {
		stat,
		purchases,
	}
}

ProjectSchema.methods.contentgetPurchaseInfo = async function () {
	let purchases = await PurchaseModel.findByProject(this).where('purchase_info.purchase_state').in(['preparing', 'scheduled', 'failed'])
	purchases = await Promise.all(purchases.map(
		async (p) => await p.toFormat('profile')
	))

	let stat = countBy(purchases.map(p => p.purchase_info), 'purchase_state')

	return {
		stat,
		purchases,
	}
}

// Create the 'User' model out of the 'ProjectSchema'
const ProjectModel = mongoose.model('Project', ProjectSchema);
export default ProjectModel
