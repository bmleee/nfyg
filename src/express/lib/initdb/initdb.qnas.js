import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import ProductModel from '../../models/product'
import ExhibitionModel from '../../models/exhibition'
import SponsorModel from '../../models/sponsor'
import PostModel from '../../models/post'
import QnAModel from '../../models/qna'

import { rangeArray, asyncparallelfor } from '~/src/lib/utils'
import { randomString } from '../utils'

import init, {
	getRandomIndex,
	getRandomElem,
	getRandomUser,
	getRandomProject,
	getRandomExhibiiton,
	getRandomQnA,
} from './initdb.helper'

const getRandomTarget = async () => Math.random() > 0.500
	? [await getRandomProject(), 'project']
	: [await getRandomExhibiiton(), 'exhibition']

const createQnA = async (author, target, type) => {
	const numPosts = target.qnas.length

	for (var i = 0; i < 15 - numPosts; i++) {

	}

	let arr = rangeArray(numPosts, 15).map(() => ({author, target}))

	console.log(`${type} ${target._id} ${arr.length} qnas will be added`);

	await Promise.all(arr.map(
		async ({ author, target }) => {
			let body = {
				author: {
					name: author.display_name,
					iconSrc: author.image,
					user: author._id,
				},
				abstract: {
					title: randomString('sample qna title'),
					likes: [],
				},
				text: `${randomString('sample qna text')} ${randomString()} ${randomString()} ${randomString()} ${randomString()}`,
				comments: [],
			}

			body[type] = target._id // target is document or string(_id)

			// console.log('QnA body', body);
			return await QnAModel.create(body)
		}
	))

	// const qnas_ids = qnas.map(x => x._id)
	// console.log(`qna created ${qnas_ids.join(', ')}`);
	//
	// await target.pushQnA(qnas_ids)

}

export default async function initQnA() {
	console.log('trying to init QnA collections');

	try {
		// create post for 10 qnas
		let projects = await ProjectModel.find({})
		// let exhibitions = await ExhibitionModel.find({})
		let exhibitions = []
		let products = await ProductModel.find({})

		await Promise.all([
			Promise.all[
				projects
					.filter(p => p.qnas.length === 0)
					.map(
						async (p) => {
							let author = await getRandomUser()
							await createQnA(author, p, 'project')
						})
				],
			Promise.all[
				exhibitions
					.filter(e => e.qnas.length === 0)
					.map(
						async (e) => {
							let author = await getRandomUser()
							await createQnA(author, e, 'exhibition')
						})
				],
			Promise.all[
				products
					.filter(e => e.qnas.length === 0)
					.map(
						async (e) => {
							let author = await getRandomUser()
							await createQnA(author, e, 'product')
						})
				],
		])
		//
		// for(let i = 0; i < 10; i ++) {
		// 	let [target, type] = await getRandomTarget()
		// 	let author = await getRandomUser()
		//
		// 	let qna = await createQnA(author, target, type)
		// }



	} catch (e) {
		console.error(e);
	}
}
