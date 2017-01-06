import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'

export default async function initSponsors() {
	console.log('trying to init Sponsor collections');
	console.log('7 sponsors will be added');
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

	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "7Pictures2",
			"displayName": "7Pictures2",
	    "description": "예술 프로젝트에 대한 새로운 기부 문화를 만드는 7Pictures 입니다.",
	    "imgSrc": "https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/월디페_후원기업.jpg?fit=1004%2C378&ssl=1",
	    "money": 3000000,
	    "contacts": {
	      "homepage": "https://7pictures.co.kr",
	      "blog": "https://www.facebook.com/7pictures/?fref=ts"
	    }
		})

	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "7Pictures3",
			"displayName": "7Pictures3",
	    "description": "예술 프로젝트에 대한 새로운 기부 문화를 만드는 7Pictures 입니다.",
	    "imgSrc": "https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/월디페_후원기업.jpg?fit=1004%2C378&ssl=1",
	    "money": 3000000,
	    "contacts": {
	      "homepage": "https://7pictures.co.kr",
	      "blog": "https://www.facebook.com/7pictures/?fref=ts"
	    }
		})

	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "7Pictures4",
			"displayName": "7Pictures4",
	    "description": "예술 프로젝트에 대한 새로운 기부 문화를 만드는 7Pictures 입니다.",
	    "imgSrc": "https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/월디페_후원기업.jpg?fit=1004%2C378&ssl=1",
	    "money": 3000000,
	    "contacts": {
	      "homepage": "https://7pictures.co.kr",
	      "blog": "https://www.facebook.com/7pictures/?fref=ts"
	    }
		})

	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "7Pictures5",
			"displayName": "7Pictures5",
	    "description": "예술 프로젝트에 대한 새로운 기부 문화를 만드는 7Pictures 입니다.",
	    "imgSrc": "https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/월디페_후원기업.jpg?fit=1004%2C378&ssl=1",
	    "money": 3000000,
	    "contacts": {
	      "homepage": "https://7pictures.co.kr",
	      "blog": "https://www.facebook.com/7pictures/?fref=ts"
	    }
		})

	} catch (e) {}
	try {
		await SponsorModel.create({
			"sponsorName": "7Pictures6",
			"displayName": "7Pictures6",
	    "description": "예술 프로젝트에 대한 새로운 기부 문화를 만드는 7Pictures 입니다.",
	    "imgSrc": "https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/08/월디페_후원기업.jpg?fit=1004%2C378&ssl=1",
	    "money": 3000000,
	    "contacts": {
	      "homepage": "https://7pictures.co.kr",
	      "blog": "https://www.facebook.com/7pictures/?fref=ts"
	    }
		})

	} catch (e) {}
}
