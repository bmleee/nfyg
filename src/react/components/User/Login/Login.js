import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

import { fetcherrormessage } from '../../../api/AppAPI'

import axios from 'axios'

import { facebook_login } from '../../../../lib/firebase'

class Login extends Component {
	
	state = {
		message: '',
	}
	
	async componentDidMount () {
          window.scrollTo(0, 0)
          
          const {
				user,
				data: {
					message
				}
			} = await fetcherrormessage()
        
        this.setState({
				message
			})
        
        }
	
	render() {
		
		const { message } = this.state
		
		// console.log('Login', this);
		return (
			<div className="login-page">
			<MetaTags>
		            <title>로그인 - 7Pictures</title>
		    </MetaTags>
			<div className="user-login">
			<img className="login-7pictures-logo" src="/assets/images/7pictures_logo.png" />
				<a href="/api/users/login-facebook">
					<button className="fb-login-btn">
						<FontAwesome className="fb-login-icon" name='facebook' size='lg' />
						페이스북으로 로그인
					</button>
				</a>

				<p className="login-more">또는</p>

				<form className="user-login-form" ref="form" method="post" action="/api/users/login" encType="multipart/form-data">
					{ message.length > 0 
					?  <div className="login-error-container">
							<p className="login-error-message">{ message }</p>
					   </div> 
					: null 
					}
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일" ref="email"/>
					</div>
					<div>
						<input type="password" className="user-login-password" name="password" placeholder="비밀번호" ref="password" autoComplete="off" />
					</div>
					<input type="submit" className="login-btn" value="LOG IN" onClick={this._onLocalClick} />
				</form>
				<div className="forgot-form">
				<Link to="/forgot"><button className="password-find">비밀번호를 잊으셨나요?</button></Link>
				</div>
				<p className="create-id-text">계정이 없으신가요?<Link to="/signup"><button className="create-id">새 계정 만들기</button></Link></p>
				{/* <div className="request-signup">홈페이지 서버에 문제가 생겨 회원가입 정보가 초기화 되었습니다. 다시 한번 회원가입을 해주시면 감사하겠습니다.</div> */}
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
		// // console.log(this)
		// // console.log(`ID: ${this.refs.email.value}`)
		// // console.log(`PW: ${this.refs.password.value}`)
	}

	_onFacebookClick = () => {
		facebook_login()
	}
}

export default Login
