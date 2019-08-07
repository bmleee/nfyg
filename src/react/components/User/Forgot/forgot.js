import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

import { fetchforgotmessage } from '../../../api/AppAPI'

import axios from 'axios'

import { facebook_login } from '../../../../lib/firebase'

class Forgot extends Component {
	
	state = {
		message_error: '',
		message_info: ''
	}
	
	async componentDidMount () {
          window.scrollTo(0, 0)
          
          const {
				user,
				data: {
					message_error,
					message_info
				}
			} = await fetchforgotmessage()
        
        this.setState({
				message_error,
				message_info
			})
        
    }
	
	render() {
		
		const { message_error,
				message_info } = this.state
		
		return (
			<div className="login-page">
			<MetaTags>
		            <title>비밀번호 변경 - 7Pictures</title>
		    </MetaTags>
			<div className="user-login">
			<img className="login-7pictures-logo" src="/assets/images/7pictures_logo.png" />

				<form className="user-login-form" ref="form" method="post" action="/api/users/forgot">
					{ message_error.length > 0
					?  <div className="login-error-container">
							<p className="login-error-message">{ message_error }</p>
					   </div> 
					: message_info.length > 0 
					?  <div className="forgot-info-container">
							<p className="forgot-info-message">{ message_info }</p>
					   </div> 
					:  <div className="reset-text">
						 가입하신 이메일 주소를 입력해주세요.
					   </div>
					}
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일" ref="email"/>
					</div>
					<input type="submit" className="login-btn" value="비밀번호 변경 이메일 받기"/>
				</form>
				
			</div>
		</div>
		)
	}
}

export default Forgot
