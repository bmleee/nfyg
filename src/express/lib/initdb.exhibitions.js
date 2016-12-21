import UserModel from '../models/user'
import ExhibitionModel from '../models/exhibition'
import init, {
	getRandomUser,
	// getRandomMagazine,
	// getRandomExhibiiton,
	getRandomIndex,
} from './initdb.helper'

import { SelectOptions } from '~/src/react/constants'

import { rangeArray, asyncparallelfor } from '../../lib/utils'
import { randomString } from './utils'

const artworkImgWidthHeightDesc = [
  {
    "imgSrc": "https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1",
    "width": 1200,
    "height": 355,
    "description": "Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원"
  },
  {
    "imgSrc": "https://farm8.staticflickr.com/7263/8168484671_f47b9e53bf_c.jpg",
    "width": 800,
    "height": 213,
    "description": "Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원"
  },
  {
    "imgSrc": "https://farm8.staticflickr.com/7263/8168486479_79a7f0e94d.jpg",
    "width": 500,
    "height": 333,
    "description": "Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원"
  },
  {
    "imgSrc": "https://farm8.staticflickr.com/7131/8168489795_5c175f6db2.jpg",
    "width": 500,
    "height": 333,
    "description": "Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원"
  },
  {
    "imgSrc": "https://farm8.staticflickr.com/7114/8167106653_6a0b30be75.jpg",
    "width": 500,
    "height": 333,
    "description": "Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원"
  },
  {
    "imgSrc": "https://farm9.staticflickr.com/8346/8164213200_65d636cc47.jpg",
    "width": 292,
    "height": 427,
    "description": "Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원"
  }
]

const getRandomRecommend = () => ({
	imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
	title: randomString(),
	description: `${randomString()} ${randomString()}`,
	link: '/exhibitions/detail', // TODO: dynamic link by exhibitionName
})
const getRandomArtwork = () => {
	const t = artworkImgWidthHeightDesc[getRandomIndex(artworkImgWidthHeightDesc)]
	return {
		imgSrc: t.imgSrc,
		width: t.width,
		height: t.height,
		description: t.description,
		title: randomString(),
		price: Math.floor(Math.random() * 10000000),
		soldOut: Math.random() > 0.75,
	}
}


const getRandomDay = () => Math.floor(Math.random() * 25 + 1)
const getRandomMonth = () => Math.floor(Math.random() * 12 + 1)
const getRandomDate = (from = '2015-1-1') => {
	let to = `2016-${getRandomMonth()}-${getRandomDay()}`
	if (from > to) return getRandomDate(from)
	return to
}

const getRandomGenre = () => SelectOptions.ExhibitionGenre[getRandomIndex(SelectOptions.ExhibitionGenre)].value
const getRandomCity = () => SelectOptions.City[getRandomIndex(SelectOptions.City)].value

const createExhibition = async (artist) => {
	let dateFrom = getRandomDate()
	let dateTo = getRandomDate()

	return await ExhibitionModel.create({
		"abstract": {
			"longTitle": randomString(),
			"genre": getRandomGenre(),
			"city": getRandomCity(),
			"address": randomString(getRandomCity(), 20),
			"imgSrc": "/assets/images/recent-exhibition-thumbnail.jpg",
			"dateFrom": dateFrom,
			"dateTo": dateTo,
			"exhibitionName": `test_${randomString()}`,
		},
		"creator": {
				"creatorName": artist.nick_name,
				"creatorImgSrc": artist.image,
				"creatorDescription": randomString(),
		},
		"overview": {
				"part1": JSON.stringify({
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
				"part2": JSON.stringify({
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
		},
		"artworks": [
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
			getRandomArtwork(),
		],
		"recommends": [
			getRandomRecommend(),
			getRandomRecommend(),
			getRandomRecommend(),
		]

	})
}

export default async function initExhibition() {

	console.log('trying to init Exhibition collections');

	const max_exhibitions = 20

	try {
		const numExhibitions = await ExhibitionModel.count({})

		for (var i = numExhibitions; i < max_exhibitions; i++) {

		}

		await Promise.all(rangeArray(numExhibitions, max_exhibitions).map(
			async () => {
				let artist = await getRandomUser('artist')
				await createExhibition(artist)
			}
		))

	} catch (e) {console.error(e);}



}
