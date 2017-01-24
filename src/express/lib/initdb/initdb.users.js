import bkfd2Password from 'pbkdf2-password'

import UserModel, { access_levels } from '../../models/user'
import AddressModel from '../../models/address'
import PaymentModel from '../../models/payment'
import { rangeArray } from '~/src/lib/utils'
import { randomString } from '../utils'

const hasher = bkfd2Password();

const createUser = ({name, display_name, access_level, local_email, password}, cb) => {
	hasher({password}, function (err, pwd, salt, hash) {
		UserModel.create({
			name,
			display_name,
			access_level,
			local_email,
			password: hash,
			salt: salt,
		}, cb)
	})
}

const defaultUsers = async () => {
	let password = '123123123'

	createUser({
		name: '관리자',
		display_name: '관리자',
		access_level: 100,
		local_email: 'admin@7pictures.co.kr',
		password
	}, function (err, user) {
		if(err) console.error(err);
	})

	createUser({
		name: '일반유저',
		display_name: '일반유저',
		access_level: 0,
		local_email: 'user@7pictures.co.kr',
		fb_email: 'pjh@7pictures.co.kr',
		password
	}, function (err, user) {
		if(err) console.error(err);
	})

	createUser({
		name: '작가',
		display_name: '작가',
		access_level: 1,
		local_email: 'artist@7pictures.co.kr',
		password
	}, function (err, user) {
		if(err) console.error(err);
	})

	createUser({
		name: '편집자',
		display_name: '편집자',
		access_level: 10,
		local_email: 'editor@7pictures.co.kr',
		password
	}, function (err, user) {
		if(err) console.error(err);
	})

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

const initAddress = async (user) => {
	try {
		await AddressModel.create({
			user,
			addressee_name: randomString(),
			zipcode: randomString(),
			address1: randomString(),
			address2: randomString(),
		})
	} catch (e) { console.error(e); }
}

const initPayment = async (user) => {
	let card_number = '4214-2000-1125-7680'
	let expiry = '2018-08'
	let birth = '921011'
	let pwd_2digit = '16'

	let payment = await PaymentModel.create({ card_number, expiry, birth, pwd_2digit, user: user._id })
}

export default async function initUsers() {
	console.log('trying to init users');
	await defaultUsers()
	await randomusers()

	let user = await UserModel.findOne({name: "일반유저"})

	console.log('trying to init user address & payment');
	await initAddress(user)
	await initPayment(user)

	return
}
