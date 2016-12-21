import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'

import { range, rangeArray, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'
import init, {
	getRandomIndex,
	getRandomUser,
	getRandomProject,
	getRandomPost
} from './initdb.helper'


const createPost = async (artist, project) => {
	const numPosts = project.posts.length

	console.log(`Project ${project._id} ${15 - numPosts} qnas will be added`);

	await Promise.all(rangeArray(numPosts, 15).map(async (_) => {
		await PostModel.create({
			author: {
				name: artist.nick_name,
				iconSrc: artist.image,
				user: artist._id
			},
			project: project._id, // project is document or string(_id)
			abstract: {
				isDirectSupport: Math.random() > 0.5,
				thresholdMoney: Math.floor(Math.random() * 10000),
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
		})
	}))
}


export default async function initPost() {
	console.log('trying to init Post collections');

	try {

		// create post for projects
		let projects = await ProjectModel.find({})
		projects = projects.filter(p => {
			// console.log(`${Object.keys(p).join(', ')}`);
			// console.log(p);
			return p.posts.length === 0
		})

		await Promise.all(projects.map(
			async (project) => {
				let artist = await getRandomUser('artist')
				await createPost(artist, project)
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
