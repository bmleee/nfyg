import React, { Component, PropTypes } from 'react'
import MetaTags from 'react-meta-tags'

import update from 'immutability-helper'
import { Link } from 'react-router'

import { date2string } from '~/src/react/lib/utils'
import { fetchUserAndData, suggestStore } from '../../../api/AppAPI'

import Modal from '~/src/react/components/react-awesome-modal';
import SweetAlert from 'sweetalert-react';

class StartStore extends Component {
    state = {
		isLoggedIn : false,
		displayName: '',
		visible: false,
		ok_visible2: false
	}
	
	openModal() {
		this.setState({
			visible : true
		});
	}
	
	closeModal() {
		this.setState({
			visible : false
		});
	}
	
	suggestModal() {
		this.setState({
			visible : false,
			ok_visible2 : true
		});
	}
	
	closeModal2 = () => {
		this.setState(update(this.state, {
			ok_visible2: { $set: false }
		}))
	}
	
	async onClickSuggest() {
		let body = {
			contact: document.getElementById('suggest-store-contact').value,
			email: document.getElementById('suggest-store-email').value,
			name: document.getElementById('suggest-store-name').value,
			text: document.getElementById('suggest-store-text').value,
			items: document.getElementById('suggest-store-items').value,
			link: document.getElementById('suggest-store-link').value,
		}
		let r = await suggestStore(body)
	}
	  
    async componentDidMount () {
    	window.scrollTo(0, 0)
  		const {
            user
        } = await fetchUserAndData();
            
  		this.props.appUtils.setUser(user)
  		this.setState({
            isLoggedIn : user.isLoggedIn,
            displayName : user.displayName
      })
    }
    
    render() {
        let StartBackground = {
    			backgroundImage: `url(/assets/images/start_test3.jpg)`,
    			backgroundSize: 'cover',
    			backgroundPosition: 'center center',
    			backgroundRepeat: 'no-repeat'
    		}
        
        return (
            <div className="start-container">
            
            	<div className="start-body-header">
				    <div className="start-body-container">
				        <div className="start-body-space-20"></div>
				        <div className="start-funding-header-left">
      					  <img className="start-body-img-70" src="/assets/images/start0.png" />
      					</div>
      					<div className="start-funding-header-right">
      					  <div className="start-funding-header-title">월요예술상점</div>
      					  <div className="start-body-space-10"></div>
  						  <div className="start-pc">
  							<div className="start-store-header-text">월요예술상점은 매주 한 차례 배송되는 온라인 상시 판매 스토어 입니다.</div>
  							<div className="start-store-header-text">지속적인 판매는 기본, 재고와 배송의 걱정 없이 작업에만 집중하세요.</div>
  						  </div>
  						  <div className="start-mobile">
  							<div className="start-store-header-text">월요예술상점은 매주 한 차례 배송되는 온라인 상시 판매 스토어 입니다. 지속적인 판매는 기본, 재고와 배송의 걱정 없이 작업에만 집중하세요.</div>
      				      </div>
      					</div>
      					<div className="start-body-space-20"></div>
      			    </div>
				</div>
            
			    <div className="start-body-grey">
			    <div className="start-body-container">
					<div className="start-body-1-of-3">
					    <img className="start-body-icon" src="/assets/images/store_start1.png" />
					    <div className="start-body-text-center-bold">
			                펀딩이 끝나고 재고가 남았어요.
					    </div>
					    <div className="start-body-space-10"></div>
					    <div className="start-body-text-center">
					        최소수량에 맞춰 제작했더니 재고가 남았어요. 더 알리고 싶은데 어디서 소개할 수 있을까요?
					    </div>
					    <div className="start-body-space-30"></div>
    				</div>
    				
    				<div className="start-body-1-of-3">
    				    <img className="start-body-icon" src="/assets/images/store_start2.png" />
					    <div className="start-body-text-center-bold">
			                지속적으로 창작을 도울 수입이 필요해요! 
					    </div>
					    <div className="start-body-space-10"></div>
					    <div className="start-body-text-center">
					        펀딩은 좋은 방법이지만 일회성이고 한번에 한 프로젝트밖에 못해서 아쉬워요.
					    </div>
					    <div className="start-body-space-30"></div>
    				</div>
    				
    				<div className="start-body-1-of-3">
    				    <img className="start-body-icon" src="/assets/images/store_start3.png" />
					    <div className="start-body-text-center-bold">
			                배송이랑 수수료가 부담스러워요.
					    </div>
					    <div className="start-body-space-10"></div>
					    <div className="start-body-text-center">
					        디자인 제품 편집샵에 입점했는데 수수료 부담이 큽니다. 판매와 배송이 끝나면 남는게 없어요.
					    </div>
					    <div className="start-body-space-30"></div>
    				</div>
    				
    			</div>
    			</div>
    			
			    <div className="start-body-container">
			        <div className="start-body-space-20"></div>
  					<div className="start-body-1-of-1">
  						<div className="start-body-funding-title">
    					</div>
  					  <div className="start-pc">
      					  <div className="start-body-header-sub-title">지속적인 수입과 홍보는 기본!</div>
      					  <div className="start-body-header-sub-title">제품과 프로젝트를 하나씩 쌓아나가며 나만의 브랜드를 만듭니다.</div>
      				    </div>
      				  <div className="start-mobile">
  					  <div className="start-body-header-sub-title">지속적인 수입과 홍보는 기본! 제품과 프로젝트를 하나씩 쌓아나가며 나만의 브랜드를 만듭니다.</div>
  				    </div>
  					</div>
  					<div className="start-body-space-20"></div>
  					<div className="start-body-space-62"></div>
  			    </div>
				
				<div className="start-body-grey">
				<div className="start-body-container">
					<div className="start-body-1-of-2-center">
					    <img className="start-body-icon" src="/assets/images/store_start4.png" />
    				</div>
    				
    				<div className="start-body-1-of-2">
					    <div className="start-body-sub-title">
      					매주 '단 하루' 선택한 요일에 배송을 진행합니다.
  					    </div>
    				</div>
    			</div>
    			</div>
    			
    			
    			<div className="start-store-benefits">
    			    <div className="start-body-1-of-1">
    			        <div className="start-body-funding-title">
    					   Benefit
    					  </div>
    				</div>
    				<div className="start-body-space-20"></div>
    			    <div className="start-store-benefits-padding">
        			    <div className="start-store-benefits-element">
        			        <div className="start-store-benefits-text">전담 매니저 배정 및 상점 브랜딩 컨설팅</div>
        			    </div>
        			</div>
        			<div className="start-store-benefits-padding">
        			    <div className="start-store-benefits-element">
        			        <div className="start-store-benefits-text">주 1회 배송과 편리한 구매자/후원자 관리</div>
        			    </div>
    			    </div>
    			    <div className="start-store-benefits-padding">
        			    <div className="start-store-benefits-element">
        			        <div className="start-store-benefits-text">7Pictures 홍보/마케팅 채널 활용</div>
        			    </div>
    			    </div>
    			    <div className="start-store-benefits-padding">
        			    <div className="start-store-benefits-element">
        			        <div className="start-store-benefits-text">신제품 크라우드펀딩 진행 및 재고소진</div>
        			    </div>
    			    </div>
    			    <div className="start-store-benefits-padding">
        			    <div className="start-store-benefits-element">
        			        <div className="start-store-benefits-text">높은 플랫폼 자유도와 낮은 수수료</div>
        			    </div>
    			    </div>
    			    <div className="start-store-benefits-padding">
        			    <div className="start-store-benefits-element">
        			        <div className="start-store-benefits-text">각종 기획전/공모전 소개 및 참여</div>
        			    </div>
    			    </div>
    			</div>
    			
    			
    			<div className="start-body-grey">
    			    <div className="start-body-container">
    			        <div className="start-body-1-of-1">
			                <div className="start-body-sub-title">
    					    준비가 되셨다면 상점을 개설해볼까요?
    					    </div>
    					    <div className="start-body-space-20"></div>
    					    { !this.state.isLoggedIn ?
        					    <Link to="/login">
        					    	<button className="start-body-start-button">개설하기</button>
        					    </Link>
        					    :
        					    <a href="https://netflix-salon.co.kr/store-editor/abstract">
        					    	<button className="start-body-start-button">개설하기</button>
        					    </a>
    					    }
    			        </div>
    			    </div>
			    </div>
			    
			    {/*
			    <Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="560px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="project-modal-header">
						<h3 className="project-modal-header-title">입점 신청</h3>
						<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
					</div>
					<div className="project-modal-body">
						<p className="project-modal-body-small-title">연락처(필 수)
							<input className="project-modal-body-input-text" type="text" id="suggest-store-contact" />
						</p>
						<p className="project-modal-body-small-title">이메일
							<input className="project-modal-body-input-text" type="text" id="suggest-store-email" />
						</p>
						<p className="project-modal-body-small-title">브랜드/상점 이름
							<input className="project-modal-body-input-text" type="text" id="suggest-store-name" />
						</p>
						<p className="project-modal-body-small-title">브랜드/상점 소개
							<textarea className="project-modal-body-input-textarea" type="textarea" id="suggest-store-text" />
						</p>
						<p className="project-modal-body-small-title">브랜드/상점 품목
							<textarea className="project-modal-body-input-textarea" type="textarea" id="suggest-store-items" />
						</p>
						<p className="project-modal-body-small-title">관련 링크
							<input className="project-modal-body-input-text" type="text" id="suggest-store-link" />
						</p>
					</div>
					<div className="project-modal-footer">
						<a className="project-modal-header-save-container" onClick={this.onClickSuggest}><button type="submit" className="project-modal-header-save" onClick={() => this.suggestModal()}>보내기</button></a>
					</div>
				</Modal>
				
				<SweetAlert
		          show={this.state.ok_visible2}
		          title=""
		          text="성공적으로 접수되었습니다. 검토 후 빠른 시일내에 답변드리겠습니다."
		          onConfirm={this.closeModal2}
		          confirmButtonText="확 인"
		        />
		        */}
    			
            </div>
        )  
    }

}

export default StartStore;