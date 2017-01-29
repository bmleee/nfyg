import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'


export default class Purchase extends Component {
	componentDidMount() {
		window.scrollTo(0, 0)
	}
	
	render() {

		console.log('Purcase/components/Purchase', this);
		const {
			reward,
			payment,
			address,
			goToPreviousStage,
			purchase
		} = this.props

		return (
			<div className="purchase-reward-container">
				<div className="purchase-stage-text-container">
					<div className="purchase-stage-text">옵션 및 수량 선택</div>
					<div className="purchase-stage-text">배송지 입력</div>
					<div className="purchase-stage-text">결제 카드 선택</div>
					<div className="purchase-stage-text-highlight">결제 정보 확인</div>
					<div className="purchase-stage-text-last">결제 완료</div>
				</div>
				<div className="purchase-stage-content-container">
					<h4 className="purchase-detail-title">결제 정보를 확인해주세요.</h4>

						<p className="profile-small-title">옵션 및 수량</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-select">
								<p className="purchase-reward-title">{reward.title}</p>
								<p className="purchase-reward-description">{reward.description}</p>
								{/* +수량 */}
								<p className="purchase-reward-money">{reward.thresholdMoney.toLocaleString()}원</p>
							</div>
						</div>


						<p className="profile-small-title">배송지</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-select">
								<p className="purchase-reward-money">{address.zipcode}, {address.address1} {address.address2}</p>
								<p className="purchase-reward-description">받는 분 : {address.addressee_name} 님</p>
							</div>
						</div>


						<p className="profile-small-title">결제 카드</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-select">
								<p className="purchase-reward-money">[{payment.card_name}] {payment.card_number}</p>
								<p className="purchase-reward-description">유효기간 : {payment.expiry}</p>
							</div>
						</div>

				</div>
				<div className="purchase-stage-content-container-2">

						<p className="profile-small-title">최종 결제 금액</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-result">
								<p className="purchase-reward-description">{reward.thresholdMoney.toLocaleString()}원 + 3,000원(배송비)</p>
								<p className="purchase-reward-money">= {(reward.thresholdMoney+3000).toLocaleString()}원</p>
							</div>
						</div>

				</div>
				<div className="purchase-stage-move-container">
					<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
					<button className="purchase-stage-next-button" onClick={purchase}>결제 하기</button>
				</div>
			</div>
		)
	}
}
