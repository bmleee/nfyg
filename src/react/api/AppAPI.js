import fetch from 'isomorphic-fetch'
import axios from 'axios'

import { EXPRESS_PORT } from '../../../env'

const API_URL = `/api/test-api`
const API_HEADERS = {
	'Content-Type': 'application/json',
}

export async function fetchJSONFile(fileName) {
	try {
		const res = await fetch(`${API_URL}/read/${fileName}`, { headers: API_HEADERS })

		if(res.ok) return Promise.resolve(res.json())
		else return Promise.reject(new Error(`Error while fetch ${fileName}.json`))
	} catch (e) {
		console.error(e);
		return Promise.resolve({}) // return empty object literal
	}
}

export async function upload_file(file) {
  const data = new FormData(); // wrap the file to form-data
  data.append('file', file);

  const res = await fetch(`/api/test-api/upload/${file.name}`, {
    method: 'post',
    body: data,
  })

  return res.json() // {sourceURL}

  // let { signed_request, url, ...rest } = await sign_request(file)
  //
  // if (!signed_request) {
  // 	console.log(rest)
  // 	console.error(Error('Cannot get signed request'))
  // 	return
  // }
  //
  // console.log(`signed request: `, signed_request)
  // console.log(`url: `, url)
  // console.log(`rest: `, rest)
  //
  // let res = await image_upload(file, signed_request, url)
  // console.log(res);

}

export async function fetchUserAndData() {
	const config = {
		method: 'get',
		url: `/api/auth/fetch${window.location.pathname}`,
		withCredentials: true,
	}

	console.log(`/api/auth/fetch${window.location.pathname}`);

	try {
		const response = await axios.request(config)
		// console.log(`response: `, response);
		// console.log(`response.data: `, response.data);
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
}

// react-select: Select.Async options
export function fetchOptions(path) {
	const config = {
		method: 'get',
		url: `/api/auth/fetch/options/${path}`,
		withCredentials: true,
	}

	const ret = async () => {
		try {
			const response = await axios.request(config)
			console.log('fetchOptions.response', response.data.data.options);
			return response.data.data
		} catch (e) {
			console.error(`error ${e}`);
			return {options: []}
		}
	}

	return ret
}
