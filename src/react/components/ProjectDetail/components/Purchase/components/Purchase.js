import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo, fetchRewardPurchaseInfo } from '~/src/react/api/AppAPI'

import update from 'immutability-helper'
import Modal from '~/src/react/components/react-awesome-modal';
import Checkbox from 'rc-checkbox';

export default class Purchase extends Component {
	
	state = {
		rewards: [],
		shippingFee: 0,
		visible : false,
		checkbox : false,
		p_summary_creator : '',
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
	
	checking = () => {
		this.setState(update(this.state, {
			checkbox: { $set: true },
		}))
	}
	
	checkingOff = () => {
		this.setState(update(this.state, {
			checkbox: { $set: false },
		}))
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		try {
			const {
				user,
				data: { rewards, shippingFee }
			} = await fetchPurchaseInfo('rewards')
			
			const {
				data: {
					product_summary, project_summary
				}
			} = await fetchRewardPurchaseInfo()
			
			
			const p_summary_creator = project_summary != undefined ? project_summary.creator : product_summary.creator;
			// console.log('rewards', rewards);
			// console.log('shippingFee', shippingFee);

			this.props.setShippingFee(shippingFee)
			this.setState({ rewards, shippingFee, p_summary_creator })
		} catch (e) {
			// console.error(e);
		}

	}
	
	render() {

		// console.log('Purcase/components/Purchase', this);
		
		const {
			rewards,
			shippingFee,
			p_summary_creator
		} = this.state
		
		const {
			reward,
			payment,
			address,
			goToPreviousStage,
			purchase,
			purchaseAmount,
			purchase_btn_state
		} = this.props
		
		let reward_price = 0;
		let result_price = 0;
		for(var i in reward) {
			reward_price = reward[i].purchaseAmount * reward[i].thresholdMoney
			result_price = result_price + reward_price
		}
		
		let reward_dsecription = '';
		let result_description = '';
		for(var i in reward) {
			reward_dsecription = '[' + reward[i].title + ':' + reward[i].description + reward[i].descriptionSub + 'x' + reward[i].purchaseAmount + '개]'
			result_description = result_description + reward_dsecription
		}
		

		return (
			<div className="purchase-reward-container">
				<div className="purchase-stage-text-container">
					<div className="purchase-stage-text">옵션 및 수량 선택</div>
					<div className="purchase-stage-text">배송지 입력</div>
					<div className="purchase-stage-text">결제 카드 선택</div>
					<div className="purchase-stage-text-highlight">결제 정보 확인</div>
					<div className="purchase-stage-text-last">결제 예약 완료</div>
				</div>
				<div className="purchase-stage-content-container">
					<h4 className="purchase-detail-title">결제 정보를 확인해주세요.</h4>

						<p className="profile-small-title">옵션 및 수량</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-select">
								<p className="purchase-reward-title">{result_description}</p>
								<p className="purchase-reward-money">{result_price.toLocaleString()}원</p>
							</div>
						</div>

						<p className="profile-small-title">배송지</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-select">
								<p className="purchase-reward-money">{address.zipcode}, {address.address1} {address.address2}</p>
								<p className="purchase-reward-description">받는 분 : {address.addressee_name} 님</p>
								<p className="purchase-reward-description">연락처 : {address.addressee_number} / {address.real_email}</p>
							</div>
						</div>


						<p className="profile-small-title">결제 카드</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-select">
								<p className="purchase-reward-money">[{payment.card_name}] {payment.card_number.substring(payment.card_number.length-4, payment.card_number.length)}</p>
								<p className="purchase-reward-description">유효기간 : {payment.expiry}</p>
							</div>
						</div>

				</div>
				<div className="purchase-stage-content-container-2">

						<p className="profile-small-title">최종 결제 금액</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-result">
								<p className="purchase-reward-description">{result_price.toLocaleString()}원 + {shippingFee.toLocaleString()}원(배송비)</p>
								<p className="purchase-reward-money">= {(result_price + shippingFee).toLocaleString()}원</p>
							</div>
						</div>

				</div>
				
				{ this.state.checkbox == false ?
				<div className="purchase-agree-container">
					<div className="purchase-agree"><Checkbox className="purchase-checkbox" name="checkbox1" onChange={() => this.checking()} /><p className="purchase-termofuse" onClick={() => this.openModal()}>제 3자(프로젝트 진행자) 정보 제공에 동의합니다.</p></div>
				</div>
				:
				<div className="purchase-agree-container">
					<div className="purchase-agree"><Checkbox className="purchase-checkbox" name="checkbox2" onChange={() => this.checkingOff()} /><p className="purchase-termofuse" onClick={() => this.openModal()}>제 3자(프로젝트 진행자) 정보 제공에 동의합니다.</p></div>
				</div>
				}
				<Modal className="card-add-modal" visible={this.state.visible} width="700" height="300px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
				<div className="purchase-modal-container">
					<div className="terms-item-container">
                    	<h4 className="terms-small-title">제 3자(프로젝트 진행자) 정보 제공 동의</h4>
	                    <p className="terms-elements">
	                    회원의 개인정보는 당사의 개인정보 취급방침에 따라 안전하게 보호됩니다. 
	                    '회사'는 이용자들의 개인정보를 개인정보 취급방침의 '제 2조 개인정보의 수집, 제 3조 개인정보의 이용 및 목적'에서 고지한 범위 내에서 사용하며, 
	                    이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다.
	                    </p>
	                </div>
	                <div className="terms-item-container">
	                    <p className="terms-elements-sub">
	                    제공받는자: {p_summary_creator.creatorName}
	                    </p>
	                    <p className="terms-elements-sub">
	                    제공목적: 리워드 전달/배송과 관련된 상담 및 민원처리
	                    </p>
	                    <p className="terms-elements-sub">
	                    제공정보: 수취인 성명, 휴대전화번호, 배송 주소 (구매자와 수취인이 다를 경우에는 수취인의 정보가 제공될 수 있습니다)
	                    </p>
	                    <p className="terms-elements-sub">
	                    보유 및 이용기간: 재화 또는 서비스의 제공이 완료된 즉시 파기 (단, 관계법령에 정해진 규정에 따라 법정기간 동안 보관)
	                    </p>
	                    <p className="terms-elements-sub">
	                    ※ 동의 거부권 등에 대한 고지
	                    </p>
	                    <p className="terms-elements-sub">
	                    개인정보 제공은 서비스 이용을 위해 꼭 필요합니다. 개인정보 제공을 거부하실 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다.
	                    </p>
	                </div>
	                <div className="modal-card-add-container">
						<button className="modal-card-add" onClick={() => this.closeModal()}>확 인</button>
					</div>
				</div>
				</Modal>
				{ this.state.checkbox == false ?
				<div className="purchase-stage-move-container">
					<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
					<button className="purchase-stage-next-button-disabled" disabled>결제 예약</button>
				</div>
				:
				<div className="purchase-stage-move-container">
					<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
					{ !purchase_btn_state ? 
					<button className="purchase-stage-next-button-loading" disabled>
						<div className="spinner">
						  <div className="bounce1"></div>
						  <div className="bounce2"></div>
						  <div className="bounce3"></div>
						</div>
					</button> 
					: 
					<button className="purchase-stage-next-button" onClick={purchase}>결제 예약</button> 
					}
				</div>
				}
			</div>
		)
	}
}
