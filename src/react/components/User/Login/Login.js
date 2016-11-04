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
				<button className="fb-login-btn" onClick={this._onFacebookClick}>
				<FontAwesome className="fb-login-icon" name='facebook' size='lg' />
				페이스북으로 로그인
				</button>
				<p className="login-more">또는</p>
				<div>
					<input type="text" className="user-login-id" name="user_id" placeholder="이메일" ref="user_id"/>
				</div>
				<div>
					<input type="password" className="user-login-password" name="user_password" placeholder="비밀번호" ref="user_password" autocomplete="off" />
				</div>
				<button className="login-btn" onClick={this._onClick}>LOG IN</button>
			</div>
		</div>
		)
	}
}

export default Login
