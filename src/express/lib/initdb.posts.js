import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'

import { range, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'
import init, {
	getRandomIndex,
	getRandomUser,
	getRandomProject,
	getRandomPost
} from './initdb.helper'


const createPost = async (artist, project) => {
	const numPosts = project.posts.length

	await Promise.all(range(numPosts, 15).map(async (_) => {
		const post = await PostModel.create({
			author: {
				name: artist.nick_name,
				iconSrc: artist.image,
				user: artist._id
			},
			abstract: {
				isDirectSupport: Math.random() > 0.5,
				thresholdMoney: Math.floor(Math.random() * 10000),
				title: `${randomString()} ${randomString()} ${randomString()}`,
			},
			content: JSON.stringify({
					"entityMap": {},
					"blocks": [
							{
									"key": "3i2hj",
									"text": `${randomString()} ${randomString()} ${randomString()} ${randomString()} ${randomString()}`,
									"type": "unstyled",
									"depth": 0,
									"inlineStyleRanges": [],
									"entityRanges": [],
									"data": {}
							}
					]
			}),
		})

		await project.pushPost(post._id)
	}))
}


export default async function initPost() {
	console.log('trying to init Post collections');

	try {
		await init()

		// create post for 10 projects
		asyncparallelfor(range(10), async (_) => {
			let project = await getRandomProject()
			let artist = await getRandomUser('artist')

			await createPost(artist, project)
		})

		// create comment for 10 posts
		asyncparallelfor(range(10), async (_) => {
			let post = await getRandomPost()
			let user1 = await getRandomUser()
			let user2 = await getRandomUser()
			let user3 = await getRandomUser()

			await post.likedByUser(user1)
			await post.commentedByUser(user2, `${randomString()} ${randomString()}`)
			let index = getRandomIndex(post.comments)

			await post.userLikesComment(user3, index)
		})

	} catch (e) {
		console.error(e);
	}
}
