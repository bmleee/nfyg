import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TodoSchema = new Schema({
	title: { type: String, required: true, },

	description: { type: String, required: true, },

	completed: { type: Boolean, default: false, },
});

export default mongoose.model('Todo', TodoSchema);
