import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import SponsorModel from '../../models/sponsor'
import PostModel from '../../models/post'
import QnAModel from '../../models/qna'

import { range, rangeArray, asyncparallelfor } from '~/src/lib/utils'
import { randomString } from '../utils'
import init, {
	getRandomIndex,
	getRandomUser,
	getRandomProject,
	getRandomPost,
	getRandomQnA
} from './initdb.helper'

const Post = async (post) => {
	console.log(`Post ${post._id} actioned`);
	let user1 = await getRandomUser()
	let user2 = await getRandomUser()
	let user3 = await getRandomUser()

	await post.likedByUser(user1)
	await post.commentedByUser(user2, `${randomString('text_Comment_text')} ${randomString()}`)
	let index = getRandomIndex(post.comments)

	await post.userLikesComment(user3, index)
}


const QnA = async (qna) => {
	console.log(`QnA ${qna._id} actioned`);
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

		let returns = await Promise.all([
			PostModel.find({"numComments": 0}),
			QnAModel.find({"numComments": 0})
		])

		let posts = returns[0], qnas = returns[1]

		await Promise.all(posts.map(
			async (post) => await Post(post)
		))

		await Promise.all(qnas.map(
			async (qna) => await QnA(qna)
		))

	} catch (e) {
		console.error(e);
	}
}
