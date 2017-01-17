import UserModel from '../../models/user'
import ProductModel from '../../models/product'

import { rangeArray, asyncparallelfor } from '~/src/lib/utils'
import { randomString, randomNumber } from '../utils'

const createProduct = async ({state = 'preparing', artist}) => {
	return await ProductModel.create({
		abstract: {
			longTitle: `${randomString('sample long title', 50)}`,
			shortTitle: `${randomString('sample short title', 20)}`,
			imgSrc: "/assets/images/present-product-list-thumbnail.jpg",
			category: "health",
			productName: `${randomString('test-product-name')}`,
			state: state,
			postIntro: `${randomString('sample post intro')}`,
		},
		creator: {
				creatorName: "creator",
				creatorImgSrc: "https://graph.facebook.com/10153932539601313/picture",
				creatorLocation: "서울",
				creatorDescription: "i'm creator"
		},
		authorizedUsers: [artist._id],
		funding: {
				currentMoney: randomNumber(100000),
				targetMoney: randomNumber(100000),
				dateFrom: "2016-12-08",
				dateTo: "2020-12-09",
				minPurchaseVolume: randomNumber(0, 10),
				maxPurchaseVolume: randomNumber(100, 1000),
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
				faqs: [
					{
						question: '제품 구매 이력은 어디서 확인할 수 있나요?',
						answer: 'Check you profile!'
					},
					{
						question: '배송지를 변경하고 싶습니다.',
						answer: '배송이 시작되기 전에마 배송지를 변경하실 수 있습니다. 제품 구매 상세 정보 페이지에서 배송지를 변경하세요.'
					},
					{
						question: '제작과 배송이 언제 되나요?',
						answer: '최소 구매 수량을 넘은 경우에만 미술 제품을 제작할 수 있습니다.'
					},
					{
						question: '결제 취소가 가능한가요?',
						answer: '최소 구매 수량을 넘어 배송이 시작되기 전에는 언제든지 결제 취소를 하실 수 있습니다. 구매 상세 페이지에서 결제를 취소하세요'
					},
					{
						question: '교환이나 반품, 환불이 가능한가요?',
						answer: '네 가능합니다.'
					},
				]

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

	const artist = await UserModel.findOne({ name: '작가' })

	const in_progress = await ProductModel.count({"abstract.state": "in_progress"})
	const preparing = await ProductModel.count({"abstract.state": "preparing"})
	const completed = await ProductModel.count({"abstract.state": "completed"})

	const max_products = 18

	console.log(`${max_products - preparing} preparing product will created`);
	if(max_products - preparing > 0) {
		await Promise.all(rangeArray(preparing, max_products).map(
			async () => {
				try {
					await createProduct({state: 'preparing', artist})
				} catch (e) {console.error(e);}
			}
		))
	}


	console.log(`${max_products - in_progress} in_progress product will created`);
	if(max_products - in_progress) {
		await Promise.all(rangeArray(in_progress, max_products).map(
			async () => {
				try {
					await createProduct({state: 'in-progress', artist})
				} catch (e) {console.error(e);}
			}
		))
	}


	console.log(`${max_products - completed} completed product will created`);
	if(max_products - completed) {
		await Promise.all(rangeArray(completed, max_products).map(
			async () => {
				try {
					await createProduct({state: 'completed', artist})
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
        state: "in-progress",
        postIntro: "test product intro"
	    },
	    creator: {
	        creatorName: "creator",
	        creatorImgSrc: "https://graph.facebook.com/10153932539601313/picture",
	        creatorLocation: "서울",
	        creatorDescription: "i'm creator"
	    },
			authorizedUsers: [artist._id],
	    funding: {
	        currentMoney: 0,
	        targetMoney: 1000000,
	        dateFrom: "2016-12-08",
	        dateTo: "2020-12-09",
					minPurchaseVolume: randomNumber(0, 10),
					maxPurchaseVolume: randomNumber(100, 1000),
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
					faqs: [
						{
							question: 'sample question 1',
							answer: 'sample answer 1'
						},
						{
							question: 'sample question 2',
							answer: 'sample answer 2'
						},
						{
							question: 'sample question 3',
							answer: 'sample answer 3'
						},
					]

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