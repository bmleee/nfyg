import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

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
			<div className="login-page">
			<div className="user-login">
			<img className="login-7pictures-logo" src="//52.78.180.103:8080/assets/images/7pictures_logo.png" />
				<button className="fb-login-btn" onClick={this._onFacebookClick}>
					<FontAwesome className="fb-login-icon" name='facebook' size='lg' />
					페이스북으로 로그인
				</button>
				<p className="login-more">또는</p>

				<form ref="form" method="post" action="/api/users/login" encType="multipart/form-data">
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일" ref="email"/>
					</div>
					<div>
						<input type="password" className="user-login-password" name="password" placeholder="비밀번호" ref="password" autoComplete="off" />
					</div>
					<input type="submit" className="login-btn" value="LOG IN" />
				</form>
			</div>
		</div>
		)
	}
}

export default Login
