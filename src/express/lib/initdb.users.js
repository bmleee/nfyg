import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'

export default async function initUsers() {
	console.log('trying to init User collections');
	try {
		await UserModel.create({
			user_name: 'admin',
			role: 'admin',
			email: 'admin@7pictures.co.kr',
			nick_name: '관리자',
			password: '123123123',
			provider: 'local'
		})
		console.log('admin is inserted');
	} catch (e) {}

	try {
		await UserModel.create({
			user_name: 'user',
			role: 'user',
			email: 'user@7pictures.co.kr',
			nick_name: '일반유저',
			password: '123123123',
			provider: 'local'
		})
		console.log('user is inserted');
	} catch (e) {}

	try {
		await UserModel.create({
			user_name: 'author',
			role: 'author',
			email: 'author@7pictures.co.kr',
			nick_name: '작가',
			password: '123123123',
			provider: 'local'
		})
		console.log('author is inserted');
	} catch (e) {}

	try {
		await UserModel.create({
			user_name: 'editor',
			role: 'editor',
			email: 'editor@7pictures.co.kr',
			nick_name: '편집자',
			password: '123123123',
			provider: 'local'
		})
		console.log('editor is inserted');
	} catch (e) {}
}
