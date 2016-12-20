// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'
import ProjectModel from './project'
import ExhibitionModel from './exhibition'

const Schema = mongoose.Schema;


// Define a new 'QnASchema'
let QnASchema = new Schema({
	author: {
		name: {type: String, required: true},
		iconSrc: {type: String, required: true},
		user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // used when check edit authority
	},
	project: { type: Schema.Types.ObjectId, ref: 'Project'},
	exhibition: { type: Schema.Types.ObjectId, ref: 'Exhibition'},
	abstract: {
		title: {type: String, required: true},
		created_at: {type: Date, default: Date.now()},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		numLikes: {type: Number, default: 0},
	},
	text: {type: String, required: true},
	comments: [{ // TODO: use can write comment
		author: {
			name: {type: String, required: true},
			iconSrc: {type: String, required: true},
			user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // used when check edit authority
		},
		text: {type: String, required: true},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		numLikes: {type: Number, default: 0},
	}],
	numComments: {type: Number, default: 0},
});

QnASchema.pre('validate', function (next) {
	if (this.project || this.exhibition) next()
	else next(Error('One of project, exhibition field is reuqired!'))
})

QnASchema.pre('save', function (next) {
	if (this.project) {
		ProjectModel.update(
			{_id: this.project},
			{$addToSet: { qnas: this._id }},
			function(err) {
				if(err) {
					console.error(err);
					next(err)
				}
				else next()
			}
		)
	} else if (this.exhibition) {
		ExhibitionModel.update(
			{_id: this.exhibition},
			{$addToSet: { qnas: this._id }},
			function(err) {
				if(err) {
					console.error(err);
					next(err)
				}
				else next()
			}
		)
	}

})

// Configure the 'QnASchema' to use getters and virtuals when transforming to JSON
QnASchema.set('toJSON', {
	getters: true,
	virtuals: true
});

QnASchema.methods.toFormat = function (type, ...args) {
	switch (type) {
		case 'project_detail':
		case 'exhibition_detail':
			return {
				opened: true, // always true!
				author: this.author,
				title: this.abstract.title,
				created_at: this.abstract.created_at,
				numSupporters: 10, // TODO: [Definition]
				likes: this.abstract.numLikes,
				text: this.text,
				comments: this.comments
			}
		default:
			console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
			return ''
	}
}

QnASchema.methods.likedByUser = async function(user) {
	try {
		let likes = this.abstract.likes || []
		likes.push(user._id)
		this.abstract.likes = Array.from(new Set(likes))
		this.abstract.numLikes = Array.from(new Set(likes)).length
		await this.save()
		return this
	} catch (e) {
		console.error(e);
		throw new Error(`User ${user.id} can't like this qna ${this.abstract.title} written by ${this.author.name}`)
	}
}

QnASchema.methods.commentedByUser = async function(user, text) {
	try {
		let name = user.user_name
		let iconSrc = user.image
		let comments = this.comments || []
		comments.push({
			author: {
				name,
				iconSrc,
				user: user._id
			},
			text,
			likes: []
		})
		this.comments = comments
		this.numComments = comments.length
		await this.save()
		return this
	} catch (e) {
		console.error(e);
		return false
	}
}

QnASchema.methods.userLikesComment = async function(user, commentIndex) {
	if (commentIndex > this.comments.length - 1) {
		throw new Error(`comment length is ${this.comments.length}. out of index ${commentIndex}`)
	}

	try {
		let likes = this.comments[commentIndex].likes || []
		likes.push(user._id)
		this.comments[commentIndex].likes = likes
		this.comments[commentIndex].numLikes = likes.length
		await this.save()
		return this
	} catch (e) {
		console.error(e);
		throw new Error(`User ${user.id} can't like comment ${this.comments[commentIndex]}`)
	}
}

// Create the 'User' model out of the 'QnASchema'
const QnAModel = mongoose.model('QnA', QnASchema);
export default QnAModel
