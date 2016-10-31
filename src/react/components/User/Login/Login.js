import React, { Component, PropTypes } from 'react'

import { facebook_login } from '../../../../lib/firebase'

class Login extends Component {
	_onClick = () => {
		console.log(this)
		console.log(`ID: ${this.refs.user_id.value}`)
		console.log(`PW: ${this.refs.user_password.value}`)
	}

	_onFacebookClick = () => {
		facebook_login()
	}

	render() {
		return (
			<div className="user-login">
				<div className="user-login-id">
					<span>ID</span>
					<input type="text" name="user_id" ref="user_id"/>
				</div>
				<div className="user-login-password">
					<span>PW</span>
					<input type="password" name="user_password" ref="user_password" autocomplete="off" />
				</div>
				<button onClick={this._onClick}>Login</button>
				<button onClick={this._onFacebookClick}>페이스북으로 로그인</button>
			</div>

		)
	}
}

export default Login
