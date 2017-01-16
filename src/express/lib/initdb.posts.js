import UserModel from '../models/user'
import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'

import { range, rangeArray, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'
import init, {
	getRandomIndex,
	getRandomElem,
	getRandomUser,
	getRandomProject,
	getRandomPost
} from './initdb.helper'

let openTypes = ['to-all', 'to-supporter']

const getRandomOpenType = () => getRandomElem(openTypes)

const createPost = async (artist, target, type) => {
	const numPosts = target.posts.length

	console.log(`${type} ${target._id} ${15 - numPosts} qnas will be added`);

	await Promise.all(rangeArray(numPosts, 15).map(async (_) => {
		let body = {
			author: {
				name: artist.display_name,
				iconSrc: artist.image,
				user: artist._id
			},
			abstract: {
				openType: getRandomElem(openTypes),
				isDirectSupport: Math.random() > 0.5,
				thresholdMoney: Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 10000),
				title: `${randomString('test_post_title')} ${randomString()} ${randomString()}`,
			},
			content: JSON.stringify({
					"entityMap": {},
					"blocks": [
							{
									"key": "3i2hj",
									"text": `${randomString('test_post_content')} ${randomString()} ${randomString()} ${randomString()} ${randomString()}`,
									"type": "unstyled",
									"depth": 0,
									"inlineStyleRanges": [],
									"entityRanges": [],
									"data": {}
							}
					]
			}),
		}
		body[type] = target._id
		await PostModel.create(body)
	}))
}


export default async function initPost() {
	console.log('trying to init Post collections');

	try {

		// create post for projects
		let projects = await ProjectModel.find({})
		let products = await ProductModel.find({})

		projects = projects.filter(p => {
			// console.log(`${Object.keys(p).join(', ')}`);
			// console.log(p);
			return p.posts.length === 0
		})

		products = products.filter(p => {
			// console.log(`${Object.keys(p).join(', ')}`);
			// console.log(p);
			return p.posts.length === 0
		})

		await Promise.all(projects.map(
			async (project) => {
				let artist = await getRandomUser('artist')
				await createPost(artist, project, 'project')
			}
		))

		await Promise.all(products.map(
			async (product) => {
				let artist = await getRandomUser('artist')
				await createPost(artist, product, 'product')
			}
		))

		for (let i = 0; i < 10; i++) {

		}

		await Promise.all(rangeArray(0, 10).map(
			async () => {

			}
		))


	} catch (e) {
		console.error(e);
	}
}
