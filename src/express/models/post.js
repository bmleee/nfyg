// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'

const Schema = mongoose.Schema;


// Define a new 'PostSchema'
let PostSchema = new Schema({
	author: {
		name: {type: String, required: true},
		iconSrc: {type: String, required: true},
		user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // used when check edit authority
	},
	abstract: {
		isDirectSupport: {type: Boolean, required: true},
		thresholdMoney: {type: Number, required: true, default: 0},
		title: {type: String, required: true},
		created_at: {type: Date, default: Date.now()},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		numLikes: {type: Number, default: 0},
	},
	content: {type: String, required: true},
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

// Configure the 'PostSchema' to use getters and virtuals when transforming to JSON
PostSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

PostSchema.methods.likedByUser = async function(user) {
	try {
		let likes = this.abstract.likes || []
		likes.push(user._id)
		this.abstract.likes = Array.from(new Set(likes))
		this.abstract.numLikes = Array.from(new Set(likes)).length
		await this.save()
		return this
	} catch (e) {
		console.error(e);
		throw new Error(`User ${user.id} can't like this post ${this.abstract.title} written by ${this.author.name}`)
	}
}

PostSchema.methods.commentedByUser = async function(user, text) {
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

PostSchema.methods.userLikesComment = async function(user, commentIndex) {
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

// Create the 'User' model out of the 'PostSchema'
const PostModel = mongoose.model('Post', PostSchema);
export default PostModel
