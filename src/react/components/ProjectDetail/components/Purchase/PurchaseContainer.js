import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'

import {
	Reward,
	Payment,
	Address,
	Purchase,
	PurchaseResult,
} from './components'

import { canUseDOM } from  '~/src/lib/utils'

export default class PurchaseContainer extends Component {

	state = {
		/*
			stage
				0 : loading...
				1 : let user choose reward
				2 : select choose payment
				3 : select address
				4 : progress purchase (use iamport API)
				5 : show the result of the payment. success / fails
		 */
		stage: 0,

		// rendering 을 위한 데이터
		reward: {}, // project.funding.reward 참조
		address: {}, // address 참조
		payment: {}, // 일부분만 보여주기

		// 서버로 전송
		selectedRewardIndex: -1,
		selectedAddressIndex: -1,
		selectedPaymentIndex: -1,
		
		imgSrc: '',
	}

	componentDidMount() {
		this.setState({
			stage: 1
		})
	}

	render() {
		const {
			stage
		} = this.state;
		
		let imgSrc= '/assets/images/slider-tumb2.jpg';
		
		let infoBackground = {
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}

				// 0 : loading...
				// 1 : let user choose reward
				// 2 : select choose payment
				// 3 : select address
				// 4 : progress purchase (use iamport API)
				// 5 : show the result of the payment. success / fails
		
		let title = [
			'',
			'옵션 및 수량 선택',
			'배송지 입력',
			'결제 수단 선택',
			'결제 정보 확인',
			'결제 완료',
		];
		
		console.log('Purchase', this);
		return (
			<div>
				<button onClick={() => console.log(this.state)}>Log State</button>
				<div className="purchase-heading" style={infoBackground}>
					<h1 className="purchase-title">{title[stage]}</h1>
				</div>
				{this._renderStage()}
			</div>
		)
	}

	_renderStage = () => {
		const props = {
			isProject: canUseDOM && !!document.URL.match(/projects\/.+$/),
			isProduct: canUseDOM && !!document.URL.match(/products\/.+$/),
			goToNextStage: this.goToNextStage,
			goToPreviousStage: this.goToPreviousStage,
			setReward: this.setReward,
			setAddress: this.setAddress,
			setPayment: this.setPayment,
		}

		const stages = [
			<div>Puchase Page Loading...</div>,
			<Reward {...props} />,
			<Address {...props} />,
			<Payment {...props} />,
			<Purchase {...props} />,
			<PurchaseResult {...props} />,
		]

		return stages[this.state.stage]
	}

	goToNextStage = () => {
		this.setState(update(this.state, {
			stage: { $set : this.state.stage + 1 }
		}))
	}

	goToPreviousStage = () => {
		this.setState(update(this.state, {
			stage: { $set : this.state.stage - 1 }
		}))
	}

	setReward = (index, reward) => {
		console.log('set reward ', index);
		this.setState(update(this.state, {
			selectedRewardIndex: { $set: index },
			reward: { $set: reward },
			stage: { $set : this.state.stage + 1 },
		}))
	}

	setAddress = (index, address) => {
		console.log('set address ', index);
		this.setState(update(this.state, {
			selectedAddressIndex: { $set: index },
			address: { $set: address },
			stage: { $set : this.state.stage + 1 },
		}))
	}

	setPayment = (index, payment) => {
		console.log('set payment ', index);
		this.setState(update(this.state, {
			selectedPaymentIndex: { $set: index },
			payment: { $set: payment },
			stage: { $set : this.state.stage + 1 },
		}))
	}

}
