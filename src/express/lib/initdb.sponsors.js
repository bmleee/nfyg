import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'

export default async function initSponsors() {
	console.log('trying to init Sponsor collections');
	try {
		await SponsorModel.create({
			"sponsorName": "7pictures",
			"displayName": "7pictures",
			"description": "7pictures",
			"imgSrc": "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/7pictures_후원기업.jpg?fit=1004%2C378&ssl=1",
			"money": 1200000,
			"contacts": {
					"facebook": "https://facebook.com/7pictures/",
					"homepage": "https://7pictures.co.kr",
					"blog": "",
					"tweeter": ""
			}
		})
	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "SponsorA",
			"displayName": "SponsorA",
			"description": "SponsorA",
			"imgSrc": "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/7pictures_후원기업.jpg?fit=1004%2C378&ssl=1",
			"money": 1200000,
			"contacts": {
					"facebook": "https://facebook.com/7pictures/",
					"homepage": "https://7pictures.co.kr",
					"blog": "",
					"tweeter": ""
			}
		})
		console.log('sponsor is inserted');
	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "SponsorB",
			"displayName": "SponsorB",
			"description": "SponsorB",
			"imgSrc": "https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/7pictures_후원기업.jpg?fit=1004%2C378&ssl=1",
			"money": 1200000,
			"contacts": {
					"facebook": "https://facebook.com/7pictures/",
					"homepage": "https://7pictures.co.kr",
					"blog": "",
					"tweeter": ""
			}
		})
		console.log('sponsor is inserted');
	} catch (e) {}
}
