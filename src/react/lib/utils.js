import { Display } from '../constants'

import 'whatwg-fetch'

export async function sign_request(file) {
  let res = await fetch(`/api/aws/sign?file_name=${file.name}&file_type=${file.type}`)
  return res.json()
}

export async function image_upload(file, signed_request, url) {
  const headers = {
    'x-amz-acl': 'public-read',
    'x-amz-server-side-encryption': 'AES256',
  }

  const options = {
    method: 'put',
    headers,
    mode: 'cors',
    body: file
  }

  fetch(signed_request, options)
    .then( res => {
      console.log(res);
    })

    .catch( e => {
      console.log(e);
    })


  let res = await fetch(signed_request, options)
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

export async function upload_file(file) {
  const data = new FormData(); // wrap the file to form-data
  data.append('file', file);

  const res = await fetch(`/api/test-api/upload/${file.name}`, {
    method: 'post',
    body: data,
  })

  return res.json()

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

export const displayType = (innerWidth) =>
  innerWidth > 900 ? Display.DESKTOP
    : innerWidth > 500 ? Display.TABLET
      : Display.MOBILE
