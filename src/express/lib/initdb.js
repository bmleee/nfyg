import initUsers from './initdb.users'
import initSponsors from './initdb.sponsors'
import initProjects from './initdb.projects'


(async function main() {
	await initUsers()
	await initSponsors()
	await initProjects()
	console.log('init finished');
})()
