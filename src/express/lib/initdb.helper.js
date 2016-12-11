import UserModel from '../models/user'
import ProjectModel from '../models/project'
import SponsorModel from '../models/sponsor'
import PostModel from '../models/post'
import MagazineModel from '../models/magazine'
import ExhibitionModel from '../models/exhibition'
import QnAModel from '../models/qna'

let user = {
	all: [],
	artist: [],
	editor: [],
	user: [],
	admin: null,
	},
	project = {
		all: [],
		preparing: [],
		in_progress: [],
		completed: [],
	},
	exhibitions,
	magazines,
	sponsors, posts, qnas;

export const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length)

const init = async () => {
	user.all = await UserModel.find({})
	user.user = await UserModel.find({access_level: 0})
	user.artist = await UserModel.find({access_level: 1})
	user.editor = await UserModel.find({access_level: 10})
	user.admin = await UserModel.find({user_name: 'admin'})

	project.all = await ProjectModel.find({})
	project.preparing = await ProjectModel.find({"abstract.state": "preparing"})
	project.in_progress = await ProjectModel.find({"abstract.state": "in_progress"})
	project.completed = await ProjectModel.find({"abstract.state": "completed"})

	exhibitions = await ExhibitionModel.find({})
	magazines = await MagazineModel.find({})

	sponsors = await SponsorModel.find({})
	posts = await PostModel.find({})
	qnas = await QnAModel.find({})
}

export default init

export const getRandomUser = async (k = 'all') => {
	if(k === 'admin') return user.admin

	const userIndex = getRandomIndex(user[k])
	return user[k][userIndex]
}

export const getRandomProject = async (k = 'all') => {
	const index = getRandomIndex(project[k])
	return project[k][index]
}

export const getRandomSponsor = async () => {
	const index = getRandomIndex(sponsors)
	return sponsors[index]
}

export const getRandomPost = async () => {
	const index = getRandomIndex(posts)
	return posts[index]
}

export const getRandomMagazine = async () => {
	const index = getRandomIndex(magazines)
	return magazines[index]
}

export const getRandomExhibiiton = async () => {
	const index = getRandomIndex(exhibitions)
	return exhibitions[index]
}

export const getRandomQnA = async () => {
	const index = getRandomIndex(qnas)
	return qnas[index]
}
