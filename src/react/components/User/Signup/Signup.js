import React, { Component } from 'react';
import 'whatwg-fetch'
import FontAwesome from 'react-fontawesome'

import { Link } from 'react-router';

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
	
	componentDidMount () {
          window.scrollTo(0, 0)
        }
    
    checkpass = () => {
    	let pass1 = document.getElementById('password');
    	let pass2 = document.getElementById('password-confirm');
    	
    	console.log(pass1);
    	console.log(pass2);
    	
    	let passcolor = "";
    	let failcolor = "#ff6666";
    	
    	if(pass1.value == pass2.value) {
    		pass2.style.borderColor = passcolor;
    	}
    	else {
    		pass2.style.borderColor = failcolor;
    	}
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
						<input type="email" className="user-login-id" name="email" placeholder="로그인 이메일" />
					</div>
					<div>
						<input type="password" className="user-login-password" id="password" name="password" placeholder="비밀번호" />
					</div>
					<div>
						<input type="password" className="user-login-password-confirm" id="password-confirm" name="password-confirm" onKeyUp={this.checkpass} placeholder="비밀번호 확인" />
					</div>
					<div>
						<input type="text" className="user-login-username" name="display_name" placeholder="닉네임" />
					</div>
					{/* <div>
						<input type="text" className="user-login-id" name="display_name" placeholder="닉네임" />
					</div> */}
					<div>
						<input type="submit" className="signup-btn" value="JOIN 7Pictures" />
						<div className="signup-agree">버튼을 눌러<Link to={`/termofuse`}><p className="signup-termofuse">이용약관</p></Link>에 동의합니다.</div>
					</div>
				</form>
			</div>
			</div>
		)
	}
}
