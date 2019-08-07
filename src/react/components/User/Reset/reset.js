import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

import { fetchJSONFile, fetchUserAndData, fetchProfile } from '../../../api/AppAPI'

import axios from 'axios'

import { facebook_login } from '../../../../lib/firebase'

class Reset extends Component {
	
	checkpass = () => {
    	let pass1 = document.getElementById('password');
    	let pass2 = document.getElementById('password-confirm');
    	
    	// console.log(pass1);
    	// console.log(pass2);
    	
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
		
		let resetPassword = this.props.params.token;
		
		// console.log('resetPassword', resetPassword);
		
		return (
			<div className="login-page">
			<MetaTags>
		            <title>비밀번호 변경 - 7Pictures</title>
		    </MetaTags>
			<div className="user-login">
			<img className="login-7pictures-logo" src="/assets/images/7pictures_logo.png" />

				<form className="user-login-form" ref="form" method="post" action={'/api/users/reset/'+resetPassword}>
					<div className="reset-text">
						변경하실 비밀번호를 입력해주세요.
					</div>
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일"/>
					</div>
					<div>
						<input type="password" className="user-login-id" id="password" name="password" placeholder="새로운 비밀번호"/>
					</div>
					<div>
						<input type="password" className="user-login-id" id="password-confirm" name="confirm" onKeyUp={this.checkpass} placeholder="새로운 비밀번호 확인"/>
					</div>
					<input type="submit" className="login-btn" value="비밀번호 변경"/>
				</form>
				
			</div>
		</div>
		)
	}
}

export default Reset
