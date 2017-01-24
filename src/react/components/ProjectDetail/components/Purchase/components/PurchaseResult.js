import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'
import { Link } from 'react-router'


export default class C extends Component {
	state = {
		payments: []
	}

	async componentDidMount() {
		// try {
		// 	const {
		// 		user,
		// 		data: { payments }
		// 	} = await fetchPurchaseInfo('payment')

			// this.setState({ payments })
		// } catch (e) {
			// console.error(e);
		// }
	}

	render() {
		// const {
		// 	payments
		// } = this.state

		const {
			goToNextStage,
			goToPreviousStage,
			setReward,
			setAddress,
			setPayment,
		} = this.props
		
	
		const payment = {
			card_name: 'BC카드',
			card_number: '1234',
		}
		const address = {
			addressee_name: '철수',
			address1: '서울시 서대문구 북가좌동',
			address2: '227-11',
			zipcode: '15532',
		}
		const reward = {
			title: "sample reward2",
			imgSrc: "http://img.naver.net/static/www/u/2013/0731/nmms_224940510.gif",
			description: "sample reward2",
			thresholdMoney: 10,
		}
		const purchaseAmount = 2
		
		const maxPurchaseVolume = "2017.3.20"
		

		return (
			<div className="purchase-reward-container">
				<div className="purchase-stage-text-container">
					<div className="purchase-stage-text">옵션 및 수량 선택</div>
					<div className="purchase-stage-text">배송지 입력</div>
					<div className="purchase-stage-text">결제 카드 선택</div>
					<div className="purchase-stage-text">결제 정보 확인</div>
					<div className="purchase-stage-text-last-highlight">결제 완료</div>
				</div>
				<div className="purchase-stage-result-container">
					<h4 className="purchase-thanks-text">{address.addressee_name}님, 예술후원에 감사드립니다.</h4>
					<h4 className="purchase-thanks-text">지속가능한 예술을 위해 노력하겠습니다.</h4>
					<h4 className="purchase-thanks-text">(주)세븐픽쳐스</h4>
				</div>
				<div className="purchase-stage-result-container-2">
					<h4 className="purchase-result-text">리워드명 : {reward.title} / {purchaseAmount}개</h4>
					<h4 className="purchase-result-text">결제금액 : {reward.thresholdMoney.toLocaleString()}원</h4>
					<h4 className="purchase-result-text">결제카드 : [{payment.card_name}] {payment.card_number}</h4>
					<div className="purchase-shipping-info">
						배송은 {maxPurchaseVolume} 예정되어 있습니다.
					</div>
				</div>
				<div className="purchase-stage-move-container">
					<Link to={`/`}>
					<button className="purchase-stage-next-button">홈으로 이동</button>
					</Link>
				</div>
			</div>
		)
	}
}
