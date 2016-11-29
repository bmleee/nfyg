import mongoose from 'mongoose'
import Q from 'q'
import autoIncrement from 'mongoose-auto-increment'

import { MONGODB_URL } from '../../../env';

mongoose.Promise = Q.Promise;
mongoose.connect(MONGODB_URL);

const connection = mongoose.createConnection(MONGODB_URL);
autoIncrement.initialize(connection);


connection.once('open', () => {
	console.log('mongoose is connected');
})
.on('error', (error) => {
	console.log(error);
})


export default connection
export { autoIncrement }