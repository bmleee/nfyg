import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'

import initUsers from './initdb.users'
import initSponsors from './initdb.sponsors'
import initProjects from './initdb.projects'


(async function main() {
	await initUsers()
	await initSponsors()
	await initProjects()
	console.log('init finished');

	test()
})()


const test = async () => {
	try {
		const p = await ProjectModel.findOne({projectName: '!##@#$#'}) // p is null
	} catch (e) {
		console.error(e);
	}
}
