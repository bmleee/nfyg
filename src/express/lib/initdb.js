import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'
import MagazineModel from '../models/magazine'
import ExhibitionModel from '../models/exhibition'

import Users from './initdb.users'
import Sponsors from './initdb.sponsors'
import Projects from './initdb.projects'
import Posts from './initdb.posts'
import Magazines from './initdb.magazines'
import Exhibitions from './initdb.exhibitions'
import QnA from './initdb.qnas'


(async function main() {
	console.log('init db start');
	await Users()
	await Sponsors()
	await Projects()
	await Posts()
	await Magazines()
	await Exhibitions()
	await QnA()
	console.log('init db finished');

	test()
})()


const test = async () => {
	try {
		// const p = await ProjectModel.findOne({projectName: '!##@#$#'}) // p is null
	} catch (e) {
		console.error(e);
	}
}
