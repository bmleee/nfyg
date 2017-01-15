import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';

import axios from 'axios'

import { facebook_login } from '../../../../lib/firebase'

class Login extends Component {

	render() {
		console.log('Login', this);
		return (
			<div className="login-page">
			<div className="user-login">
			<img className="login-7pictures-logo" src="//52.78.180.103:8080/assets/images/7pictures_logo.png" />
				<a href="/api/users/login-facebook">
					<button className="fb-login-btn">
						<FontAwesome className="fb-login-icon" name='facebook' size='lg' />
						페이스북으로 로그인
					</button>
				</a>

				<p className="login-more">또는</p>

				<form className="user-login-form" ref="form" method="post" action="/api/users/login" encType="multipart/form-data">
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일" ref="email"/>
					</div>
					<div>
						<input type="password" className="user-login-password" name="password" placeholder="비밀번호" ref="password" autoComplete="off" />
					</div>
					<button className="password-find">비밀번호 찾기</button>
					<input type="submit" className="login-btn" value="LOG IN" onClick={this._onLocalClick} />
				</form>
				<p className="create-id-text">계정이 없으신가요?<Link to="/signup"><button className="create-id">새 계정 만들기</button></Link></p>
			</div>
		</div>
		)
	}

	_onLocalClick = (e) => {
		// e.preventDefault()

		// const form = new FormData()
		//
		// form.append('email', this.refs.email.value);
		// form.append('password', this.refs.password.value);
		//
		//
		//
		// // form.append('refer')
		//
		// console.log(this)
		// console.log(`ID: ${this.refs.email.value}`)
		// console.log(`PW: ${this.refs.password.value}`)
	}

	_onFacebookClick = () => {
		facebook_login()
	}
}

export default Login
