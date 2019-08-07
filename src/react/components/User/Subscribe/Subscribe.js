import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

import { fetchJSONFile, fetchUserAndData, fetchsubscribemessage } from '../../../api/AppAPI'

import axios from 'axios'

import { facebook_login } from '../../../../lib/firebase'

import Checkbox from 'rc-checkbox';

import update from 'immutability-helper'
import Modal from '~/src/react/components/react-awesome-modal';


class Subscribe extends Component {
	
	state = {
		message_error: '',
		message_success: '',
		visible : false,
	}
	
	openModal = () => {
		this.setState(update(this.state, {
			visible: { $set: true },
		}))
	}

	closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
		}))
	}
	
	async componentDidMount () {
          window.scrollTo(0, 0)
          
          const {
				user,
				data: {
					message_success,
					message_error
				}
			} = await fetchsubscribemessage()
        
        	this.setState({
				message_success,
				message_error
			})
        }
	render() {
		const { message_success, message_error } = this.state
		
		return (
		<div className="login-page">
			<MetaTags>
		            <title>구독하기 - 7Pictures</title>
		    </MetaTags>
			<div className="user-login">
			<img className="login-7pictures-logo" src="/assets/images/7pictures_logo.png" />
				<form className="user-login-form" method="post" action="/api/users/subscribe" ref="form">
					{ message_success.length > 0
					? <div className="forgot-info-container">
							<p className="forgot-info-message">{ message_success }</p>
					  </div> 
					: null
					}
					{ message_error.length > 0 
					?  <div className="login-error-container">
							<p className="login-error-message">{ message_error }</p>
					   </div> 
					: null 
					}
					<div>
						<input type="email" className="user-login-id" name="email" placeholder="이메일" />
					</div>
					<input type="submit" className="login-btn" value="구독하기"/>
					<div className="subscribe-agree"><Checkbox className="POST-checkbox" name="checkbox" /><Link to={`/termofuse`}><p className="signup-termofuse">이용약관</p></Link> 및 <p className="signup-termofuse" onClick={() => this.openModal()} >개인정보처리방침</p>에 동의합니다.</div>
				</form>
				
				<Modal className="card-add-modal" visible={this.state.visible} width="450" height="460px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
				<div className="signup-modal-container">
					<div className="terms-item-container">
                    <h4 className="terms-small-title">제2조 개인정보의 수집</h4>
                    <p className="terms-elements">
                    이용자로부터 다음과 같은 개인정보를 수집하고 있습니다.
                    모든 이용자는 회사가 제공하는 서비스를 이용할 수 있고, 회원가입을 통해 더욱 다양한 서비스를 
                    제공받을 수 있습니다. 이용자의 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 
                    사실을 알리고 동의를 구하도록 하겠습니다. 수집방법에는 홈페이지(회원가입), 서비스 이용, 이벤트 
                    응모, 고객센터, 팩스, 전화 등이 있습니다.
                    </p>
                    <p className="terms-elements">
                    회원 가입 시 아래와 같은 개인정보가 수집 됩니다.
                    (필수) 이름 또는 닉네임, 프로필사진, 이메일주소, 비밀번호 및 타 SNS계정과 연계된 친구목록
                    또한, 서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
                    – 접속IP주소, 쿠키, 방문 일시, 지불정보 및 기록, 서비스 이용 기록, 불량 이용 기록
                    </p>
	                </div>
	                <div className="terms-item-container">
	                    <h4 className="terms-small-title">제3조 개인정보의 이용 및 목적</h4>
	                    <p className="terms-elements">
	                    이용자의 개인정보를 다음과 같은 목적으로만 이용하며, 목적이 변경될 경우에는 반드시 사전에 
	                    이용자에게 동의를 구하도록 하겠습니다.
	                    </p>
	                    <p className="terms-elements">
	                    1. 회원관리
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 이용자 식별, 가입의사 확인, 불량회원 부정한 이용 방지
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 친구추천, 친구에게 활동내역 알림 및 이용자 검색/등록
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 다양한 서비스 제공,문의사항 또는 불만 처리, 공지사항 전달
	                    </p>
	                    <p className="terms-elements">
	                    2. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 이용자와 약속한 콘텐츠 및 서비스 제공, 유료 콘텐츠 및 서비스 구매 및 이용 시 요금 정산
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 금융거래 본인 인증 및 금융 서비스
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 신규 콘텐츠 및 서비스 개발,이벤트 행사 시 정보 전달,마케팅 및 광고 등에 활용
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 서비스 이용 기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 맞춤형 서비스 제공, 서비스 개선에 활용
	                    </p>
	                    <p className="terms-elements">
	                    3. 개인정보 이용기간
	                    </p>
	                    <p className="terms-elements">
	                    이용자의 개인정보를 수집 및 이용 목적, 이용 기간에만 제한적으로 이용하고 있으며, 
	                    탈퇴를 요청하거나 동의를 철회하는 경우 지체 없이 파기합니다. 다만 관계법령에 의해 보관해야 
	                    하는 정보는 법령이 정한 기간 동안 보관합니다.
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 서비스 이용 관련 개인정보(로그인기록) 보존 기간: 3개월
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 표시/광고에 관한 기록 보존 기간: 6개월
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 계약 또는 청약철회 등에 관한 기록 보존 기간: 5년
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 대금결제 및 재화 등의 공급에 관한 기록 보존 기간: 5년
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 소비자의 불만 또는 분쟁처리에 관한 기록 보존 기간 : 3년
	                    </p>
	                    <p className="terms-elements-sub">
	                    - 신용정보의 수집, 처리 및 이용 등에 관한 기록: 3년
	                    </p>
	                </div>
	                <div className="modal-card-add-container">
						<button className="modal-card-add" onClick={() => this.closeModal()}>확 인</button>
					</div>
				</div>
			</Modal>
			</div>
		</div>
		)
	}
}

export default Subscribe
