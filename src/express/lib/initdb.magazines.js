import UserModel from '../models/user'
import MagazineModel, { categories } from '../models/magazine'
import init, {
	getRandomMagazine,
	getRandomExhibiiton,
	getRandomUser,
	getRandomIndex,
} from './initdb.helper'

import { rangeArray, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'

const getRandomRecommend = () => ({
	imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
	title: randomString('test_recommend'),
	description: `${randomString('test_recommend_description', 30)}`,
	link: '/magazines/detail', // TODO: dynamic link by magazineName
})

const createMagazine = async (editor, category) => {
	let body = {
		abstract: {
			longTitle: `${randomString('test_sample_longtitle')}`,
			shortTitle: `${randomString('test_sample_short_title')}`,
			imgSrc: '/assets/images/magazine-thumbnail.jpg',
			category,
			description: randomString('magazine description ', 40),
			magazineName: `${randomString('test_magazine_name')}`,
		},

		creator: {
			creatorName: editor.nick_name,
			creatorImgSrc: editor.image,
			creatorLocation: randomString('test_creator_location'),
			creatorDescription: randomString('test_creatorDescription'),
		},

		content: JSON.stringify({
				"entityMap": {},
				"blocks": [
						{
								"key": "3i2hj",
								"text": `${randomString('test_content_', 102)}`,
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

	}

	return await MagazineModel.create(body)
}

export default async function initMagazine() {

	console.log('trying to init Magazine collections');

	const max_magazines = 18

	try {
		for (let category of categories) {
			const numMagazines = await MagazineModel.count({"abstract.category": category})

			for (var i = numMagazines; i < max_magazines; i++) {

			}

			await Promise.all(rangeArray(numMagazines, max_magazines).map(
				async () => {
					let editor = await getRandomUser('editor')
					await createMagazine(editor, category)
				}
			))

		}
	} catch (e) {console.error(e);}



}
