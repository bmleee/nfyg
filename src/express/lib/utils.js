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

export function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 15;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
	randomstring += chars.substring(rnum,rnum+1);
	}
	//document.randform.randomfield.value = randomstring;
	return randomstring;
}
