'use strict'
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
import Actions from './initdb.user-action'

import init from './initdb.helper'


(async function main() {
	console.log('init db start');
	let t1 = Date.now(), t2 = Date.now();

	await Promise.all([
		Users(),
		Sponsors()
	])
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	await init()
	await Promise.all([
		Magazines(),
		Exhibitions(),
		Projects(),
	])
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	await init()
	await Promise.all([
		Posts(),
	])

	await QnA()
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	init()
	// await Actions()
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	console.log('init db finished');
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	await test()
	exit(0)
})()


const test = async () => {
	try {
		// const p = await ProjectModel.findOne({projectName: '!##@#$#'}) // p is null
	} catch (e) {
		console.error(e);
	}
}
