import fetch from 'isomorphic-fetch'
import axios from 'axios'

import { EXPRESS_PORT } from '../../../env'

const API_URL = `/api/test-api`
const API_HEADERS = {
	'Content-Type': 'application/json',
}

const _request = async (config) => {
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(e, config);
		throw Error(e.message)
	}
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

export async function createProject(body) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/projects/`,
		data: body,
	}

	return await _request(config)
}

export async function updateProject(projectName, body) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/projects/${projectName}`,
		data: body,
	}

	return await _request(config)
}

export async function createProduct(body) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/products`,
		data: body,
	}

	return await _request(config)
}

export async function updateProduct(productName, body) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/products/${productName}`,
		data: body,
	}

	return await _request(config)
}

export async function createMagazine(body) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/magazines`,
		data: body,
	}

	return await _request(config)
}

export async function updateMagazine(magazineName, body) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/magazines/${magazineName}`,
		data: body,
	}

	return await _request(config)
}

export async function fetchPurchaseInfo(param) {

	if (!['rewards', 'address', 'payment'].includes(param)) {
		alert(`purchase param ${param} is not valid!`)
		window.location = '/'
	}

	let base = param === 'rewards' ? `auth/fetch/${document.URL.match(/(projects|products)\/.+\//)[0]}` : `users/`

	console.log('base', base);
	const config = {
		method: 'get',
		url: `/api/${base}${param}`,
	}

	return await _request(config)
}

// called /p/:pName/purchase
export async function purchaseReward({paymentIndex, rewardIndex, addressIndex, purchaseAmount, shippingFee}) {
	const base = window.location.pathname // /pro.../:pro...Name/purchase

	const config = {
		method: 'post',
		url: `/api/auth/fetch${base}`,
		data: {
			addressIndex,
			rewardIndex,
			paymentIndex,
			purchaseAmount,
			shippingFee,
		}
	}

	return await _request(config)
}

export async function createAddress(address) {
	const config = {
		method: 'post',
		url: `/api/users/address`,
		data: address,
	}

	return await _request(config)
}

export async function deleteAddress(address_id) {
	const config = {
		method: 'delete',
		url: `/api/users/address/${address_id}`,
	}

	return await _request(config)
}

export async function createPayment(payment) {
	const config = {
		method: 'post',
		url: `/api/users/payment`,
		data: payment,
	}

	return await _request(config)
}

export async function deletePayment(payment_id) {
	const config = {
		method: 'delete',
		url: `/api/users/payment/${payment_id}`,
	}

	return await _request(config)
}

export async function createQnA({title = 'empty-title', text, projectName, productName}) {
	let base;

	if (projectName) base = `projects/${projectName}`
	else if (productName) base = `products/${productName}`

	const config = {
		method: 'post',
		url: `/api/auth/fetch/${base}/qnas`,
		data: { title, text },
	}

	return await _request(config)
}

export async function fetchPost(post_id) {
	return await _request({ url: `/api/auth/fetch/posts/${post_id}` })
}

export async function createPost({projectName, productName, title, content, thresholdMoney, isDirectSupport}) {
	let base;

	if (projectName) base = `projects/${projectName}`
	else if (productName) base = `products/${productName}`

	const config = {
		method: 'post',
		url: `/api/auth/fetch/${base}/posts`,
		withCredentials: true,
		data: { title, content, thresholdMoney, isDirectSupport },
	}

	return await _request(config)
}

export async function updatePost({post_id, body}) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/posts/${post_id}`,
		withCredentials: true,
		data: body,
	}

	return await _request(config)
}



export async function createCommentOnQnA({text, qna_id}) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/qnas/${qna_id}/comment`,
		data: { text, qna_id },
	}

	return await _request(config)
}



export async function createCommentOnPost({text, post_id}) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/posts/${post_id}/comment`,
		data: { text },
	}

	return await _request(config)
}

export async function fetchUserProfile() {
	return await _request({ url: '/api/users/profile/info' })
}

export async function updateUserProfile(body) {
	const config = {
		method: 'put',
		url: `/api/users/profile/info`,
		data: body,
	}

	return await _request(config)
}

export async function fetchProfile(user_id = '') {
	const config = {
		url: `/api/users/profile/${user_id}`,
	}

	console.log('config', config);
	return await _request(config)
}

export async function fetchSummary({ projectName, productName, user_id, purchase_id }) {
	const base = projectName ? `auth/fetch/projects/${projectName}`
		: productName ? `auth/fetch/products/${productName}`
		: user_id ? `users/${user_id}`
		: purchase_id ? `auth/fetch/purchases/${purchase_id}`
		: `unknown parameter`
	const config = {
		url: `/api/${base}/summary`,
	}
	return await _request(config)
}

export async function suggestProject(body) {
	const config = {
		method: 'post',
		url: `/api/mail/suggest`,
		data: body,
	}

	return await _request(config)
}

export async function search(q) {
	const config = {
		url: `/api/auth/fetch/search`,
		params: {
			q
		}
	}

	return await _request(config)
}

export async function deletePost({ post_id }) {
	const config = {
		method: 'delete',
		url: `/api/auth/fetch/posts/${post_id}`
	}

	return await _request(config)
}

export async function deleteComment({ post_id, qna_id, comment_index }) {
	let base = post_id ? `posts/${post_id}` : `qnas/${qna_id}`
	const config = {
		method: 'delete',
		url: `/api/auth/fetch/${base}/comment/${comment_index}`
	}

	return await _request(config)
}

export async function deleteQnA({ qna_id }) {
	const config = {
		method: 'delete',
		url: `/api/auth/fetch/qnas/${qna_id}`
	}

	return await _request(config)
}

export async function cancelPurchase({ purchase_id }) {
	const config = {
		method: 'delete',
		url: `/api/auth/fetch/purchases/${purchase_id}`
	}

	return await _request(config)
}

export async function processPurchase({ projectName, productName }) {
	const base = projectName ? `projects/${projectName}` : `products/${productName}`
	const config = {
		method: 'post',
		url: `/api/auth/fetch/${base}/processPurchase`
	}

	return await _request(config)
}

export async function shareProject(projectName, url) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/projects/${projectName}/share`,
		data: {
			link: url
		}
	}

	return await _request(config)
}
