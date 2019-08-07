import React, { Component, PropTypes } from 'react';
import { fetchUserAndData, getStorepurchase } from '~/src/react/api/AppAPI'
import { Link } from 'react-router'

import { value2label } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

export default class PurchaseResult extends Component {
	state = {
		items: [],
		shippingFee: 0,
		storeShippingCycle: {},
		store_title: '',
		message_fail: []
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { 
					abstract,
					items,
					storeInfo,
					storeShippingCycle
				}
			} = await fetchUserAndData()
			
			const getstorepurchasr_data = await getStorepurchase(abstract.storeLink)
			
			this.setState({ 
				items, 
				shippingFee : storeInfo.storeShippingFee,
				storeShippingCycle,
				store_title : abstract.title,
			})
		} catch (e) {
			// console.error(e);
		}

	}

	render() {
		
		const {
			items,
			shippingFee,
			storeShippingCycle,
			store_title
		} = this.state
		
		const {
			seleted_items,
			payment,
			address,
			purchaseAmount,
			msg,
		} = this.props
		
		
		let reward_price = 0;
		let result_price = 0;
		for(var i in seleted_items) {
			reward_price = seleted_items[i].purchaseAmount * ((seleted_items[i].thresholdMoney) + (!!seleted_items[i].opt && seleted_items[i].add_price))
			result_price = result_price + reward_price
		}
		
		let reward_dsecription = '';
		let result_description = '';
		for(var i in seleted_items) {
			reward_dsecription = '[' + seleted_items[i].title + ':' + (!seleted_items[i].opt ? seleted_items[i].description : seleted_items[i].opt) + seleted_items[i].descriptionSub + 'x' + seleted_items[i].purchaseAmount + '개]'
			result_description = result_description + reward_dsecription
		}

		return (
			<div className="purchase-reward-container">
				<div className="purchase-stage-text-container">
					<div className="purchase-stage-text">옵션 및 수량 선택</div>
					<div className="purchase-stage-text">배송지 입력</div>
					<div className="purchase-stage-text">결제 카드 선택</div>
					<div className="purchase-stage-text">결제 정보 확인</div>
					<div className="purchase-stage-text-last-highlight">결제 결과</div>
				</div>

				{
					msg ? (
						<div className="purchase-stage-result-container">
							<div className="purchase-fail-text1">결제 실패</div>
							<div className="purchase-fail-text2">{msg}</div>
						</div>
					) : (
						<div className="purchase-stage-result-container">
							<h4 className="purchase-thanks-text">{address.addressee_name}님, 예술후원에 감사드립니다.</h4>
							<h4 className="purchase-thanks-text">지속가능한 예술을 위해 노력하겠습니다.</h4>
							<h4 className="purchase-thanks-text">(주)세븐픽쳐스</h4>
						</div>
					)
				}
				
				{
					msg 
					? null 
					:
					<div className="purchase-stage-result-container-2">
						<h4 className="purchase-result-text">리워드명 : {result_description}</h4>
						<h4 className="purchase-result-text">결제금액 : {(result_price + shippingFee).toLocaleString()}원</h4>
						<h4 className="purchase-result-text">결제카드 : [{payment.card_name}] {payment.card_number.substring(payment.card_number.length-4, payment.card_number.length)}</h4>
						<div className="purchase-shipping-info">
							<div className="purchase-shipping-info-sub">매주</div> 
							{	storeShippingCycle.shipping_array && storeShippingCycle.shipping_array.map(({
								}, index) => (
								<div className="purchase-shipping-info-day">{storeShippingCycle.shipping_array[index]}</div>
								))
							}
							배송
						</div>
					</div>
				}

				<div className="purchase-stage-move-container">
					<Link to={`/`}>
						<button className="purchase-stage-next-button">홈으로 이동</button>
					</Link>
				</div>
				
			</div>
		)
	}
}
