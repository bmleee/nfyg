import UserModel from '../models/user'
import ProductModel from '../models/product'

import { rangeArray, asyncparallelfor } from '../../lib/utils'
import { randomString, randomNumber } from './utils'

const createProduct = async ({state = 'preparing'}) => {
	return await ProductModel.create({
		abstract: {
			longTitle: `${randomString('sample long title', 50)}`,
			shortTitle: `${randomString('sample short title', 20)}`,
			imgSrc: "/assets/images/present-product-list-thumbnail.jpg",
			category: "health",
			productName: `${randomString('test product name')}`,
			state: state,
			postIntro: `${randomString('sample post intro')}`,
		},
		creator: {
				creatorName: "creator",
				creatorImgSrc: "https://graph.facebook.com/10153932539601313/picture",
				creatorLocation: "서울",
				creatorDescription: "i'm creator"
		},
		funding: {
				currentMoney: randomNumber(100000),
				targetMoney: randomNumber(100000),
				dateFrom: "2016-12-08",
				dateTo: "2020-12-09",
				rewards: [
						{
								title: "sample reward",
								description: "sample reward",
								isDirectSupport: false,
								thresholdMoney: 0
						},
						{
								title: "sample reward2",
								description: "sample reward2",
								isDirectSupport: true,
								thresholdMoney: 10000
						},
						{
								title: "sample reward3",
								description: "sample reward3",
								isDirectSupport: true,
								thresholdMoney: 1000000
						}
				],
		},
		overview: {
				intro: "sample reward intro",
				part1: JSON.stringify({
						entityMap: {},
						blocks: [
								{
										key: "3i2hj",
										text: randomString('sample overview part1'),
										type: "unstyled",
										depth: 0,
										inlineStyleRanges: [],
										entityRanges: [],
										data: {}
								}
						]
				}),
				part2: JSON.stringify({
						entityMap: {},
						blocks: [
								{
										key: "bat3e",
										text: randomString('sample overview part2'),
										type: "unstyled",
										depth: 0,
										inlineStyleRanges: [],
										entityRanges: [],
										data: {}
								}
						]
				})
		}
	})
}

export default async function initProduct() {

	console.log('trying to init Product collections');

	const in_progress = await ProductModel.count({"abstract.state": "in_progress"})
	const preparing = await ProductModel.count({"abstract.state": "preparing"})
	const completed = await ProductModel.count({"abstract.state": "completed"})

	const max_products = 18

	console.log(`${max_products - preparing} preparing product will created`);
	if(max_products - preparing > 0) {
		await Promise.all(rangeArray(preparing, max_products).map(
			async () => {
				try {
					await createProduct({state: 'preparing'})
				} catch (e) {console.error(e);}
			}
		))
	}


	console.log(`${max_products - in_progress} in_progress product will created`);
	if(max_products - in_progress) {
		await Promise.all(rangeArray(in_progress, max_products).map(
			async () => {
				try {
					await createProduct({state: 'in_progress'})
				} catch (e) {console.error(e);}
			}
		))
	}


	console.log(`${max_products - completed} completed product will created`);
	if(max_products - completed) {
		await Promise.all(rangeArray(completed, max_products).map(
			async () => {
				try {
					await createProduct({state: 'completed'})
				} catch (e) {console.error(e);}
			}
		))
	}

	// default product
	try {
		await ProductModel.create({
			abstract: {
        longTitle: "sample product long title",
        shortTitle: "sample product short title",
        imgSrc: "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/10/KakaoTalk_20161008_150354358.jpg?resize=1024%2C590&ssl=1",
        category: "health",
        productName: "test_7pictures",
        state: "in_progress",
        postIntro: "test product intro"
	    },
	    creator: {
	        creatorName: "creator",
	        creatorImgSrc: "https://graph.facebook.com/10153932539601313/picture",
	        creatorLocation: "서울",
	        creatorDescription: "i'm creator"
	    },
	    funding: {
	        currentMoney: 0,
	        targetMoney: 1000000,
	        dateFrom: "2016-12-08",
	        dateTo: "2020-12-09",
					rewards: [
							{
									title: randomString('sample reward title'),
									description: randomString('sample reward description'),
									isDirectSupport: false,
									thresholdMoney: 0
							},
							{
								title: randomString('sample reward title'),
								description: randomString('sample reward description'),
									isDirectSupport: true,
									thresholdMoney: 10000
							},
							{
								title: randomString('sample reward title'),
								description: randomString('sample reward description'),
									isDirectSupport: true,
									thresholdMoney: 1000000
							}
					],
	    },
	    overview: {
	        intro: "sample overview intro",
					part1: JSON.stringify({
							entityMap: {},
							blocks: [
									{
											key: "3i2hj",
											text: randomString('sample overview part1'),
											type: "unstyled",
											depth: 0,
											inlineStyleRanges: [],
											entityRanges: [],
											data: {}
									}
							]
					}),
					part2: JSON.stringify({
							entityMap: {},
							blocks: [
									{
											key: "bat3e",
											text: randomString('sample overview part2'),
											type: "unstyled",
											depth: 0,
											inlineStyleRanges: [],
											entityRanges: [],
											data: {}
									}
							]
					})
	    }
		})
	} catch (e) {if (!JSON.stringify(e).includes('duplicate')) console.error(e);}
}
