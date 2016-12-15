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

const Post = async () => {
	let post = await getRandomPost()
	let user1 = await getRandomUser()
	let user2 = await getRandomUser()
	let user3 = await getRandomUser()

	await post.likedByUser(user1)
	await post.commentedByUser(user2, `${randomString('text_Comment_text')} ${randomString()}`)
	let index = getRandomIndex(post.comments)

	await post.userLikesComment(user3, index)
}


const QnA = async () => {
	let qna = await getRandomQnA()

	let user1 = await getRandomUser()
	let user2 = await getRandomUser()
	let user3 = await getRandomUser()

	await qna.likedByUser(user1)
	await qna.commentedByUser(user2, `${randomString('sample user comment')} ${randomString()}`)

	let index = getRandomIndex(qna.comments)

	await qna.userLikesComment(user3, index)
}


export default async function init() {
	console.log('trying to init User action');

	try {

		await Promise.all([
			await Post(),
			await QnA(),
		])


	} catch (e) {
		console.error(e);
	}
}
