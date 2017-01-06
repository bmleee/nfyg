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
	}

	componentDidMount() {
		this.setState({
			stage: 1
		})
	}

	render() {
		console.log('Purchase', this);
		return (
			<div>
				<button onClick={() => console.log(this.state)}>Log State</button>
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
			stage: { $set : this.state.stage + 1 },
			reward: { $set: reward },
		}))
	}

	setAddress = (index, address) => {
		console.log('set address ', index);
		this.setState(update(this.state, {
			selectedAddressIndex: { $set: index },
			stage: { $set : this.state.stage + 1 },
			address: { $set: address },
		}))
	}

	setPayment = (index, payment) => {
		console.log('set payment ', index);
		this.setState(update(this.state, {
			selectedPaymentIndex: { $set: index },
			stage: { $set : this.state.stage + 1 },
			payment: { $set: payment },
		}))
	}

}
