import UserModel, { access_levels } from '../models/user'
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

		// 20 user for each role
		for (var i = 0; i < 20 - numUsers; i++) {
			let string = randomString()
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
	}
}

export default async function initUsers() {
	console.log('trying to init User collections');
	await defaultUsers()
	await randomusers()
}
