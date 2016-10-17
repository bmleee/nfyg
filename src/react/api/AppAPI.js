import fetch from 'isomorphic-fetch'
import 'babel-polyfill'

import { EXPRESS_PORT } from '../../../env'

// TODO: chagne /api/test-api to ...
const API_URL = `http://localhost:${EXPRESS_PORT}/api/test-api`
const API_HEADERS = {
	contentType: 'application/json',
}

export async function fetchHome() {
	try {
		const res = await fetch(`${API_URL}/home`, { headers: API_HEADERS })

		if(res.ok) return Promise.resolve(res.json())
		else return Promise.reject(new Error('Error while fetch home.json'))
	} catch (e) {
		// return Promise.reject(e)
		console.error(e);
		return Promise.resolve({}) // return empty object literal
	}
}

export async function fetchExhibitionDetail() {
	try {
		const res = await fetch(`${API_URL}/exhibition`, { headers: API_HEADERS })

		if(res.ok) return Promise.resolve(res.json())
		else return Promise.reject(new Error('Error while fetch exhibition.json'))
	} catch (e) {
		console.error(e);
		return Promise.resolve({}) // return empty object literal
	}
}
