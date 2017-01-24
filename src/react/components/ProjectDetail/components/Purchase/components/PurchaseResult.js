import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'


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

		return (
			<div>
			HELLO Iam PurchaseResult
			
				<div>
					구매 수량: {purchaseAmount}
				</div>
					리워드: {JSON.stringify(reward)}
				<div>
					결제수단: {JSON.stringify(payment)}
				</div>
				<div>
					주소: {JSON.stringify(address)}
				</div>
			</div>
		)
	}
}
