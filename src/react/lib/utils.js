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

export const displayType = (innerWidth) =>
  innerWidth > 900 ? Display.DESKTOP
    : innerWidth > 500 ? Display.TABLET
      : Display.MOBILE

/**
 * react-select option value to label
 * @param  {[type]} options     [description]
 * @param  {[type]} targetValue [description]
 * @return {[type]}             [description]
 */
export function value2label (options, targetValue) {
  for(let {value, label} of options) {
    if (value === targetValue) {
      console.log('returned: ', label)
      return label;
    }
  }
  return '';
}

/**
 * [date2string description]
 * @param  {Date}   date [description]
 * @return {string}      YYYY-MM-DD
 */
export function date2string (date) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  return date.toISOString().slice(0,10).replace(/-/g,".")
    .split('.').map(x => Number(x)).join('.');
}
