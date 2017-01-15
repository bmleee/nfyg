import bkfd2Password from 'pbkdf2-password'

import UserModel, { access_levels } from '../models/user'
import AddressModel from '../models/address'
import { rangeArray } from '../../lib/utils'
import { randomString } from './utils'

const hasher = bkfd2Password();

const createUser = async ({name, displayName, access_level, local_email, password}) => {
	hasher({password}, async function (err, pwd, salt, hash) {
		return await UserModel.create({
			name,
			displayName,
			access_level,
			local_email,
			password: hash,
			salt: salt,
		})
	})
}

const defaultUsers = async () => {
	let password = '123123123'

	try {
		await createUser({
			name: '관리자',
			display_name: '관리자',
			access_level: 100,
			local_email: 'admin@7pictures.co.kr',
			password
		})
	} catch (e) {}

	try {
		await createUser({
			name: '일반유저',
			display_name: '일반유저',
			access_level: 0,
			local_email: 'user@7pictures.co.kr',
			password
		})
	} catch (e) {}

	try {
		await createUser({
			name: '작가',
			display_name: '작가',
			access_level: 1,
			local_email: 'artist@7pictures.co.kr',
			password
		})
	} catch (e) {}

	try {
		await createUser({
			name: '편집자',
			display_name: '편집자',
			access_level: 10,
			local_email: 'artist@7pictures.co.kr',
			password
		})
	} catch (e) {}
}

const randomusers = async () => {
	// populate all type of user except admin
	for (let access_level of access_levels.slice(0, access_levels.length - 1)) {
		const numUsers = await UserModel.count({ access_level })
		console.log(`${20 - numUsers} user will be created`);
		// 20 user for each role
		await Promise.all(rangeArray(20 - numUsers).map(
			async () => {
				let string = randomString('sample_user_access_level_' + access_level)
				try {
					await createUser({
						name: string,
						display_name: string,
						access_level,
						local_email: `${string}@7pictures.co.kr`,
						password: '123123123'
					})
				} catch (e) {console.error(e);}
			}
		))
	}
}

const initAddress = async () => {
	let users = await UserModel.find({})
	await Promise.all(users.map(async (user) => {
		await AddressModel.create({
			user,
			addressee_name: randomString(),
			zipcode: randomString(),
			address1: randomString(),
			address2: randomString(),
		})
	}))
}

export default async function initUsers() {
	console.log('trying to init user actions');
	await defaultUsers()
	await randomusers()
	await initAddress()
}
