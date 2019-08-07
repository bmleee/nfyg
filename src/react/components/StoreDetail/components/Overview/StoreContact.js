import React, { Component, PropTypes } from 'react';
import { fetchUserAndData, createStoreQnA } from '~/src/react/api/AppAPI'
import { Link } from 'react-router';

import update from 'immutability-helper'
import Modal from '~/src/react/components/react-awesome-modal';
import SweetAlert from 'sweetalert-react';

class StoreContact extends Component {
	state = {
		abstract: {},
		storeInfo: {},
		
        visible : false,
        show: false,
        show2: false,
        loginerror: '로그인 후 시도해주세요!',
        contactsuccess: '',
    }
	
	async componentDidMount() {
		const res = await fetchUserAndData()
		const {
			user,
			data: {
				store
			}
		} = res

		this.props.appUtils.setUser(user)
		this.setState({
			...store,
			loaded: true,
			contactsuccess: store.abstract.title + "에게 문의가 접수되었습니다! 우측 상단 '문의내역'에서 확인해주세요!"
		})
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
    	
    	let storeLink = this.state.abstract.storeLink
		var Selected_type = document.getElementById( "contact-type-select-inqna" )
		let	title = Selected_type.options[Selected_type.selectedIndex].value
		let text = document.getElementById('contact-text-inqna').value
		let { response } = await createStoreQnA({title, text, storeLink})
		
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
			abstract,
			storeInfo
		} = this.state;
		
		let {
			isLoggedIn
		} = appUtils.getUser()
		
		let infoBackground = {
			backgroundImage: `url("${abstract.main_img}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}

		return (
			<div className="store-overview">
				
				<div className="store-contact-container">
					{ !isLoggedIn ?
					<button className="store-contact-button" onClick={() => this.openModal2()}>{abstract.title}에게 문의하기</button>
					:
					<button className="store-contact-button" onClick={() => this.openModal()}>{abstract.title}에게 문의하기</button>
					}
				</div>
				
					<Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="400" effect="fadeInDown" onClickAway={() => this.closeModal()}>
						<div className="project-modal-header">
							<h3 className="project-modal-header-title">{abstract.title}에게 문의하기</h3>
							<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
						</div>
						<div className="project-modal-body">
						<div className="contact-type">문의 유형
							<select className="contact-type-select" id="contact-type-select-inqna" name="contact-type-select-inqna">
							  <option value="제품 문의">제품 문의</option>
							  <option value="배송 문의">배송 문의</option>
							  <option value="주문/결제">주문/결제</option>
							  <option value="교환/환불">교환/환불</option>
							</select>
						</div>
						<div className="contact-content">문의 내용
							<textarea className="contact-content-textarea" type="textarea" id="contact-text-inqna" />
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
		)
	}
	
}

export default StoreContact;
