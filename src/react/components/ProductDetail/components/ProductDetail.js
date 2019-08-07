import React, { Component, PropTypes, Children } from 'react';
import ScrollToTop from 'react-scroll-up';
import { StickyContainer, Sticky } from 'react-sticky';

import Collapsible from 'react-collapsible';

import Modal from '~/src/react/components/react-awesome-modal';
import SweetAlert from 'sweetalert-react';
import update from 'immutability-helper'

import { createProductQnA } from '~/src/react/api/AppAPI'

import {
	ProductHeading,
	ProductTab,
} from './';

const scrollStyle = {
  cursor: 'pointer',
}

export default class ProductDetail extends Component {
	
	state = {
		visible : false,
        show: false,
        show2: false,
        loginerror: '로그인 후 시도해주세요!',
        contactsuccess: "문의가 접수되었습니다. 빠른 시일내에 답변드리겠습니다!"
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
    	
	    	let productName = this.props.abstract.productName;
			var Selected_type = document.getElementById( "contact-type-select" )
			let	title = Selected_type.options[Selected_type.selectedIndex].value
			let text = document.getElementById('contact-text').value
			
			let { response } = await createProductQnA({title, text, productName })
			
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
			loaded,
			abstract: {
				productName
			},
			qna: {
				recentQnA = false,	
			},
			funding,
			relatedContents,
			creator
		} = this.props; // TODO: product should be fetch in async way
		
		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()

		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})

		if(loaded) {
			return (
				<div className="project-detail">
					<ProductHeading  {...this.props} />

					<ProductTab productName={productName} recentQnA={recentQnA} />

					{ this.props.children /* Overview, Post, Ranking, QnA */ }
					<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>
					
					<div className="contact-container">
						{ !isLoggedIn ?
						<button className="contact-button" onClick={() => this.openModal2()}>창작자에게 문의하기</button>
						:
						<button className="contact-button" onClick={() => this.openModal()}>창작자에게 문의하기</button>
						}
					</div>
					
					<Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="400" effect="fadeInDown" onClickAway={() => this.closeModal()}>
						<div className="project-modal-header">
							<h3 className="project-modal-header-title">{creator.creatorName}에게 문의하기</h3>
							<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
						</div>
						<div className="project-modal-body">
						<div className="contact-type">문의 유형
							<select className="contact-type-select" id="contact-type-select" name="contact-type-select">
							  <option value="">문의유형</option>
							  <option value="리워드 문의">리워드 문의</option>
							  <option value="배송 문의">배송 문의</option>
							  <option value="주문/결제">주문/결제</option>
							  <option value="교환/환불">교환/환불</option>
							</select>
						</div>
						<div className="contact-content">문의 내용
							<textarea className="contact-content-textarea" type="textarea" id="contact-text"/>
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
					
					<div className="magazine-detail-related-contents-list">
						{ relatedContents.length > 0 ?
						<div className="magazine-detail-related-contents-underline">
							<h3>관련 콘텐츠</h3>
						</div>
						: null }
						<div className="magazine-detail-related-contents-list-post-container">
							{
								relatedContents && relatedContents.map(({
									title = 'sample title',
									imgSrc,
									link
								}, index) => (
									<a href={link} target="_blank">
										<div className="magazine-detail-related-contents-list-post-item">
											<div className="magazine-detail-related-contents-list-post-item-background" style={infoBackground(imgSrc)}>
												<span>{title}</span>
											</div>
										</div>
									</a>
								))
							}
						</div>
					</div>
					
				</div>
			)
		}
		else {
			return <div>Loading...</div>
		}
	}
}
