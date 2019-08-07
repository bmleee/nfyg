import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'; 
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import Modal from '~/src/react/components/react-awesome-modal';
import SweetAlert from 'sweetalert-react';
import update from 'immutability-helper'

import { createContactQnA } from '~/src/react/api/AppAPI'

class Mobilefootersub extends Component {
	
	state = {
        visible : false,
        show: false,
        show2: false,
        loginerror: '로그인 후 시도해주세요!',
        contactsuccess: "문의가 접수되었습니다. 빠른 시일내에 답변드리겠습니다!",
        textarea : "프로젝트명: \n문의내용: "
    }
	
	openModal() {
	    this.setState({
	        visible : true
	    });
	  }
	
	openModal2() {
	    this.setState({
	        show : true
	    });
	  }

    closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
			show: { $set: false }
		}))
	}
	
	closeModal2 = () => {
		this.setState(update(this.state, {
			show2: { $set: false }
		}))
	}
	
	onClickContact = () => {
    	return async () => {
    	
		var Selected_type = document.getElementById( "contact-type-select-mobile-sub" )
		let	title = Selected_type.options[Selected_type.selectedIndex].value
		let text = document.getElementById('contact-text-mobile-sub').value
		let { response } = await createContactQnA({title, text })
		
		this.setState(update(this.state, {
			show2: { $set: true }
		}))
		document.getElementById('contact-text').value = ""
		Selected_type.options[Selected_type.selectedIndex].value = ""
		
		this.props._newQnA(response)
   
    	}
	}
	
    
    render() {
         let {
			canEdit,
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()
		
     return (
         <div className="footer-mobile">
        	<div className="footer-mobile-contact">
        		{ !isLoggedIn ?
				<button className="footer-mobile-contact-button" onClick={() => this.openModal2()}>1:1 문의하기</button>
				:
				<button className="footer-mobile-contact-button" onClick={() => this.openModal()}>1:1 문의하기</button>
				}
				
				<Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="400" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="project-modal-header">
						<h3 className="project-modal-header-title">1:1 문의하기</h3>
						<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
					</div>
					<div className="project-modal-body">
					<div className="contact-type">문의 유형
						<select className="contact-type-select" id="contact-type-select-mobile-sub" name="contact-type-select-mobile-sub">
						  <option value="프로젝트">프로젝트</option>
						  <option value="리워드">리워드</option>
						  <option value="리워드">주문/결제</option>
						  <option value="배송">배송 문의</option>
						  <option value="교환/환불">교환/환불</option>
						</select>
					</div>
					<div className="contact-content">문의 내용
						<textarea className="contact-content-textarea" type="textarea" id="contact-text-mobile-sub" value={this.state.textarea} onChange={e => this.setState({ textarea : e.target.value })}/>
					</div>
					</div>
					<div className="project-modal-footer">
						<a className="project-modal-header-save-container" onClick={this.onClickContact()}><button type="submit" className="project-modal-header-save" onClick={() => this.closeModal()}>보내기</button></a>
					</div>
				</Modal>
					
				<SweetAlert
		          show={this.state.show}
		          title=""
		          text={this.state.loginerror}
		          onConfirm={this.closeModal}
		          confirmButtonText="확 인"
		        />
		        <SweetAlert
		          show={this.state.show2}
		          title=""
		          text={this.state.contactsuccess}
		          onConfirm={this.closeModal2}
		          confirmButtonText="확 인"
		        />
		        
        	</div>
         
			<div className="footer-mobile-first">
				<div className="Link_sub_div"><Link to={`/about`}>
					<p className="footer-mobile-text-first">서비스 소개</p>
				</Link></div>
				<div className="Link_sub_div"><Link to={`/termofuse`}>
					<p className="footer-mobile-text-first">이용약관</p>
				</Link></div>
				<div className="Link_sub_div"><Link to={`/privacy`}>
					<p className="footer-mobile-text-first">개인정보처리방침</p>
				</Link></div>
				<div className="Link_sub_div"><Link to={`/subscribe`}>
					<p className="footer-mobile-text-last">구독하기</p>
				</Link></div>
			</div>
			
			<div className="footer-mobile-second">
				<a href="https://www.facebook.com/7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-facebook" />
				</div>
				</a>
				
				<a href="https://www.instagram.com/seven__pictures/" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-instagram" />
				</div>
				</a>
	
				<a href="http://plus.kakao.com/home/@7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-kakaotalk"><KakaoImage className="footer-kakao-icon" width={19} height={19} /></button>
				</div>
				</a>
	
				<a href="http://blog.naver.com/7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-blog" />
				</div>
				</a>
				
				<div className="footer-mobile-empty">
				</div>
			</div>
		</div>
         )
    }
}
export default Mobilefootersub;
