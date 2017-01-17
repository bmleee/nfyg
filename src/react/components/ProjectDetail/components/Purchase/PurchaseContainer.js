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
import { purchaseReward } from '../../../../api/AppAPI'

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

		purchaseAmount: 1,
		shippingFee: 0,

		// 서버로 전송
		selectedRewardIndex: -1,
		selectedAddressIndex: -1,
		selectedPaymentIndex: -1,

		imgSrc: '',
	}

	async componentDidMount() {

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
			'결제 카드 선택',
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

	purchase = async () => {
		let {
			selectedRewardIndex,
			selectedAddressIndex,
			selectedPaymentIndex,
		} = this.state

		if (selectedRewardIndex < 0 | selectedRewardIndex < 0 | selectedPaymentIndex < 0) {
			alert('결제 정보 오류. 처음부터 다시 진행 해 주세요')
			this.goToFirstStage()
		}

		try {
			let r = await purchaseReward({
				addressIndex: selectedAddressIndex,
				rewardIndex: selectedRewardIndex,
				paymentIndex: selectedPaymentIndex
			})

			console.log('purchaseReward api response', r);
		} catch (e) {
			console.error(e);
		}
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
			setPurchaseAmount: this.setPurchaseAmount,

			selectedRewardIndex: this.state.selectedRewardIndex,
			selectedAddressIndex: this.state.selectedAddressIndex,
			selectedPaymentIndex: this.state.selectedPaymentIndex,

			reward: this.state.reward,
			purchaseAmount: this.state.purchaseAmount,
			address: this.state.address,
			payment: this.state.payment,

			purchase: this.purchase,
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

	goToFirstStage = () => {
		this.setState(update(this.state, {
			stage: { $set : 1 }
		}))
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

	setReward = (index, reward, shippingFee) => {
		console.log('set reward ', index);
		this.setState(update(this.state, {
			selectedRewardIndex: { $set: index },
			reward: { $set: reward },
			shippingFee: { $set: shippingFee },
		}))
	}

	setPurchaseAmount = (purchaseAmount) => {
		this.setState(update(this.state, {
			purchaseAmount: { $set: Number(purchaseAmount) },
		}))
	}

	setAddress = (index, address) => {
		console.log('set address ', index);
		this.setState(update(this.state, {
			selectedAddressIndex: { $set: index },
			address: { $set: address },
		}))
	}

	setPayment = (index, payment) => {
		console.log('set payment ', index);
		this.setState(update(this.state, {
			selectedPaymentIndex: { $set: index },
			payment: { $set: payment },
		}))
	}

}
