// import fetch from 'isomorphic-fetch'
import 'whatwg-fetch'

export async function sign_request(file) {
	// res: { signed_request, url }
	const res = await fetch(`/api/aws/sign?file_name=${file.name}&file_type=${file.type}`)

	return res.json()
}

export async function image_upload(file, signed_request, url) {
	const headers = {
		'Access-Control-Allow-Origin': 'http://localhost:3003',
		'Access-Control-Allow-Methods': 'POST',
		'Access-Control-Allow-Headers': 'x-amz-acl',
		'x-amz-acl': 'public-read',
	}

	const options = {
		method: 'post',
		headers,
		mode: 'cors',
		body: file
	}

	const res = await fetch(signed_request, options)

	return res.json()

	// var xhr = new XMLHttpRequest()
	// xhr.open("PUT", signed_request)
	// xhr.setRequestHeader('x-amz-acl', 'public-read')
	// xhr.setRequestHeader('Access-Control-Allow-Origin','http://localhost:3003/')
	// xhr.onload = function() {
	// 	if (xhr.status === 200) {
	// 		console.log('upload success');
	// 	}
	// }
	//
	// xhr.send(file)
}
