// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'
import UserModel from './user'
import ProjectModel from './project'
import ProductModel from './product'

import * as ac from '../lib/auth-check'

const Schema = mongoose.Schema;


// Define a new 'PostSchema'
let PostSchema = new Schema({
	author: {
		name: {type: String, required: true},
		iconSrc: {type: String, required: true},
		user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // used when check edit authority
	},
	project: { type: Schema.Types.ObjectId, ref: 'Project'},
	product: { type: Schema.Types.ObjectId, ref: 'Product'},
	abstract: {
		openType: {type: String, enum: ['to-all', 'to-supporter', 'to-buyer', 'to-sharer', 'to-creator']}, // to-supporter = to-buyer || to-sharer
		// no: {type: Number, unique: true, required: true}, // n-th post
		isDirectSupport: {type: Boolean, required: true, default: false},
		thresholdMoney: {type: Number, required: true, default: 0},
		title: {type: String, required: true},
		created_at: {type: Date},
		updated_at: {type: Date, default: Date.now()},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		// numLikes: {type: Number, default: 0}, // TODO: be virtual field
	},
	content: {
		raw: {type: String, required: true},
		html: {type: String, required: true},
	},
	comments: [{ // TODO: use can write comment
		author: {
			name: {type: String, required: true},
			iconSrc: {type: String, required: true},
			user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // used when check edit authority
		},
		text: {type: String, required: true},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		// numLikes: {type: Number, default: 0}, // TODO: can't be virtual field
	}],
	// numComments: {type: Number, default: 0}, // not to be virtual field. can be virtual...
});

PostSchema.virtual('abstract.numLikes').get(function () {
	return this.abstract.likes.length
})
PostSchema.virtual('numComments').get(function () {
	return this.comments.length
})


PostSchema.pre('validate', function (next) {
	if (this.project || this.product) next()
	else {
		next(Error('One of project, product field is reuqired!'))
	}
})

PostSchema.pre('update', function (next) {
	// this.abstract.updated_at = Date.now()
	next()
})

PostSchema.pre('save', function (next) {
	this.updated_at = Date.now()

	if (this.project) {
		ProjectModel.update(
			{_id: this.project},
			{$addToSet: { posts: this._id }},
			function(err) {
				if(err) next(err)
				else next()
			}
		)
	} else if (this.product) {
		ProductModel.update(
			{_id: this.product},
			{$addToSet: { posts: this._id }},
			function(err) {
				if(err) next(err)
				else next()
			}
		)
	}
})

// Configure the 'PostSchema' to use getters and virtuals when transforming to JSON
PostSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

PostSchema.methods.toFormat = function (type, ...args) {
	switch (type) {
		case 'detail':
		case 'project_detail':
		case 'product_detail':
			let canEdit = args[0];
			let money = args[1];

			//console.log('money: ', money);
			
			// get user's support money
			return {
				_id: this._id,
				opened: canEdit || this.abstract.thresholdMoney <= money, // TODO: according to user's support money
				author: this.author,
				title: this.abstract.title,
				created_at: this.abstract.created_at,
				content: this.content.html,
				contentRaw: this.content.raw,
				comments: this.comments,
				numComments: this.numComments, // TODO: apply react.post
				thresholdMoney: this.abstract.thresholdMoney,
			}
		default:
			console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
			return ''
	}
}


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
		throw new Error(`User ${user.id} can't like on post ${this._id}`)
	}
}

PostSchema.methods.commentedByUser = async function(user, text) {
	try {
		let name = user.display_name
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
		return this.comments[this.comments.length - 1] // return last comment
	} catch (e) {
		console.error(e);
		throw new Error(`User ${user.id} can't comment on post ${this._id}`)
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

// PostSchema.plugin(autoIncrement.plugin, { model: 'Post', field: 'abstract.no' });

// Create the 'User' model out of the 'PostSchema'
const PostModel = mongoose.model('Post', PostSchema);
export default PostModel
