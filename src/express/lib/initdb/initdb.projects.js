import UserModel from '../../models/user'
import ProjectModel from '../../models/project'
import SponsorModel from '../../models/sponsor'

import { rangeArray, asyncparallelfor } from '~/src/lib/utils'
import { randomString, randomNumber } from '../utils'

const createProject = async ({sponsor, state = 'preparing', artist}) => {
	return await ProjectModel.create({
		abstract: {
			longTitle: `${randomString('sample long title', 50)}`,
			shortTitle: `${randomString('sample short title', 20)}`,
			imgSrc: "/assets/images/present-project-list-thumbnail.jpg",
			category: "health",
			projectName: `${randomString('test-project-name')}`,
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
		sponsor: sponsor,
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

export default async function initProject() {

	console.log('trying to init Project collections');

	const artist = await UserModel.findOne({ name: '작가' })

	const in_progress = await ProjectModel.count({"abstract.state": "in_progress"})
	const preparing = await ProjectModel.count({"abstract.state": "preparing"})
	const completed = await ProjectModel.count({"abstract.state": "completed"})

	const max_projects = 18

	let sponsor = await SponsorModel.findOne({sponsorName: '7pictures'})

	console.log(`${max_projects - preparing} preparing project will created`);
	if(max_projects - preparing > 0) {
		await Promise.all(rangeArray(preparing, max_projects).map(
			async () => {
				try {
					await createProject({sponsor: sponsor._id, state: 'preparing', artist})
				} catch (e) {console.error(e);}
			}
		))
	}


	console.log(`${max_projects - in_progress} in_progress project will created`);
	if(max_projects - in_progress) {
		await Promise.all(rangeArray(in_progress, max_projects).map(
			async () => {
				try {
					await createProject({sponsor: sponsor._id, state: 'in-progress', artist})
				} catch (e) {console.error(e);}
			}
		))
	}


	console.log(`${max_projects - completed} completed project will created`);
	if(max_projects - completed) {
		await Promise.all(rangeArray(completed, max_projects).map(
			async () => {
				try {
					await createProject({sponsor: sponsor._id, state: 'completed', artist})
				} catch (e) {console.error(e);}
			}
		))
	}

	// default project
	try {
		let sponsor = await SponsorModel.findOne({sponsorName: '7pictures'})
		await ProjectModel.create({
			abstract: {
        longTitle: "sample project long title",
        shortTitle: "sample project short title",
        imgSrc: "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/10/KakaoTalk_20161008_150354358.jpg?resize=1024%2C590&ssl=1",
        category: "health",
        projectName: "test_7pictures",
        state: "in-progress",
        postIntro: "test project intro"
	    },
	    creator: {
	        creatorName: "creator",
	        creatorImgSrc: "https://graph.facebook.com/10153932539601313/picture",
	        creatorLocation: "서울",
	        creatorDescription: "i'm creator"
	    },
			authorizedUsers: [artist._id],
	    sponsor: sponsor._id,
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