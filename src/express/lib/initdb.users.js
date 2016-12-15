import UserModel, { access_levels } from '../models/user'
import { rangeArray } from '../../lib/utils'
import { randomString } from './utils'

const defaultUsers = async () => {
	try {
		await UserModel.create({
			user_name: 'admin',
			access_level: 1000,
			email: 'admin@7pictures.co.kr',
			nick_name: '관리자',
			password: '123123123',
			provider: 'local'
		})
	} catch (e) {}

	try {
		await UserModel.create({
			user_name: 'user',
			access_level: 0,
			email: 'user@7pictures.co.kr',
			nick_name: '일반유저',
			password: '123123123',
			provider: 'local'
		})
	} catch (e) {}

	try {
		await UserModel.create({
			user_name: 'artist',
			access_level: 1,
			email: 'artist@7pictures.co.kr',
			nick_name: '작가',
			password: '123123123',
			provider: 'local'
		})
	} catch (e) {}

	try {
		await UserModel.create({
			user_name: 'editor',
			access_level: 10,
			email: 'editor@7pictures.co.kr',
			nick_name: '편집자',
			password: '123123123',
			provider: 'local'
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
					await UserModel.create({
						user_name: string,
						access_level,
						email: `${string}@7pictures.co.kr`,
						nick_name: string,
						password: '123123123',
						provider: 'local'
					})
				} catch (e) {console.error(e);}
			}
		))
	}
}

export default async function initUsers() {
	console.log('trying to init user actions');
	await defaultUsers()
	await randomusers()
}
