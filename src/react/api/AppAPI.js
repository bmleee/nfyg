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
		console.error('에러입니다');
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

export async function fetcherrormessage() {
	const config = {
		method: 'get',
		url: `/api/users/login`,
	}
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
}
export async function fetchsignupmessage() {
	const config = {
		method: 'get',
		url: `/api/users/signup`,
	}
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
export async function fetchforgotmessage() {
	const config = {
		method: 'get',
		url: `/api/users/forgot`,
	}
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
}
export async function fetchsubscribemessage() {
	const config = {
		method: 'get',
		url: `/api/users/subscribe`,
	}
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
}

export async function fetchUserAndData() {
	const config = {
		method: 'get',
		url: `/api/auth/fetch${window.location.pathname}`,
	}

	// console.log(`/api/auth/fetch${window.location.pathname}`);

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

export async function fetchUserAndDateCount(count) {
	const config = {
		method: 'get',
		url: `/api/auth/fetch${window.location.pathname}/${count}`,
	}

	console.log(`/api/auth/fetch${window.location.pathname}`);

	try {
		const response = await axios.request(config)
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

export async function createStore(body) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/store`,
		data: body,
	}

	return await _request(config)
}

export async function updateStore(storeLink, body) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/store/${storeLink}`,
		data: body,
	}

	return await _request(config)
}

export async function updateVaildcount(body) {
	const base = window.location.pathname

	const config = {
		method: 'put',
		url: `/api/auth/fetch${base}/validcount`,
		data: body,
	}

	return await _request(config)
}

export async function updateVaildcountSub(p_Name, body) {

	const config = {
		method: 'put',
		url: `/api/auth/fetch/${p_Name}/purchase/validcount`,
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
	// console.log('param', param);
	console.log('base', base);
	const config = {
		method: 'get',
		url: `/api/${base}${param}`,
	}

	return await _request(config)
}


export async function fetchRewardPurchaseInfo() {
	
	let base = `auth/fetch/${document.URL.match(/(projects|products)\/.+\//)[0]}`
	// console.log('param', param);
	console.log('base', base);
	const config = {
		method: 'get',
		url: `/api/${base}`,
	}
	
	console.log('config', config)

	return await _request(config)
}


// called /p/:pName/purchase
export async function purchaseReward({paymentIndex, rewardIndex, addressIndex, purchaseAmount, shippingFee, shippingDay, comment, reward, result_price, result_description}) {
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
			shippingDay,
			comment,
			reward,
			result_price,
			result_description,
		}
	}

	return await _request(config)
}

export async function Storepurchase({paymentIndex, itemIndex, addressIndex, shippingFee, seleted_items, result_price, result_description}) {
	const base = window.location.pathname // /store/:storeLink/purchase

	const config = {
		method: 'post',
		url: `/api/auth/fetch${base}`,
		data: {
			addressIndex,
			itemIndex,
			paymentIndex,
			shippingFee,
			seleted_items,
			result_price,
			result_description,
		}
	}

	return await _request(config)
}

export async function getStorepurchase(storeLink) {
	const config = {
		method: 'get',
		url: `/api/auth/fetch/store/${storeLink}/purchase`
	}
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
}

export async function updatePurchaseAddress({purchase_id, body}) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/purchases/${purchase_id}/address`,
		data: body,
	}

	return await _request(config)
}

export async function updatePurchasePayment({purchase_id, body}) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/purchases/${purchase_id}/payment`,
		data: body,
	}

	return await _request(config)
}

export async function updatePurchaseState({purchase_id, body}) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/purchases/${purchase_id}/state`,
		data: body,
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

export async function getPayment(payment) {
	const config = {
		method: 'get',
		url: `/api/users/payment`,
	}
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
}

export async function fetchlike() {
	let base = window.location.pathname
	base = base.replace("/post", "").replace("/faq", "").replace("/qna", "").replace("/ranking", "")
	
	const config = {
		method: 'get',
		url: `/api/auth/fetch${base}/like`,
	}
	
	try {
		const response = await axios.request(config)
		return response.data
	} catch (e) {
		console.error(`error ${e}`);
		return {error: e}
	}
	
	return await _request(config)
}

export async function likeProjectProduct({like_state}) {
	let base = window.location.pathname
	base = base.replace("/post", "").replace("/faq", "").replace("/qna", "").replace("/ranking", "")
	
	const config = {
		method: 'post',
		url: `/api/auth/fetch${base}/like`,
		data: {
			like_state
		}
	}
	return await _request(config)
}

export async function Deletelike(like_id) {
	let base = window.location.pathname
	base = base.replace("/post", "").replace("/faq", "").replace("/qna", "").replace("/ranking", "")
	
	const config = {
		method: 'delete',
		url: `/api/auth/fetch${base}/like/${like_id}`,
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

export async function createProductQnA({title, text, productName}) {
	let base = `products/${productName}`

	const config = {
		method: 'post',
		url: `/api/auth/fetch/${base}/directqnas`,
		data: { title, text },
	}

	return await _request(config)
}

export async function createStoreQnA({title, text, storeLink}) {
	let base = `store/${storeLink}`

	const config = {
		method: 'post',
		url: `/api/auth/fetch/${base}/qnas`,
		data: { title, text },
	}

	return await _request(config)
}

export async function createContactQnA({title, text}) {

	const config = {
		method: 'post',
		url: `/api/auth/fetch/qnas/contact`,
		data: { title, text }
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

export async function fetchProfileLikes() {
	const config = {
		url: `/api/users/profile/likelist`,
	}

	console.log('config', config);
	return await _request(config)
}

export async function fetchUserlist(user_id = '') {
	const config = {
		url: `/api/users/profile/userlist`,
	}

	console.log('config', config);
	return await _request(config)
}

export async function fetchContactQna( ) {
	const config = {
		method: 'get',
		url: `/api/users/profile/contactqna`,
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
	console.log('base', base);
	console.log('config', config);
	return await _request(config)
}

export async function fetchStoreSummary({ storeLink }) {
	const base = `auth/fetch/store/${storeLink}`
	const config = {
		url: `/api/${base}/summary`,
	}
	console.log('base', base);
	return await _request(config)
}

export async function fetchCotentSummary({ projectName }) {
	const base = projectName ? `auth/fetch/projects/${projectName}`
		: `unknown parameter`
	const config = {
		url: `/api/${base}`,
	}
	console.log('config', config);
	return await _request(config)
}

export async function fetchProductSummary({ productName }) {
	const base = productName ? `auth/fetch/products/${productName}`
		: `unknown parameter`
	const config = {
		url: `/api/${base}`,
	}
	console.log('config', config);
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

export async function suggestStore(body) {
	const config = {
		method: 'post',
		url: `/api/mail/suggestStore`,
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

export async function deleteContactComment({ post_id, qna_id, contact_comment_index }) {
	let base = post_id ? `posts/${post_id}` : `qnas/${qna_id}`
	const config = {
		method: 'delete',
		url: `/api/auth/fetch/${base}/contactcomment/${contact_comment_index}`
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

export async function cancelStorePurchase({ purchase_id }) {
	const config = {
		method: 'delete',
		url: `/api/auth/fetch/purchases/${purchase_id}/store`
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

export async function processPurchaseFailed({ projectName, productName }) {
	const base = projectName ? `projects/${projectName}` : `products/${productName}`
	const config = {
		method: 'post',
		url: `/api/auth/fetch/${base}/processPurchasefailed`
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

export async function createSponsor(body) {
	const config = {
		method: 'post',
		url: `/api/auth/fetch/sponsors/`,
		data: body,
	}

	return await _request(config)
}

export async function updateSponsor(sponsorName, body) {
	const config = {
		method: 'put',
		url: `/api/auth/fetch/sponsors/${sponsorName}`,
		data: body,
	}

	return await _request(config)
}

export async function checkEmail(email, body) {
	const config = {
		method: 'post',
		url: `/api/users/mailcheck/${email}`,
		data: {
			body : body
		}
	}

	return await _request(config)
}

export async function checkEmailAuth(email, body) {
	const config = {
		method: 'post',
		url: `/api/users/mailcheck_auth/${email}`,
		data: {
			body : body
		}
	}

	return await _request(config)
}

export async function checkNumber(email, body) {
	const config = {
		method: 'post',
		url: `/api/users/numbercheck/${email}`,
		data: {
			body : body
		}
	}

	return await _request(config)
}

export async function checkNumberAuth(email, body) {
	const config = {
		method: 'post',
		url: `/api/users/numbercheck_auth/${email}`,
		data: {
			body : body
		}
	}

	return await _request(config)
}

export async function sendConfirmSMSandEmail(title, number, email) {
	const config = {
		method: 'post',
		url: `/api/users/sendconfirmsmsandemail`,
		data: {
			title,
			number,
			email
		}
	}

	return await _request(config)
}

export async function MakeNoticeSMSandEmail(title, PorS, link) {
	const config = {
		method: 'post',
		url: `/api/users/makenoticesmsandemail`,
		data: {
			title,
			PorS,
			link
		}
	}

	return await _request(config)
}

export async function sendInvoiceSMSandEmail(title, shippingCompany, shippingCompany_link, email, number, items, invoice_number, name) {
	const config = {
		method: 'post',
		url: `/api/users/sendinvoicesmsandemail`,
		data: {
			title,
			shippingCompany,
			shippingCompany_link,
			number,
			email,
			items,
			invoice_number,
			name
		}
	}

	return await _request(config)
}

export async function sendAlimtalk_schedule(number, name, title, Dday, shippingDay) {
    let alim_target = number.replace( "0", "82");
    let msg_text2 = "안녕하세요, " + name + "님! " + title + " 프로젝트 후원예약이 완료되었습니다. 결제는 " + Dday + " 이후 1~2영업일 이내에 진행될 예정이고, 해당 리워드 예상 배송일은 " + shippingDay + " 입니다." // 7pictures_schedule2
	let invoice_link = "https://netflix-salon.co.kr/user/me"
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_schedule2",
			"reserveDt" : "00000000000000",
			"msg" : msg_text2,
			"smsKind" : "L",
			"msgSms" : "[7Pictures]안녕하세요, " + name + "님! " + title + " 프로젝트 후원예약이 완료되었습니다. 결제는 " + Dday + " 이후 1~2영업일 이내에 진행될 예정이고, 해당 리워드 예상 배송일은 " + shippingDay + " 입니다.",
			"smsSender" : "07042270065",
			"button1": {"name":"예약내역 확인하기", "type":"WL", "url_mobile": invoice_link},
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}

export async function sendAlimtalk_success(number, name, title, shippingDay) {
    let alim_target = number.replace( "0", "82");
    let msg_text = "안녕하세요, " + name + "님! " + title + " 프로젝트 예약결제가 성공적으로 진행되었습니다. 해당 리워드 예상 배송일은 " + shippingDay + " 입니다." // 7pictures_success
	let invoice_link = "https://netflix-salon.co.kr/user/me"
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_success",
			"reserveDt" : "00000000000000",
			"msg" : msg_text,
			"smsKind" : "L",
			"msgSms" : "[7Pictures]안녕하세요, " + name + "님! " + title + " 프로젝트 예약결제가 성공적으로 진행되었습니다. 해당 리워드 예상 배송일은 " + shippingDay + " 입니다.",
			"smsSender" : "07042270065"
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}

export async function sendAlimtalk_fail(number, name, title, fail_reason) {
    let alim_target = number.replace( "0", "82");
    let msg_text6 = "안녕하세요, " + name + "님! " + title + " 프로젝트 예약결제가 실패되었습니다. 실패원인은 " + fail_reason + " 이며 재결제 기간내에(5일) 조치를 취해주시면 결제가 성공적으로 진행될 예정입니다." // 7pictures_fail
	let invoice_link = "https://netflix-salon.co.kr/user/me"
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_fail",
			"reserveDt" : "00000000000000",
			"msg" : msg_text6,
			"smsKind" : "L",
			"msgSms" : "[7Pictures]안녕하세요, " + name + "님! " + title + " 프로젝트 예약결제가 실패되었습니다. 실패원인은 " + fail_reason + " 이며 재결제 기간내에(5일) 조치를 취해주시면 결제가 성공적으로 진행될 예정입니다.",
			"smsSender" : "07042270065"
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}

export async function sendAlimtalk_cancel(number, name, title) {
    let alim_target = number.replace( "0", "82");
    let msg_text5 = "안녕하세요, " + name + "님! " + title + " 프로젝트 후원예약이 취소되었습니다. 아쉽지만 다른 프로젝트에서 뵙겠습니다!" // 7pictures_cancel
    let invoice_link = "https://netflix-salon.co.kr/user/me"
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_cancel",
			"reserveDt" : "00000000000000",
			"msg" : msg_text5,
			"smsKind" : "L",
			"msgSms" : "[7Pictures]안녕하세요, " + name + "님! " + title + " 프로젝트 후원예약이 취소되었습니다. 아쉽지만 다른 프로젝트에서 뵙겠습니다!",
			"smsSender" : "07042270065"
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}

export async function sendAlimtalk_complete(number, name, title, shippingDay) {
    let alim_target = number.replace( "0", "82");
    let msg_text3 = "안녕하세요, " + name + "님! " + title + " 구매가 완료되었습니다. 배송은 매주 " + shippingDay + "에 진행됩니다." // 7pictures_complete2
	let invoice_link = "https://netflix-salon.co.kr/user/me"
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_complete2",
			"reserveDt" : "00000000000000",
			"msg" : msg_text3,
			"smsKind" : "L",
			"msgSms" : "[7Pictures]안녕하세요, " + name + "님! " + title + " 구매가 완료되었습니다. 배송은 매주 " + shippingDay + "에 진행됩니다.",
			"smsSender" : "07042270065",
			"button1": {"name":"구매내역 확인하기", "type":"WL", "url_mobile": invoice_link},
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}

export async function sendAlimtalk_shipping(number, name, title, shippingCompany, invoice_number, shippingCompany_link) {
    let alim_target = number.replace( "0", "82");
    let msg_text4 = "안녕하세요, " + name + "님! " + title + " 배송이 시작되었습니다. 배송사 : " + shippingCompany + " / 송장번호 : " + invoice_number // 7pictures_shipping
    let invoice_link = shippingCompany_link
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_shipping",
			"reserveDt" : "00000000000000",
			"msg" : msg_text4,
			"smsKind" : "L",
			"msgSms" : "[7Pictures]안녕하세요, " + name + "님! " + title + " 배송이 시작되었습니다. 배송사 : " + shippingCompany + " / 송장번호 : " + invoice_number,
			"smsSender" : "07042270065",
			"button1": {"name":"송장번호 검색하기", "type":"WL", "url_mobile": invoice_link},
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}

export async function sendAlimtalk_numbercheck(checkNumber, number) {
	let alim_target = number.replace(/\-/g,'')
    alim_target = alim_target.replace( "0", "82");
    
    let msg_text7 = "인증번호 [" + checkNumber + "]를 입력해주세요." // 7pictures_numbercheck
	
	axios.post('https://alimtalk-api.bizmsg.kr/v1/sender/send', 
		[{
			"userId" : "7pictures",
			"message_type" : "at",
			"phn" : alim_target,
			"profile" : "88e9518e8349ba77f6454d1ceb167523b60d616d",
			"tmplId" : "7pictures_numbercheck",
			"reserveDt" : "00000000000000",
			"msg" : msg_text7,
			"smsKind" : "S",
			"msgSms" : "[7Pictures]인증번호 [" + checkNumber + "]를 입력해주세요.",
			"smsSender" : "07042270065",
		}],
		{
	        headers: { 'Content-Type': 'Application/json' }
		}
	)
	.then(function (response) {
		console.log('sendalimtalk_response', response);
	})
	.catch(function (error) {
		console.log('sendalimtalk_error', error);
	});
}