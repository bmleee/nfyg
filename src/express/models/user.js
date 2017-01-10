// Load the module dependencies
import mongoose from 'mongoose'
import crypto from 'crypto'
import { autoIncrement } from '../lib/db'

export const access_levels = [0, 1, 10, 100]

const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const UserSchema = new Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	user_name: {
		type: String,
		required: 'name is required',
		trim: true
	},
	/*
	 0 : nomal user
	 1 : artist, can publish / edit project, exhibition
	 10 : editor, can publish / edit magazine
	 100 : admin, can do anything
	 */
	access_level: {
		type: Number,
		default: 0,
	},
	email: {
		type: String,
		unique: true,
		required: 'email is required',
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	nick_name: {
		type: String,
		// Set a unique 'username' index
		// unique: true,
		// Validate 'username' value existance
		// required: 'Username is required',
		// Trim the 'username' field
		trim: true
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			function(password) {
				return password && password.length > 6;
			}, 'Password should be longer'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		// Validate 'provider' value existance
		required: 'Provider is required'
	},
	providerId: String,
	image: {
		type: String,
		default: '/assets/images/user_default.png'
	},
	fb_id: { // facebook user id
		type: String,
		default:'',
	},
	payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
	projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
	products: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

// Find possible not used username
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;

	// Add a 'username' suffix
	var possibleUsername = username + (suffix || '');

	// Use the 'User' model 'findOne' method to find an available unique username
	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		// If an error occurs call the callback with a null value, otherwise find find an available unique username
		if (!err) {
			// If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.statics.findUniqueEmail = function(Email, suffix, callback) {
	var _this = this;

	// Add a 'username' suffix
	var possibleEmail = email + (suffix || '');

	// Use the 'User' model 'findOne' method to find an available unique username
	_this.findOne({
		email: possibleEmail
	}, function(err, user) {
		// If an error occurs call the callback with a null value, otherwise find find an available unique username
		if (!err) {
			// If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
			if (!user) {
				callback(possibleEmail);
			} else {
				return _this.findUniqueUsername(email, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

UserSchema.methods.toFormat = async function(type, ...args) {
	switch (type) {
		case 'profile':
			return await _renderProfile(this)
		default:
			return {}
	}
}

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'id' });

// Create the 'User' model out of the 'UserSchema'
const UserModel = mongoose.model('User', UserSchema);
export default UserModel

// Helperfunctions

const _renderProfile = async (_this) => {
	switch (this.access_level) {
		case 0: // normal user
			return {

			}
		case 1: // artist
			return {

			}
		case 10: // editor
			return {

			}
		case 100: // admin
			return {

			}
		default:
			throw new Error(`[User ${this.id}] No such access level ${this.access_level}`)
	}
}
