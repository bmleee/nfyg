import fetch from 'isomorphic-fetch'
import 'babel-polyfill'

import { EXPRESS_PORT } from '../../../env'

const current_url = document.URL
const tokens = current_url.split('/')
const API_URL = `/api/test-api`
const API_HEADERS = {
	'Content-Type': 'application/json',
}

export async function fetchJSONFile(fileName) {
	try {
		const res = await fetch(`${API_URL}/${fileName}`, { headers: API_HEADERS })

		if(res.ok) return Promise.resolve(res.json())
		else return Promise.reject(new Error(`Error while fetch ${fileName}.json`))
	} catch (e) {
		console.error(e);
		return Promise.resolve({}) // return empty object literal
	}
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
