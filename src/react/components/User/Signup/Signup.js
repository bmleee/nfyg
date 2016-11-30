import React, { Component } from 'react';
import 'whatwg-fetch'
import FontAwesome from 'react-fontawesome'

import { facebook_login } from '../../../../lib/firebase'

const API_URL = '/api/test-api/signup'
const API_HEADERS = {
	// 'Content-Type': 'multipart/form-data; charset=utf-8',
	'Content-Type': false,
	'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
}

export default class Signup extends Component {

	_submit = async (e) => {
		// e.preventDefault(); // TODO: remove comment to encrypt password

		let email = this.refs.email.value;
		let pw = this.refs.pw.value; // TODO: encrypt password
		let display_name = this.refs.display_name.value;
		let nick_name = this.refs.nick_name.value;
		let photoURL = '/assets/images/user_default.png';

		let form = new FormData(this.refs.form);

		try {

			// TODO: fix API_URL correctly
			const response = await fetch(API_URL, {
				method: 'post',
				credentials: 'include',
				headers: API_HEADERS,
				body: form
			})

			const result = await response.json()

		} catch (e) {
			console.log('signin fails!');
			console.error(e);
		} finally {

		}
	}
	
	_onFacebookClick = () => {
		facebook_login()
	}

	render() {

		return (
			<div className="login-page">
			<div className="user-login">
			<img className="login-7pictures-logo" src="//52.78.180.103:8080/assets/images/7pictures_logo.png" />
				<button className="fb-login-btn" onClick={this._onFacebookClick}>
					<FontAwesome className="fb-login-icon" name='facebook' size='lg' />
					페이스북으로 회원가입
				</button>
				<p className="login-more">또는</p>
				
				<form ref="form" method="post" action="/api/users/signup" encType="multipart/form-data" onSubmit={this._submit}>
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일" />
					</div>
					<div>
						<input type="password" className="user-login-password" name="password" placeholder="비밀번호" />
					</div>
					<div>
						<input type="text" className="user-login-username" name="user_name" placeholder="이름" />
					</div>
					{/* <div>
						<input type="text" className="user-login-id" name="nick_name" placeholder="닉네임" />
					</div> */}
					<div>
						<input type="submit" className="login-btn" value="JOIN 7Pictures" />
					</div>
				</form>
			</div>
			</div>
		)
	}
}
