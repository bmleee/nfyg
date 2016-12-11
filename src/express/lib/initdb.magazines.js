import UserModel from '../models/user'
import MagazineModel, { categories } from '../models/magazine'
import {
	getRandomMagazine,
	getRandomExhibiiton,
	getRandomUser,
	getRandomIndex,
} from './initdb.helper'

import { range, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'

const getRandomRecommend = () => ({
	imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
	title: randomString(),
	description: `${randomString()} ${randomString()}`,
	link: '/magazines/detail', // TODO: dynamic link by magazineName
})

const createMagazine = async (editor, category) => {
	return await MagazineModel.create({
		abstract: {
			longTitle: `${randomString()} ${randomString()} ${randomString()}`,
			shortTitle: `${randomString()}`,
			imgSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
			category,
			magazineName: randomString(),
		},

		creator: {
			creatorName: editor.nick_name,
			creatorImgSrc: editor.image,
			creatorLocation: randomString(),
			creatorDescription: randomString(),
		},

		content: JSON.stringify({
				"entityMap": {},
				"blocks": [
						{
								"key": "3i2hj",
								"text": `${randomString()} ${randomString()} ${randomString()}`,
								"type": "unstyled",
								"depth": 0,
								"inlineStyleRanges": [],
								"entityRanges": [],
								"data": {}
						}
				]
		}),

		recommendedExhibitions: [
			getRandomRecommend(),
			getRandomRecommend(),
			getRandomRecommend(),
		],

		recommendedMagazines: [
			getRandomRecommend(),
			getRandomRecommend(),
			getRandomRecommend(),
		]

	})
}

export default async function initMagazine() {

	console.log('trying to init Magazine collections');

	const max_magazines = 18

	try {
		for (let category of categories) {
			const numMagazines = await MagazineModel.count({"abstract.category": category})

			asyncparallelfor(range(numMagazines, max_magazines), async (_) => {
				let editor = await getRandomUser('editor')
				await createMagazine(editor, category)
			})

		}
	} catch (e) {console.error(e);}



}
