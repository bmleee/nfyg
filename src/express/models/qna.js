// Load the module dependencies
import mongoose from 'mongoose'
import { autoIncrement } from '../lib/db'
import ProjectModel from './project'
import ProductModel from './product'
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
	product: { type: Schema.Types.ObjectId, ref: 'Product'},
	exhibition: { type: Schema.Types.ObjectId, ref: 'Exhibition'},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
	abstract: {
		openType: {type: String, enum: ['to-all', 'to-supporter', 'to-buyer', 'to-sharer', 'to-creator']}, // to-supporter = to-buyer || to-sharer
		// no: {type: Number, unique: true, required: true}, // n-th qna
		title: {type: String, required: true},
		created_at: {type: Date},
		updated_at: {type: Date, default: Date.now()},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		// numLikes: {type: Number, default: 0}, // TODO: be virtual field
	},
	text: {type: String, required: true},
	comments: [{ // TODO: use can write comment
		author: {
			name: {type: String, required: true},
			iconSrc: {type: String, required: true},
			user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // used when check edit authority
		},
		created_at: {type: Date},
		text: {type: String, required: true},
		likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
		// numLikes: {type: Number, default: 0}, // TODO: be virtual field
	}],
	user_info: {
	    name: { type: String, required: false },
	    display_name: { type: String, required: false },
	    local_email: { type: String, required: false },
	    id: { type: String, required: false },
	    fb_id: { type: String, required: false },
	    image: { type: String, required: false },
	},
	store_admin: { type: String, required: false },
	product_admin: { type: String, required: false }
	// numComments: {type: Number, default: 0}, // TODO: be virtual field
});

QnASchema.pre('validate', function (next) {
	if (this.project || this.exhibition || this.product || this.author.user) next()
	else next(Error('One of project, exhibition, product field is reuqired!'))
})

QnASchema.pre('update', function (next) {
	this.abstract.updated_at = Date.now()
	next()
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
	} else if (this.product) {
		ProductModel.update(
			{_id: this.product},
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
	else next()
})

// Configure the 'QnASchema' to use getters and virtuals when transforming to JSON
QnASchema.set('toJSON', {
	getters: true,
	virtuals: true
});

QnASchema.methods.toFormat = function (type, ...args) {
	let isCommented = false;
    if(this.comments.length != 0) {
		isCommented = true;
	}
	
	switch (type) {
		case 'project_detail':
		case 'product_detail':
		case 'exhibition_detail':
			return {
				opened: true, // always true!
				_id: this._id,
				author: this.author,
				title: this.abstract.title,
				created_at: this.abstract.created_at,
				numSupporters: 10, // TODO: [Definition]
				likes: this.abstract.numLikes,
				text: this.text,
				comments: this.comments,
				product_admin: this.product_admin,
				isCommented: isCommented
			}
		case 'profile':
			return {
	          opened: true,
			  _id: this._id,
			  user: this.user_info,
			  author: this.author,
			  title: this.abstract.title,
			  created_at: this.abstract.created_at,
			  text: this.text,
			  comments: this.comments,
			  isCommented: isCommented
	        }
	    case 'profile_admin':
			return {
	          opened: true,
			  _id: this._id,
			  user: this.user_info,
			  author: this.author,
			  title: this.abstract.title,
			  created_at: this.abstract.created_at,
			  text: this.text,
			  comments: this.comments,
			  isCommented: isCommented
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
			likes: [],
			created_at: Date.now()
		})
		this.comments = comments
		this.numComments = comments.length
		await this.save()
		return this.comments[this.comments.length - 1] // return last comment
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

QnASchema.statics.findDetailByUser = function (user) {
	return this.find({ user: user._id || user || user.local_email || user.fb_email })
}

QnASchema.statics.findDetailByStore = function (user) {
	return this.find({ "store_admin" : user.local_email || user.fb_email })
}

QnASchema.statics.findDetailByProduct = function (user) {
	return this.find({ "product_admin" : user.local_email || user.fb_email })
}

// QnASchema.plugin(autoIncrement.plugin, { model: 'QnA', field: 'abstract.no' });

// Create the 'User' model out of the 'QnASchema'
const QnAModel = mongoose.model('QnA', QnASchema);
export default QnAModel
