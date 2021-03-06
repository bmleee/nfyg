import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router';


// not used
// https://coderwall.com/p/56a9ja/uploading-to-s3-returns-signaturedoesnotmatch
import crypto from 'crypto'
export function getSignedRequest(file, AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET) {
	let now = new Date();
	let expires = Math.ceil((now.getTime() + 60000)/1000); // 60 seconds from now
	let amz_headers = "x-amz-acl:public-read";

	let put_request = "PUT\n\n"+file.type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+file.name;
	let signature = crypto.createHmac('AWS4-HMAC-SHA256', AWS_SECRET_KEY).update(put_request).digest('base64');
	signature = signature.replace('+','%2B')
	                                 .replace('/','%2F')
	                                 .replace('=','%3D');
	signature = encodeURIComponent(signature.trim());
	let url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+file.name;
	let credentials = {
	    signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
	    url: url
	};

	return credentials;
}

export function checkMimeType(mimeType) {
	const supportedTypes = ['png', 'jpg', 'jpeg', 'mpeg3']
  return supportedTypes.includes(mimeType) // require polyfill?
}

export function randomString(len, pre) {
	if (typeof len === 'string') {
		var tmp = len;
		len = pre;
		pre = tmp;
	}
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split('');
	var randomstring = pre || '';
	len = len || 15;
	for (var i=0; i<len; i++) {
		var idx = Math.floor(Math.random() * chars.length);
		randomstring += chars[idx];
	}
	//document.randform.randomfield.value = randomstring;
	return randomstring;
}

export function randomNumber(min, max = 0) {
	if (min > max) [min, max] = [max, min]
	return Math.floor(Math.random() * (max - min) + min)
}
