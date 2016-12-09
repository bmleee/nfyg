// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

const Schema = mongoose.Schema;

export const restrictedNames = ['overview', 'post', 'ranking', 'abstract', 'artworks', 'qna']

// Define a new 'ProjectSchema'
const ProjectSchema = new Schema({
	abstract: {
		longTitle: {type: String, required: true},
		shortTitle: {type: String, required: true},
		imgSrc: {type: String, required: true},
		category: {type: String, required: true}, // refers to react/constants/selectOptions
		projectName: {type: String, required: true, unique: true, validate: [
			function(projectName) {
				return restrictedNames.includes(projectName);
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

// Create the 'User' model out of the 'ProjectSchema'
module.exports = mongoose.model('Project', ProjectSchema);
