import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'
import QnAModel from '../models/qna'

import { range, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'

import init, {
	getRandomIndex,
	getRandomUser,
	getRandomProject,
	getRandomExhibiiton,
	getRandomQnA,
} from './initdb.helper'

const getRandomTarget = async () => Math.random() > 0.500
	? await getRandomProject()
	: await getRandomExhibiiton()

const createQnA = async (author, target) => {
	const numPosts = target.qnas.length

	for (var i = 0; i < 15 - numPosts; i++) {
		const qna = await QnAModel.create({
			author: {
				name: author.nick_name,
				iconSrc: author.image,
				user: author._id,
			},
			abstract: {
				title: randomString(),
				likes: [],
			},
			text: `${randomString()} ${randomString()} ${randomString()} ${randomString()} ${randomString()}`,
			comments: [],
		})

		await target.pushQnA(qna._id)
	}
}

export default async function initQnA() {
	console.log('trying to init QnA collections');

	try {
		await init()

		// create post for 10 qnas
		asyncparallelfor(range(10), async (_) => {
			let target = await getRandomTarget()
			let author = await getRandomUser()

			let qna = await createQnA(author, target)
		})


		asyncparallelfor(range(10), async (_) => {
			let qna = await getRandomQnA()

			let user1 = await getRandomUser()
			let user2 = await getRandomUser()
			let user3 = await getRandomUser()

			await qna.likedByUser(user1)
			await qna.commentedByUser(user2, `${randomString()} ${randomString()}`)

			let index = getRandomIndex(qna.comments)

			await qna.userLikesComment(user3, index)
		})
	} catch (e) {
		console.error(e);
	}
}
