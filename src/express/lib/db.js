import mongoose from 'mongoose'
import Q from 'q'
import autoIncrement from 'mongoose-auto-increment'

import { MONGODB_URL } from '~/env';

mongoose.Promise = Q.Promise;
mongoose.connect(MONGODB_URL);

const connection = mongoose.connection
autoIncrement.initialize(connection);

connection.once('open', () => {
	console.log('mongoose is connected to ', MONGODB_URL);
})
.on('error', (error) => {
	console.log(error);
})

export default connection
export { autoIncrement }
