'use strict'
import UserModel from '../models/user'
import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'
import MagazineModel from '../models/magazine'
import ExhibitionModel from '../models/exhibition'
import QnAModel from '../models/qna'

import Users from './initdb.users'
import Sponsors from './initdb.sponsors'
import Projects from './initdb.projects'
import Products from './initdb.products'
import Posts from './initdb.posts'
import Magazines from './initdb.magazines'
import Exhibitions from './initdb.exhibitions'
import QnA from './initdb.qnas'
import Actions from './initdb.user-action'

import init from './initdb.helper'

const test = async () => {
	try {
		// const p = await ProjectModel.findOne({projectName: '!##@#$#'}) // p is null
	} catch (e) {
		console.error(e);
	}
}



const clear = async () => {

	const action = async (Model, caption) => {
		console.log(caption)
		await Model.remove({})
	}


	try {

		await Promise.all([
			action(UserModel, 'removing user...'),
			action(ProjectModel, 'removing project...'),
			action(ProductModel, 'removing product...'),
			action(SponsorModel, 'removing sponsor...'),
			action(PostModel, 'removing post...'),
			action(ExhibitionModel, 'removing exhibition...'),
			action(MagazineModel, 'removing magazine...'),
			action(QnAModel, 'removing qna...'),
		])


	} catch (e) {
		console.error(e);
	} finally {

	}

}

(async function main() {
	console.log('clearing db...');
	await clear()

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
		Products(),
	])
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	await init()
	await Promise.all([
		Posts(),
	])

	await QnA()
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	await Actions()
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	console.log('init db finished');
	console.log(`${((t2 = Date.now()) - t1) / 1000}sec`);

	await test()

	await exit(0)
})()
