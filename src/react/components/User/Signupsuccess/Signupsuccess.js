import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

import axios from 'axios'

class Signupsuccess extends Component {
	
	render() {
		return (
		<div className="login-page">
			<MetaTags>
		            <title>회원가입 성공 - 7Pictures</title>
		    </MetaTags>
			<div className="user-login">
				<img className="login-7pictures-logo" src="/assets/images/7pictures_logo.png" />
				<div className="signup-success-container">
					<p className="signup-success-message">회원가입에 성공하였습니다.</p>
					<p className="signup-success-message">로그인하여 예술후원을 시작해보세요!</p>
				</div>
				<Link to="/login">
					<button className="fb-login-btn">로그인 하러 가기</button>
				</Link>
			</div>
		</div>
		)
	}
}

export default Signupsuccess
