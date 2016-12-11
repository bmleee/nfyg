// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

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
	},

	creator: {
		creatorName: {type: String, required: true},
		creatorImgSrc: {type: String, required: true},
		creatorLocation: {type: String, required: true},
		creatorDescription: {type: String, required: true},
	},

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

	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}],

	qnas: [{
		type: Schema.Types.ObjectId,
		ref: 'QnA'
	}]

});

// Configure the 'ProjectSchema' to use getters and virtuals when transforming to JSON
ProjectSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

ProjectSchema.methods.toFormat = function (type) {
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
				case 'in_progress':
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
			}

		default:
			return ''
	}
}

ProjectSchema.methods.pushPost = async function (post_id) {
	try {
		let posts = this.posts || []
		posts.push(post_id)
		this.posts = Array.from(new Set(posts))
		return await this.save()
	} catch (e) {
		console.error(e);
		throw e
	}
}

ProjectSchema.methods.pushQnA = async function (_id) {
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



// Create the 'User' model out of the 'ProjectSchema'
const ProjectModel = mongoose.model('Project', ProjectSchema);
export default ProjectModel
