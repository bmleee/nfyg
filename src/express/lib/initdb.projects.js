import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'

import { randomString } from './utils'

export default async	function initProject() {
	console.log('trying to init Project collections');

	const in_progress = await ProjectModel.count({"abstract.state": "in_progress"})
	const preparing = await ProjectModel.count({"abstract.state": "preparing"})
	const completed = await ProjectModel.count({"abstract.state": "completed"})

	const max_projects = 18

	console.log(`current project in_progress: ${in_progress} preparing: ${preparing} completed: ${completed} `);

	let sponsor = await SponsorModel.findOne({sponsorName: '7pictures'})

	const createProject = async (state) => {
		return await ProjectModel.create({
			"abstract": {
				"longTitle": "sample project long title",
				"shortTitle": "sample project short title",
				"imgSrc": "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/10/KakaoTalk_20161008_150354358.jpg?resize=1024%2C590&ssl=1",
				"category": "health",
				"projectName": randomString(),
				"state": state,
				"postIntro": "test project intro"
			},
			"creator": {
					"creatorName": "creator",
					"creatorImgSrc": "https://graph.facebook.com/10153932539601313/picture",
					"creatorLocation": "서울",
					"creatorDescription": "i'm creator"
			},
			"sponsor": sponsor._id,
			"funding": {
					"currentMoney": 0,
					"targetMoney": 1000000,
					"dateFrom": "2016-12-08",
					"dateTo": "2020-12-09",
					"reward": {
							"rewards": [
									{
											"title": "sample reward",
											"description": "sample reward",
											"isDirectSupport": false,
											"thresholdMoney": 0
									},
									{
											"title": "sample reward2",
											"description": "sample reward2",
											"isDirectSupport": true,
											"thresholdMoney": 10000
									},
									{
											"title": "sample reward3",
											"description": "sample reward3",
											"isDirectSupport": true,
											"thresholdMoney": 1000000
									}
							],
							"newReward": {
									"title": "",
									"description": "",
									"isDirectSupport": false,
									"thresholdMoney": 0
							}
					}
			},
			"overview": {
					"intro": "sample reward intro",
					"part1": JSON.stringify({
							"entityMap": {},
							"blocks": [
									{
											"key": "3i2hj",
											"text": "sample rewardsample reward",
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
											"key": "bat3e",
											"text": "sample rewardsample reward",
											"type": "unstyled",
											"depth": 0,
											"inlineStyleRanges": [],
											"entityRanges": [],
											"data": {}
									}
							]
					})
			}
		})
	}


	for (var i = 0; i < max_projects - preparing; i++) {
		try {
			await createProject('preparing')
		} catch (e) {}
	}
	for (var i = 0; i < max_projects - in_progress; i++) {
		try {
			await createProject('in_progress')
		} catch (e) {}
	}
	for (var i = 0; i < max_projects - completed; i++) {
		try {
			await createProject('completed')
		} catch (e) {}
	}


	try {
		let sponsor = await SponsorModel.findOne({sponsorName: '7pictures'})
		await ProjectModel.create({
			"abstract": {
        "longTitle": "sample project long title",
        "shortTitle": "sample project short title",
        "imgSrc": "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/10/KakaoTalk_20161008_150354358.jpg?resize=1024%2C590&ssl=1",
        "category": "health",
        "projectName": "sample_project2",
        "state": "preparing",
        "postIntro": "test project intro"
	    },
	    "creator": {
	        "creatorName": "creator",
	        "creatorImgSrc": "https://graph.facebook.com/10153932539601313/picture",
	        "creatorLocation": "서울",
	        "creatorDescription": "i'm creator"
	    },
	    "sponsor": sponsor._id,
	    "funding": {
	        "currentMoney": 0,
	        "targetMoney": 1000000,
	        "dateFrom": "2016-12-08",
	        "dateTo": "2020-12-09",
	        "reward": {
	            "rewards": [
	                {
	                    "title": "sample reward",
	                    "description": "sample reward",
	                    "isDirectSupport": false,
	                    "thresholdMoney": 0
	                },
	                {
	                    "title": "sample reward2",
	                    "description": "sample reward2",
	                    "isDirectSupport": true,
	                    "thresholdMoney": 10000
	                },
	                {
	                    "title": "sample reward3",
	                    "description": "sample reward3",
	                    "isDirectSupport": true,
	                    "thresholdMoney": 1000000
	                }
	            ],
	            "newReward": {
	                "title": "",
	                "description": "",
	                "isDirectSupport": false,
	                "thresholdMoney": 0
	            }
	        }
	    },
	    "overview": {
	        "intro": "sample reward intro",
	        "part1": JSON.stringify({
	            "entityMap": {},
	            "blocks": [
	                {
	                    "key": "3i2hj",
	                    "text": "sample rewardsample reward",
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
	                    "key": "bat3e",
	                    "text": "sample rewardsample reward",
	                    "type": "unstyled",
	                    "depth": 0,
	                    "inlineStyleRanges": [],
	                    "entityRanges": [],
	                    "data": {}
	                }
	            ]
	        })
	    }
		})
	} catch (e) {}
}
