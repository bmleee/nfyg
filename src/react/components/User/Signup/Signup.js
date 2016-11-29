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

	render() {

		return (
			<div>

				<form ref="form" method="post" action="/api/users/signup" encType="multipart/form-data" onSubmit={this._submit}>
					<div>
						<label>Email:</label>
						<input type="email" name="email" />
					</div>
					<div>
						<label>Password:</label>
						<input type="password" name="password" />
					</div>
					<div>
						<label>이름:</label>
						<input type="text" name="user_name" />
					</div>
					<div>
						<label>닉네임:</label>
						<input type="text" name="nick_name" />
					</div>
					<div>
						<input type="submit" value="Sign up" />
					</div>
	
				</form>


			</div>
		)
	}
}
