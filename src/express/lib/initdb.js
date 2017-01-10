'use strict'
import mongoose from 'mongoose'
import db from './db'

const test = async () => {
	try {
		// const p = await ProjectModel.findOne({projectName: '!##@#$#'}) // p is null
	} catch (e) {
		console.error(e);
	}
}



mongoose.connection.on('open', async function(){
	console.log('clearing db...');
	mongoose.connection.db.dropDatabase(async function(err, result) {
		if (err) {
			console.error(err);
			throw err
		}

		console.log('Drop result: ', result);
		setTimeout(async () => {
			await main()
		}, 1000)
	});
})

async function main() {
	const init = require('./initdb.helper').default
	try {
		console.log('init db start');
		let t1 = Date.now(), t2 = Date.now();

		await Promise.all([
			require('./initdb.users').default(),
			require('./initdb.sponsors').default(),
		])
		console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

		await init()
		await Promise.all([
			require('./initdb.magazines').default(),
			require('./initdb.exhibitions').default(),
			require('./initdb.projects').default(),
			require('./initdb.products').default(),
		])
		console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

		await init()
		await Promise.all([
			require('./initdb.posts').default(),
		])

		await require('./initdb.qnas').default()
		console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

		await require('./initdb.user-action').default()
		console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

		console.log('init db finished');
		console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

		await test()
		process.exit(-1)

		// await process.exit(0)
	} catch (e) {
		console.error(e);
		process.exit(-1)
	}

}
