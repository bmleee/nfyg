import React, { Component } from 'react';
import 'whatwg-fetch'

const API_URL = '/api/test-api/signup'
const API_HEADERS = {
	// 'Content-Type': 'multipart/form-data; charset=utf-8',
	'Content-Type': false,
	'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
}

export default class Signup extends Component {

	_submit = async (e) => {
		e.preventDefault();

		let email = this.refs.email.value;
		let pw = this.refs.pw.value;
		let display_name = this.refs.display_name.value;
		let photoURL = '/assets/images/user_default.png';

		let form = new FormData(this.refs.form);

		try {

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

	render() {

		return (
			<div>

				<form ref="form" action="" onSubmit={this._submit}>
					<input type="email" placeholder="Email" ref="email" name="email"/>
					<input type="password" placeholder="Password" ref="pw" name="pw"/>
					<input type="text" placeholder="이름" ref="display_name" name="display_name"/>
					<input type="hidden" ref="display_name" value="/assets/images/user_default.png"/>
					<input type="submit" value="회원가입"/>
					{/* <button onClick={this._submit}>회원가입</button> */}
				</form>


			</div>
		)
	}
}
