import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import ProductModel from '../../models/product'

import PurchaseModel from '../../models/purchase'
import AddressModel from '../../models/address'
import PaymentModel from '../../models/payment'

import { rangeArray, asyncparallelfor } from '~/src/lib/utils'
import { randomString, randomNumber } from '../utils'

const createPurchase = async ({project, product, address, payment, reward, user, purchaseAmount, shippingFee}) => {
	return await PurchaseModel.create({
		user,
		user_info: user,
		project,
		product,
		address: address.toJSON(),
		payment: payment.toJSON(),
		reward,
		purchaseAmount,
		shippingFee,
	})
}

export default async function initPurchase() {
	console.log('trying to init purchases to 일반유저');

	try {
		const user = await UserModel.findOne({ name: '일반유저' })
		const [
			addresses,
			payments,
			projects,
			products
		] = await Promise.all([
			AddressModel.findByUser(user),
			PaymentModel.findByUser(user),
			ProjectModel.find({'abstract.state': 'in-progress'}),
			ProductModel.find({'abstract.state': 'in-progress'}),
		])

		const address = addresses[0]
		const payment = payments[0]

		const purchaseAmount = randomNumber(2) || 1
		const shippingFee = randomNumber(10) || 0

		// for (let project of projects) {
		// 	console.log(`project ${project._id} purchased`);
		//
		// 	for (let reward of project.funding.rewards.filter(r => r.isDirectSupport)) {
		// 		await createPurchase({project, address, payment, reward, user, purchaseAmount, shippingFee})
		// 	}
		// }
		//
		// for (let product of products) {
		// 	console.log(`product ${product._id} purchased`);
		//
		// 	for (let reward of product.funding.rewards.filter(r => r.isDirectSupport)) {
		// 		await createPurchase({product, address, payment, reward, user, purchaseAmount, shippingFee})
		// 	}
		// }

		await Promise.all(
			projects.map(
				async (project) => {
					console.log(`project ${project._id} purchased`);
					await Promise.all(
						project.funding.rewards
							.filter(r => r.isDirectSupport)
							.map(async (reward) => {
								await createPurchase({project, address, payment, reward, user, purchaseAmount, shippingFee})
							})
					)
				}
			)
		)

		await Promise.all(
			products.map(
				async (product) => {
					console.log(`product ${product._id} purchased`);
					await Promise.all(
						product.funding.rewards
							.filter(r => r.isDirectSupport)
							.map(async (reward) => {
								await createPurchase({product, address, payment, reward, user, purchaseAmount, shippingFee})
							})
					)
				}
			)
		)
	} catch (e) { console.error(e); }

}
