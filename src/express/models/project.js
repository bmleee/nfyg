// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

import QnAModel from './qna'
import PostModel from './post'

const Schema = mongoose.Schema;

export const restrictedNames = ['overview', 'post', 'ranking', 'abstract', 'artworks', 'qna', 'edit', 'new']

// Define a new 'ProjectSchema'
const ProjectSchema = new Schema({
	abstract: {
		longTitle: {type: String, required: true},
		shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: true},
		category: {type: String, required: true}, // refers to react/constants/selectOptions
		projectName: {type: String, required: true, unique: true, validate: [
			function(projectName) {
				return !restrictedNames.includes(projectName);
			}, `project name can't be one of ${restrictedNames}`
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

	sponsor: {
		type: Schema.Types.ObjectId,
		ref: 'Sponsor'
	},

	// Funding
	funding: {
		currentMoney: {type: Number, required: true},   // 직접 / 간접 후원에 의해 추가됨
		targetMoney: {type: Number, required: true},
		dateFrom: {type: String, required: true}, // 작성 시작 일
		dateTo: {type: String, required: true}, // 바로 다음날
		rewards: [
			{
				title: {type: String, required: true},
				description: {type: String, required: true},
				isDirectSupport: {type: Boolean, required: true},
				thresholdMoney: {type: Number, required: true},
			}
		]
	},

	// Overview
	overview: {
		intro: {type: String, required: true},
		part1: {type: String, required: true},
		part2: {type: String, required: true},
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

// ProjectSchema.pre('update', function (next) {
// 	// console.log(this);
// 	// this.numPosts = this.posts.length
// 	// this.numQnAs = this.qnas.length
// 	next()
// })

// Configure the 'ProjectSchema' to use getters and virtuals when transforming to JSON
ProjectSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// find helper
ProjectSchema.statics.findByName = function (name) {
	return this.findOne({'abstract.projectName': name})
}

ProjectSchema.methods.toFormat = async function (type, ...args) {

	// console.log(`Project.toFormat(type: ${type}, args: ${args})`, this);

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
							link: `/projects/${this.abstract.projectName}`,
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
							numDirectSupports: Math.floor(Math.random() * 30), // TODO: from DirectSupport
							numIndirectSupports: Math.floor(Math.random() * 300), // TODO: from IndirectSupport
							link: `/projects/${this.abstract.projectName}`,
						}

					case 'in-progress':
					default:
						return {
							imgSrc: this.abstract.imgSrc,
							creator: this.creator.creatorName,
							title: this.abstract.shortTitle,
							targetMoney: this.funding.targetMoney,
							currentMoney: this.funding.currentMoney,
							numDirectSupports: Math.floor(Math.random() * 30), // TODO: from DirectSupport
							numIndirectSupports: Math.floor(Math.random() * 300), // TODO: from IndirectSupport
							remainingDays: ( new Date(this.funding.dateTo).getTime() - new Date(this.funding.dateFrom).getTime() ) / 1000 / 60 / 60 / 24,
							link: `/projects/${this.abstract.projectName}`,
						}

				}

			case 'project_detail':
				let user = args[0];
				let posts = this.posts.map(p => p.toFormat('project_detail', user))
				let qnas = this.qnas.map(q => q.toFormat('project_detail'))
				return {
					abstract: {...this.abstract},
					creator: {...this.creator},
					sponsor: {
						sponsorName: this.sponsor.sponsorName,
						sponsorDisplayName: this.sponsor.displayName,
						sponsorLogoSrc: this.sponsor.logoSrc,
						sponsorImgSrc: this.sponsor.imgSrc,
						sponsorDescription: this.sponsor.description,
					},
					funding: {...this.funding},
					overview: {...this.overview},
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
					directSupporters: [
						{
							"fbId": "10153932539601313",
							"name": "전희재",
							"money": 34000,
							"support_at": 1476254937264
						},
					],
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
						sponsor: this.sponsor.sponsorName,
						funding: this.funding,
						overview: this.overview,
				}

			default:
				console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
				return ''
		}

	} catch (e) {

	} finally {

	}
}

ProjectSchema.methods.pushPost = async function (post_id) {
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

ProjectSchema.methods.pushQnA = async function (_id) {
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


ProjectSchema.methods.authorizedTo = function (user) {
	return !!this.authorizedUsers.filter( _id => user.equals(user))
}


// Create the 'User' model out of the 'ProjectSchema'
const ProjectModel = mongoose.model('Project', ProjectSchema);
export default ProjectModel